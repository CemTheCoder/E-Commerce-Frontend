
export const ADD_TO_CART = "ADD_TO_CART"

export const REMOVE_FROM_CART = "REMOVE_FROM_CART"

export const LIST_CART_ITEMS = "LIST_CART_ITEMS"


export function listCartItems(items) {
    return {
        type : LIST_CART_ITEMS,
        payload : items
    }
}



export function addToCart(product) {
    return {
        type : ADD_TO_CART,
        payload : product
    }
}


export function removeFromCart(product) {
    return {
        type : REMOVE_FROM_CART,
        payload : product
    }
}