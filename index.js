const axios = require('axios');
require('dotenv').config();
const { uploadProduct } = require('./uploadProduct');
const { getLocationId } = require('./getLocations');
const { getPublications } = require('./getPublications');

async function getInnovaProducts(page) {
    const response = await axios.get(
        'https://4vumtdis3m.execute-api.us-east-1.amazonaws.com/default/Innovation_GetAllProductos',
        {
            params: {
                User: process.env.INNOVA_USER,
                Clave: process.env.INNOVA_PASSWORD,
                page,
                limit: 100,
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

async function getProductByHandle(handle) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                query {
                    productByHandle(handle: "${handle}") {
                        title
                        variants(first: 250) {
                            nodes {
                                title
                                inventoryQuantity
                                inventoryItem {
                                    id
                                }
                            }
                        }
                    }
                }
            `,
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.productByHandle;
}

async function updateInventory(input) {
    //Usa esta mutation porque Shopify no permite actualizar inventario por productVariantsBulkUpdate
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation InventorySet($input: InventorySetQuantitiesInput!) {
                    inventorySetQuantities(input: $input) {
                        inventoryAdjustmentGroup {
                            changes {
                                delta
                                name
                            }
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                input,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.inventorySetQuantities.inventoryAdjustmentGroup;
}

async function updateProducts() {
    const products = await paginateInnovaProducts();

    const locationId = await getLocationId();
    const productPublications = await getPublications();
    for (const product of products) {
        try {
            // if (product.Codigo !== 'PET 008') continue; // If para pruebas con un producto específico
            const handle = `${product.Nombre.replace(/[.,]/g, '')} ${product.Codigo}`.trim().toLowerCase().replace(/[\s\/-]+/g, '-'); // Reemplaza espacios, diagonales y múltiples guiones
            let shopifyProduct = await getProductByHandle(handle);
            if (!shopifyProduct) {
                await uploadProduct(product, locationId, productPublications); // Intenta subir producto
                continue;
            }

            const activeVariants = product.Variantes.filter(variant => variant.Tono !== '');
            const shopifyVariants = shopifyProduct.variants.nodes;
            for (const activeVariant of activeVariants) {
                const variant = shopifyVariants.find(v => v.title === activeVariant.Tono);
                const variantInventory = parseInt(activeVariant.Stock);
                console.log(`Variante encontrada: ${shopifyProduct.title} ${variant.title}, Inventario: Prev ${variant.inventoryQuantity} Now ${variantInventory}`);

                if (variant.inventoryQuantity !== variantInventory) { //Actualiza la variante si el inventario ha cambiado
                    const variantToUpdate = {
                        quantities: {
                            inventoryItemId: variant.inventoryItem.id, //Usa id de inventario porque usar id de variante o producto no funciona
                            locationId,
                            quantity: variantInventory,
                        },
                        name: "available",
                        reason: "correction",
                        ignoreCompareQuantity: true, //Desactiva la comparación de inventario para siempre sobreescribir con la info del proveedor
                    };
                    const response = await updateInventory(variantToUpdate);
                    console.log('Inventario actualizado:', response.changes);
                }
            }
            // break;
        } catch (error) {
            console.error(`Error actualizando el producto ${product.Nombre} ${product.Codigo}:`, error);
        }
    }
}

updateProducts();