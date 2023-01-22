
import React, {useState} from "react";

import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Button, Form, Grid, Header, Image, Message, Segment , Checkbox } from 'semantic-ui-react'


import { PostWithoutAuth } from "../services/HttpService";

export default function AuthRegister() {
    const [name, setname] = useState("")
    const [surname, setsurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory();

    const onemailchange = e => setEmail(e.target.value);
    const onpasswordchange = e => setPassword(e.target.value);
    const onnamechange = e => setname(e.target.value);
    const onsurnamechange = e => setsurname(e.target.value);
    
   
   
    
    const sendRequest = (path) => {
        PostWithoutAuth(("/auth/"+path), {
            email : email, 
            password : password,
          })
          .then((res) => res.json())
          .then((result) => console.log("xd"))
          .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setEmail("")
        setPassword("")
        setname("")
        setsurname("")
        history.push("/auth")
       toast.success("Başarıyla kayıt olundu!")
       
        
    }
   

  return (
    <div>
       <Grid textAlign='center' style={{ height: '100vh' }} >
  <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2' color='black' textAlign='center'>
      <Image src='https://i.hizliresim.com/4rsh628.png' avatar/> Aramıza Katıl
    </Header>
    <Form size='large'>
      <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Ad' 
      id='Name'
      name ="Name"  value={name}
        onChange={onnamechange} required />
         <Form.Input fluid icon='user' iconPosition='left' placeholder='Soyad' 
      id='Surname'
      name ="Surname"  value={surname}
        onChange={onsurnamechange} required />
         <Form.Input fluid icon='user' iconPosition='left' placeholder='E-posta' id='email'
      name ="email"  value={email}
        onChange={onemailchange} required />
        
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Şifre'
          type='password'
          
      name ="password"  value={password}
        onChange={onpasswordchange} required
        />

        <Button color='black' fluid size='large' type='button' onClick={() =>handleButton("register") }>
          Üye Ol
        </Button>
      </Segment>
    </Form>
   
  </Grid.Column>
</Grid>

     
   
  
    </div>
  )
}
