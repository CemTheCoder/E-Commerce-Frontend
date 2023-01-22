import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Icon, Image ,Button} from 'semantic-ui-react'


export default function OrderSum() {

let history = useHistory()

const [cart, setCart] = useState({})

let id = localStorage.getItem("currentUser");
useState(() => {
  axios
    .get("http://localhost:8081/cart?id="+id)
    .then(res => {
      setCart(res.data)
    })
    .catch(err => {
      console.log(err)
    })
   

}, [])

function handleButton() {
  history.push("/payment")
}


  return (
    <div>
         <Card centered raised >
   
   <Card.Content>
     <Card.Header>Sipariş Özeti</Card.Header>
     <Card.Meta>
       <span className='date'>Kargo Ücreti  : 15.90</span>
     </Card.Meta>
     <Card.Description >
      Toplam : {cart.total} ₺
     </Card.Description>
   </Card.Content>
   <Card.Content extra>
   <Button onClick={()=>handleButton()} fluid positive>Satın Al</Button>
   </Card.Content>
 </Card>
    </div>
  )
}
