import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Button, Card, CardContent, Icon, Image } from 'semantic-ui-react'
import axios from 'axios';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

export default function ProductDetail() {

    let { id } = useParams()
const dispatch = useDispatch()

    const [product, setProduct] = useState({})

    const [user, setUser] = useState({})

    
    const config = {
        headers: { Authorization: localStorage.getItem("tokenKey") }
    };

    useState(() => {
      axios
        .get("http://localhost:8081/product/?id="+id)
        .then(res => {
          setProduct(res.data)
          setUser(res.data.user)
        })
        .catch(err => {
          console.log(err)
        })
  
  
    }, [])
    const handleAddToCart =(product)=>{
        dispatch(addToCart(product));
        
         toast.success(`${product.productName} sepete eklendi`)
       }
     
       const handleDeleteItem = (product) => {
         dispatch(removeFromCart(product))
         toast.warning(`${product.productName}  sepetten çıkarıldı`)
       }
     
  


    return (
        <div>
            <Card.Group itemsPerRow={2}>
                <Card fluid centered>
                    <Card.Content textAlign='left'>
                        <Image 
                            
                            size='massive'
                            src={'data:image/jpeg;base64,'+product.image}
                        />
                    <br/>
                    <br/>
                    <br/>
                    <Card.Header textAlign='center' >  <Icon name='vcard' />  Satıcı  :  {user.name}</Card.Header>
                       
                        
                    </Card.Content>
                    
                    </Card>

                    <Card fluid centered>
                    <Card.Content >
                       
                        <Card.Header floated="right"> {product.brand}</Card.Header>
                        <Card.Header floated="right"> {product.productName}</Card.Header>
                        
                        <Card.Meta>Price = {product.price} $</Card.Meta>
                        <Card.Description>
                           {product.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={()=>handleAddToCart(product)}>
                                Sepete Ekle
                            </Button>
                           
                        </div>
                    </Card.Content>
                    </Card>
                   

            </Card.Group>
        </div>
    )
}
