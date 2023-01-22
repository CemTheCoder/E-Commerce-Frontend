
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import React, {  useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link, NavLink } from 'react-router-dom';


export default function ProductListMain() {
    const [items, setItems] = useState([])
  
    const dispatch = useDispatch()
    const history = useHistory()
    
    console.log(localStorage)
    const [products, setProducts] = useState([])
    
   
    const config = {
      headers: { Authorization: localStorage.getItem("tokenKey") }
  };

    useState(() => {
      axios
        .get("http://localhost:8081/products",config)
        .then(res => {
          setProducts(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  
  
  
    }, [])
    
    
   
  
    const handleAddToCart =(product)=>{
     dispatch(addToCart(product));
     
      toast.success(`${product.productName} sepete eklendi`)
    }
  


  return (
    <div >
        
       <Card.Group   className='cards'  itemsPerRow={4}  >
        {products.map(product => (    
        <Card key={product.id} href={`/products/${product.id}`} >
           
    <Image  src={'data:image/jpeg;base64,'+product.image} wrapped ui={false}  />
    <Card.Content>
      <Card.Header>{product.brand}</Card.Header>
      
      <Card.Description>
        {product.productName}
      </Card.Description>
    </Card.Content>
    <Card.Content extra  textAlign='left'>
      
        <Icon name='lira'  />
        {product.price}  

    </Card.Content>
    
  </Card>
        ))}
  
  </Card.Group>
    </div>
  )
}
