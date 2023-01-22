import React , {useState,useEffect}from 'react'
import {  NavLink } from 'react-router-dom';
import { Dropdown,Label } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { listCartItems } from '../store/actions/cartActions';
import CartComponent from './CartComponent';


export default function CartSummary() {
 
  const {cartItems} = useSelector(state => state.cart)
  
  const dispatch = useDispatch()

  let id = localStorage.getItem("currentUser");
  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:8081/cartitems?id="+id)
      .catch((err) => {
        console.log("Err: ", err);
      });
      localStorage.getItem("currentUser") != null?
      dispatch(listCartItems(response.data)) : console.log("xd");
  };

  useEffect(() => {
    fetchProducts();
  }, []);
 


 

  


    return (
        <div>
           <CartComponent/>
        </div>
    )
}
