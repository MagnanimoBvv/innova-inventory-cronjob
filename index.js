require('dotenv').config();
const axios = require('axios');
const { getLocationId, getProductByHandle, updateInventory } = require('./shopifyFunctions');

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

async function updateProducts() {
    // const products = await paginateInnovaProducts();
    const inventory = await getInnovaInventory();
    if (inventory.respuesta_llave.status !== 'success') return;

    const locationId = await getLocationId();
    for (const product of inventory.productos) {
        try {
            // if (product.Codigo !== 'BE-004') continue; // If para pruebas con un producto específico
            const handle = `in-${product.Codigo}`.trim().toLowerCase();
            const shopifyProduct = await getProductByHandle(handle);
            if (!shopifyProduct) {
                continue;
            }

            const activeVariants = product.Variantes.filter(variant => variant.Tono !== '');
            const shopifyVariants = shopifyProduct.variants.nodes;
            for (const activeVariant of activeVariants) {
                const variant = shopifyVariants.find(v => v.sku === activeVariant['Codigo Variante']);
                const variantInventory = parseInt(activeVariant.Stock, 10);
                console.log(`Variante encontrada: ${shopifyProduct.title} ${variant.title}, Inventario: Prev ${variant.inventoryQuantity} Now ${variantInventory}`);

                if (variant.inventoryQuantity !== variantInventory) {
                    const variantToUpdate = {
                        quantities: {
                            changeFromQuantity: null,
                            inventoryItemId: variant.inventoryItem.id,
                            locationId,
                            quantity: variantInventory,
                        },
                        name: "available",
                        reason: "correction",
                    };
                    const response = await updateInventory(variantToUpdate);
                    console.log('Inventario actualizado:', response.changes);
                }
            }
            // break;
        } catch (error) {
            console.error(`Error actualizando el producto ${product.Codigo}:`, error);
        }
    }
}

updateProducts();