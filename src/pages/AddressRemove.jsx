import React, {  useState } from 'react';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart, listCartItems, removeFromCart } from '../store/actions/cartActions';
import { toast } from "react-toastify";
import { deleteProduct } from '../store/actions/productActions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ProductRemove() {

  const [items, setItems] = useState([])
  
  const dispatch = useDispatch()

  const [addresses, setAddresses] = useState([])

  let history = useHistory()

  const config = {
    headers: { Authorization: localStorage.getItem("tokenKey") }
};
let userId = localStorage.getItem("currentUser")
  
useState(() => {
  axios
    .get("http://localhost:8081/addresses?id="+userId,config)
    .then(res => {
      setAddresses(res.data)
    })
    .catch(err => {
      console.log(err)
    })



}, [])


  
  

  const handleDeleteCard =(id)=>{
    axios
    .delete("http://localhost:8081/address?id="+id,config)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })


    toast.success(`Adres başarıyla silindi`)
    history.push("/addresses")
  }

 

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
            <Table.HeaderCell>Marka</Table.HeaderCell>
            <Table.HeaderCell>Stok Adedi</Table.HeaderCell>
           
            <Table.HeaderCell></Table.HeaderCell>


          </Table.Row>
        </Table.Header>

        <Table.Body>

          {addresses.map(address => (
            <Table.Row key={address.id}>


              <Table.Cell>{address.addressName}</Table.Cell>
              <Table.Cell>{address.address}</Table.Cell>
              <Table.Cell>{address.city}</Table.Cell>
             
              <Table.Cell><Button onClick={()=>handleDeleteCard(address.id)}>Adresi Sil</Button></Table.Cell>



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
      

    </div>
  )
}
