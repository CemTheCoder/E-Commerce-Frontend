import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import { Button, Icon, Menu, Table , Input , Form} from 'semantic-ui-react';
import 'react-credit-cards/es/styles-compiled.css'
import { PostWithoutAuth } from '../services/HttpService';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function CreditCardAdd() {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')

    let history = useHistory()
  
    let userId = localStorage.getItem("currentUser")
  
  
  
    const sendRequest = () => {
      PostWithoutAuth(("/credit"), {
        cardNumber : number, 
        cardName : name,
        date : expiry,
        cvc : cvc,
        userId : localStorage.getItem("currentUser")
        })
        .then((res) => res.json())
        .then((result) => {})
        .then(console.log(userId))
        .catch((err) => console.log(err))

        toast.success(`Başarıyla kaydedildi`)
        history.push("/cards")
  }
  

  return (
    <div>
 <Cards 
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <Form size='big'>
      <br/>
      <br/>
        <Input
          type='tel'
          name='number'
          placeholder='Kart Numarası'
          value={number}
          onChange={e => setNumber(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br/>
        <br/>
        <Input
          type='text'
          name='name'
          placeholder='Kart Sahibi'
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br/>
        <br/>
        <Input
          type='text'
          name='expiry'
          placeholder='Son Kullanma Tarihi'
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
       {" "}
        <Input
          type='tel'
          name='cvc'
          placeholder='CVC'
          value={cvc}
          onChange={e => setCvc(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br/>
        <br/>
        <Button color='black' type="submit" onClick={sendRequest} >Kaydet</Button>
      </Form>
    </div>
  )
}
