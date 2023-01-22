import React, {  useState } from 'react';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { deleteProduct } from '../store/actions/productActions';

export default function ProductRemove() {
  const [items, setItems] = useState([])
  
  const dispatch = useDispatch()

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

  
  

  const handleDeleteProduct =(product)=>{
   dispatch(deleteProduct(product));
   
    toast.success(`${product.productName} has been deleted `)
  }

 

  return (
    <div>
      {localStorage.getItem("roleId") != 1? "You have not permission in this page" : <Table celled>
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
            <Table.HeaderCell>Marka</Table.HeaderCell>
            <Table.HeaderCell>Stok Adedi</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>


          </Table.Row>
        </Table.Header>

        <Table.Body>

          {products.map(product => (
            <Table.Row key={product.id}>


              <Table.Cell><Link to={`/products/${product.id}`}>{product.productName}</Link></Table.Cell>
              <Table.Cell>{product.brand}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell><Button onClick={()=>handleDeleteProduct(product)}>Delete Product</Button></Table.Cell>



            </Table.Row>

          ))}

        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>}
      

    </div>
  )
}
