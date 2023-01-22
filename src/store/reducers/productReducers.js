
import CartSummary from "../../layouts/CartSummary";
import { ADD_TO_CART, LIST_CART_ITEMS, REMOVE_FROM_CART } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { products } from "../initialValues/products";
import { DELETE_PRODUCT } from "../actions/productActions";
import { Switch } from "react-router-dom";



const initialState = {
    products : products
}


export default function ProductReducer(state = initialState, { type, payload }) {
    const product = payload

    const data = { ...product };
    
    const config = {
        headers: { Authorization: localStorage.getItem("tokenKey") }
    };
    
    const requestOptionske = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("tokenKey")},
        body: JSON.stringify(data)
    };
    switch (type) {
        
        case DELETE_PRODUCT:
           
          return fetch("http://localhost:8081/product", requestOptionske)
            .then(res => console.log(res));
          
                
            
           
            default:
                return state
        
            
    }
   

    


}