
import CartSummary from "../../layouts/CartSummary";
import { ADD_TO_CART, LIST_CART_ITEMS, REMOVE_FROM_CART } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems"
import React, { useState, useEffect } from 'react'
import axios from 'axios';



const initialState = {
    cartItems: cartItems
}


export default function CartReducer(state = initialState, { type, payload }) {
    const product = payload
    const user = {
        "user": {
            "id": localStorage.getItem("currentUser")
        }
    }
    const data = { ...user, product };
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    const requestOptionske = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    let xd = state.cartItems.find((c) => c.product.id === payload.id);
    switch (type) {

        case ADD_TO_CART:



            fetch("http://localhost:8081/cart", requestOptions)
                .then(response => response.json())
                .then(res => console.log(res));

            if (xd) {
                xd.quantity++;
                return {
                    ...state,
                };
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { quantity: 1, product: payload }],
                };
            };


        case REMOVE_FROM_CART:

            
            fetch("http://localhost:8081/cart", requestOptionske)
            .then(res => console.log(res));
            


                if (xd) {
                    if(xd.quantity >= 1)
                    xd.quantity--;
                    return {
                        ...state,
                    };
                }
                else {
                    return {
                        ...state,
                        cartItems: [...state.cartItems],
                    };
                };
            




        case LIST_CART_ITEMS:
            return {
                cartItems: [...payload],
                ...cartItems
            }


        default:
            return state
    }


}
