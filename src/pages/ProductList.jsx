import React, {  useState } from 'react';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProductListMain from './ProductListMain';

export default function ProductList() {
  const [items, setItems] = useState([])
  
  const dispatch = useDispatch()
  const history = useHistory()
  
  console.log(localStorage)
  const [products, setProducts] = useState([])
  
  useState(() => {
    axios
      .get("http://localhost:8081/products")
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        console.log(err)
      })



  }, [])
  
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
 
  dispatch(listCartItems(items))
 

  const handleAddToCart =(product)=>{
   dispatch(addToCart(product));
   
    toast.success(`${product.productName} sepete eklendi`)
  }

 

  return (
    <div>

      <Table celled >
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
              <Table.Cell><Button onClick={()=>handleAddToCart(product)}>Sepete Ekle</Button></Table.Cell>



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
      </Table>

      <ProductListMain/>

    </div>
  )
}
