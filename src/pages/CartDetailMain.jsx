import React , {useState}from 'react'
import axios from 'axios';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function CartDetailMain() {
    const [items, setItems] = useState([])
const dispatch = useDispatch();
const {cartItems} = useSelector(state => state.cart)
const history = useHistory();


let id = localStorage.getItem("currentUser");
  useState(() => {
    axios
      .get("http://localhost:8081/cartitems/?id="+id)
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        console.log(err)
      })
     

  }, [])
 
  const handleAddToCart =(product)=>{
    dispatch(addToCart(product));
    history.go("/cart")
     toast.success(`${product.productName} sepete eklendi`)
   }

  const handleDeleteItem = (product) => {
    dispatch(removeFromCart(product))
    history.go(0);
    toast.warning(`${product.productName}  sepetten çıkarıldı`)
  }

  return (
    <div>
         <Item.Group divided>
    {cartItems.map(items => (
    <Item key={items.product.id}>
      <Item.Image src={'data:image/jpeg;base64,'+items.product.image} size="small" />
      <Item.Content verticalAlign='middle' >
       
        <Item.Header  href={`/products/${items.product.id}`}    as='a'>{items.product.productName}</Item.Header>
        <br/>
        <br/>
        <Item.Header   >
          <span className='cinema'>{items.product.price}</span>
          <Icon name='lira' />
          
        </Item.Header>
        <Item.Description ></Item.Description>
        <Item.Extra> 
            
          <Button onClick={() =>  handleAddToCart(items.product)} color='green' icon  floated='right'>
            
            <Icon name='plus circle' />
          </Button>         
        </Item.Extra>
        
        <Item.Extra  > 
        <Button icon color='black'   floated='right'>
            
        {items.quantity}
        
          </Button>      
          
          
           <Label size='large' color='black'>
           Satıcı : {items.product.user.name}
        </Label>
            
                   
        </Item.Extra>
        <Item.Extra>
          <Button  onClick={() =>  handleDeleteItem(items.product)}  color='red' icon  floated='right'>
            <Icon name='minus circle' />
          </Button>         
        </Item.Extra>
      </Item.Content >
    </Item>
))}
  </Item.Group>
 
  
    </div>
  )
}
