
import { Button, Divider, Form, Grid, Segment ,Card, Icon} from 'semantic-ui-react'
import axios from 'axios';
import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function Payment() {
    const [cards, setCards] = useState([])

    const history = useHistory()

    function handleButton() {
        history.push("/paymentcard")
    }


    function handleAdd() {
        history.push("/addcard")
    }

    function handleCard(card) {
        history.push("/paymentwo/"+card.id)
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
         <Segment placeholder size='massive'>
    <Grid columns={2} relaxed='very' stackable >
      <Grid.Column>
      <Button onClick={handleAdd} color='black' size='medium' >Yeni Kart Ekle</Button>
        <br/>
        <br/>
        <br/>
        <Card.Group    className='cards'  itemsPerRow={2}   textAlign='center' centered >
    {cards.map(card => (
        <Card key={card.id} href={`/paymentwo/${card.id}`}   >
           
       
        <Card.Content>
          <Card.Header  textAlign='center' >{card.cardNumber}</Card.Header>
          
          <Card.Description>
            {card.cardName}
          </Card.Description>
        </Card.Content>
        <Card.Content extra  textAlign='left'>
          
            <Icon name='date'  />
            {card.date}  
    
        </Card.Content>
        
      </Card>
       
    ))
       
    }
     <br/>
     <br/>
     <br/>
    </Card.Group>
     <br/>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Başka Bir Kartla Ödeme Yapmak İstiyorum' color='black' size='big' onClick={handleButton} />
      </Grid.Column>
    </Grid>

    <Divider vertical></Divider>
  </Segment>
    </div>
  )
}
