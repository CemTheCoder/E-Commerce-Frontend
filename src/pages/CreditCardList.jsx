import axios from 'axios';
import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Icon, Menu, Table , Input , Form , Card} from 'semantic-ui-react';

export default function CreditCardList() {

    const [cards, setCards] = useState([])

    const history = useHistory()

    function handleAdd() {
        history.push("/addcard")
    }

    function handleRemove() {
      history.push("/deletecard")
  }
  
    
    const config = {
        headers: { Authorization: localStorage.getItem("tokenKey") }
    };

    let userId = localStorage.getItem("currentUser")
  
      useState(() => {
        axios
          .get("http://localhost:8081/cards?id="+userId,config)
          .then(res => {
            setCards(res.data)
          })
          .catch(err => {
            console.log(err)
          })
    
    
    
      }, [])
      


  return (
    <div>
        <Button onClick={handleAdd} color='black' size='medium' >Yeni Kart Ekle</Button>
        <Button onClick={handleRemove} color='black' size='medium' >Kart Sil</Button>
        <br/>
        <br/>
        <br/>
        <Card.Group   className='cards'  itemsPerRow={'nine'}   >
    {cards.map(card => (
         <Cards  
         number={card.cardNumber}
         name={card.cardName}
         expiry={card.date}
         cvc={card.cvc}
        
       />
       
    ))
       
    }
     <br/>
     <br/>
     <br/>
    </Card.Group>
     <br/>
    </div>
  )
}
