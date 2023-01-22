import React , {useState}from 'react'
import {  NavLink } from 'react-router-dom';
import { Dropdown,Label } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { listCartItems } from '../store/actions/cartActions';

export default function CartComponent() {
    const {cartItems} = useSelector(state => state.cart)



    return (
        <div>
            {localStorage.getItem("currentUser") != null? <Dropdown item text="Sepetiniz" >
              <Dropdown.Menu >
                {
                 cartItems.map(cartItem=>(
                  <Dropdown.Item key={cartItem.product.id}>
                    {cartItem.product.productName}
                    <Label>
                      {cartItem.quantity}
                    </Label>
                  </Dropdown.Item>
                ))
                }
                <Dropdown.Divider/>
                <Dropdown.Item as={NavLink} to="/cart">Sepete git</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> : ""}
           
        </div>
    )
   
  
}
