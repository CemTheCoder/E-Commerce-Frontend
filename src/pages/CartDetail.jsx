import React , {useState}from 'react'
import axios from 'axios';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';



export default function CartDetail() {
  const [items, setItems] = useState([])
const dispatch = useDispatch();
const {cartItems} = useSelector(state => state.cart)



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
    
     toast.success(`${product.productName} sepete eklendi`)
   }

  const handleDeleteItem = (product) => {
    dispatch(removeFromCart(product))
    toast.warning(`${product.productName}  sepetten çıkarıldı`)
  }


  return (
    <div>
        {localStorage.getItem("currentUser") != null?<Table celled>
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>



          </Table.Row>
        </Table.Header>

        <Table.Body>

          {cartItems.map(items => (
            <Table.Row key={items.product.id}>


              <Table.Cell><Link to={`/products/${items.product.id}`}>{items.product.productName}</Link></Table.Cell>
              <Table.Cell>{items.product.brand}</Table.Cell>
              <Table.Cell>{items.product.stock}</Table.Cell>
              <Table.Cell>{items.product.price}</Table.Cell>
              <Table.Cell>{items.quantity}</Table.Cell>
              <Table.Cell><Button onClick={()=>handleAddToCart(items.product)}>Add</Button></Table.Cell>
              <Table.Cell><Button onClick={()=>handleDeleteItem(items.product)}>Remove</Button></Table.Cell>


            </Table.Row>

          ))}

        </Table.Body>

       
      </Table>
: ""}
      
    </div>
  )
}
