require('dotenv').config();
const axios = require('axios');
const { getLocationId, paginateProductsByVendor, updateInventory } = require('./shopifyFunctions');

async function getInnovaProducts(page) {
    const response = await axios.get(
        'https://4vumtdis3m.execute-api.us-east-1.amazonaws.com/default/Innovation_GetAllProductos',
        {
            params: {
                User: process.env.INNOVA_USER,
                Clave: process.env.INNOVA_PASS,
                page,
                limit: 50,
            },
            headers: {
                'auth-token': process.env.INNOVA_AUTH_TOKEN
            },
        }
    );

    return response.data;
}

async function paginateInnovaProducts() {
    const firstResponse = await getInnovaProducts(1);
    let products = firstResponse.productos;
    const pages = firstResponse.paginas_totales;

    let page = 2;
    while (true) {
        const response = await getInnovaProducts(page);
        products = [...products, ...response.productos];

        if (page >= pages) {
            break;
        }

        page++;
    }
    return products;
}

async function getInnovaInventory() {
    const response = await axios.get(
        'https://1x4nyx8c80.execute-api.us-east-1.amazonaws.com/default/Innovation_GetAll_ProducLight',
        {
            params: {
                User: process.env.INNOVA_USER,
                Clave: process.env.INNOVA_PASS,
            },
            headers: {
                'auth-token': process.env.INNOVA_AUTH_TOKEN
            },
        }
    );

    return response.data;
}

function getStores() {
    const storeNames = process.env.STORES.split(',');

    return storeNames.map(name => ({
        name,
        graphqlUrl: process.env[`GRAPHQL_URL_${name}`],
        shopifyToken: process.env[`SHOPIFY_TOKEN_${name}`],
    }));
}

async function updateProducts(store, products) {
    const locationId = await getLocationId(store);
    const shopifyProducts = await paginateProductsByVendor(store, 'Innova');
    for (const product of products) {
        try {
            // if (product.Codigo !== 'BE-004') continue; // If para pruebas con un producto específico
            const handle = `in-${product.Codigo}`.trim().toLowerCase();
            const shopifyProduct = shopifyProducts.find(p => p.handle === handle);
            if (!shopifyProduct) continue;
            
            const shopifyVariants = shopifyProduct.variants.nodes;
            const activeVariants = product.Variantes.filter(variant => variant.Tono !== '');
            const activeVariantBySKU = new Map(activeVariants.map(v => [v['Codigo Variante'], v]));

            for (const variant of shopifyVariants) {
                const activeVariant = activeVariantBySKU.get(variant.sku);
                const targetInventory = activeVariant ? parseInt(activeVariant.Stock, 10) : 0;
                const label = activeVariant ? 'Variante existente' : 'Variante faltante';
                console.log(`[${store.name}] ${label}: ${shopifyProduct.title} ${variant.title}, Prev ${variant.inventoryQuantity} Now ${targetInventory}`);

                if (variant.inventoryQuantity === targetInventory) continue;

                const variantToUpdate = {
                    quantities: {
                        changeFromQuantity: null,
                        inventoryItemId: variant.inventoryItem.id,
                        locationId,
                        quantity: targetInventory,
                    },
                    name: "available",
                    reason: "correction",
                };
                const response = await updateInventory(store, variantToUpdate);
                console.log(`[${store.name}] Inventario actualizado:`, response.changes);
            }
            // break;
        } catch (error) {
            console.error(`[${store.name}] Error actualizando ${product.Codigo}:`, error);
        }
    }
}

async function main() {
    // const products = await paginateInnovaProducts();
    const inventory = await getInnovaInventory();
    if (inventory.respuesta_llave.status !== 'success') return;

    const stores = getStores();
    for (const store of stores) {
        await updateProducts(store, inventory.productos);
    }
}

main();
