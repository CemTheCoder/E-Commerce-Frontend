import { Button, Card, Icon, Image } from 'semantic-ui-react'
import React, {  useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link, NavLink } from 'react-router-dom';


export default function ProductListMain() {
  
    const dispatch = useDispatch()
    const history = useHistory()
    
    console.log(localStorage)
    const [addresses, setAddresses] = useState([])
    
    let id = localStorage.getItem("currentUser")
   
    const config = {
      headers: { Authorization: localStorage.getItem("tokenKey") }
  };

    useState(() => {
      axios
        .get("http://localhost:8081/addresses?id="+id,config)
        .then(res => {
          setAddresses(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  
  
  
    }, [])
    
    
   
  
    const handleAddToCart =(product)=>{
     dispatch(addToCart(product));
     
      toast.success(`${product.productName} sepete eklendi`)
    }

    function handleButton() {
      history.push("/address/add")
    }

    function handleRemove() {
      history.push("/deleteaddress")
    }
  
  


  return (
    <div >
         <Button content='Yeni Adres Ekle' circular color='black' floated='left' size='big' onClick={handleButton}/>
         <Button content='Adres Sil' circular color='black' floated='left' size='big' onClick={handleRemove}/>

      <br/>
      <br/>
      <br/>
       <Card.Group  className='cards'  itemsPerRow={2} >
        {addresses.map(address => (    
        <Card   key={address.id} href={`/products/${address.id}`} >
           
   
    <Card.Content>
      <Card.Header>{address.addressName}</Card.Header>
      
      <Card.Description>
        {address.address}
      </Card.Description>
    </Card.Content>
    <Card.Content extra  textAlign='center'>
      
       
        {address.customerName + " " + address.customerSurname} 

    </Card.Content>
    
  </Card>
        ))}
  
  </Card.Group>
    </div>
  )
}
