import { Button, Card, Icon, Image } from 'semantic-ui-react'
import React, {  useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link, NavLink } from 'react-router-dom';
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'


export default function ProductListMain() {
  
    const dispatch = useDispatch()
    const history = useHistory()
    
    console.log(localStorage)
    const [orders, setOrders] = useState([])
    
    let id = localStorage.getItem("currentUser")
   
    const config = {
      headers: { Authorization: localStorage.getItem("tokenKey") }
  };

    useState(() => {
      axios
        .get("http://localhost:8081/orders?id="+id,config)
        .then(res => {
          setOrders(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  
  
  
    }, [])
    
    
   
  
    
  
  


  return (
    <div >
        

     
      <br/>
       <Card.Group  className='cards'  itemsPerRow={1} >
        {orders.map(order => (    
        <Card   key={order.id}  >
           
   
    <Card.Content>
      <Card.Header>Sipariş No :{order.id}</Card.Header>
      
      <Card.Description>
       Adres Özeti : {order.address.address}
      </Card.Description>
    </Card.Content>
    <Card.Content extra  textAlign='center'>
       
    <Cards  
         number={order.creditCard.cardNumber}
         name={order.creditCard.cardName}
         expiry={order.creditCard.date}
         cvc={order.creditCard.cvc}
        
       />

    </Card.Content>
    <Card.Content>
    {order.price} <Icon name='lira'></Icon>
    
    </Card.Content>
    <Card.Header>
    Ürün Hazırlanıyor
    <Button basic loading >
      Loading
    </Button> 
    </Card.Header>
   
    
  </Card>
        ))}
  
  </Card.Group>
    </div>
  )
}
