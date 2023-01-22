export const DELETE_PRODUCT = "DELETE_PRODUCT"


export function deleteProduct(product) {
    return {
        type : DELETE_PRODUCT,
        payload : product
    }
}