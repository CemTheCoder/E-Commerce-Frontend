import React, {useState} from "react";

import { useHistory } from "react-router";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
//import { Button, Form, Input,Checkbox } from "semantic-ui-react";
import { PostWithoutAuth } from "../services/HttpService";
import KodlamaIoTextInput from "../utilities/customFormControls/KodlamaIoTextInput";
import Navi from "./Navi";
function Auth() {
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory();
    

    const onemailchange = e => setEmail(e.target.value);
    const onpasswordchange = e => setPassword(e.target.value);

   
    const handleEmail = (value) => {
        setEmail(value)
    } 

    const handlePassword = (value) => {
        setPassword(value)
    } 
    
    const sendRequest = (path) => {
        PostWithoutAuth(("/auth/"+path), {
            email : email, 
            password : password,
          })
          .then((res) => res.json())
          .then((result) => {localStorage.setItem("tokenKey",result.message);
                            localStorage.setItem("roleId",result.roleId)
                            localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("email",email)
                            console.log(localStorage)
                            history.go()})
          .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setEmail("")
        setPassword("")
        

       
        
    }
    
   
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} >
  <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2' color='black' textAlign='center'>
      <Image src='https://i.hizliresim.com/4rsh628.png' avatar/> Hesabına Giriş Yap
    </Header>
    <Form size='large'>
      <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' id='email'
      name ="email"  value={email}
        onChange={onemailchange} required />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          
      name ="password"  value={password}
        onChange={onpasswordchange} required
        />

        <Button color='black' fluid size='large' type='button' onClick={() =>handleButton("login") }>
          Giriş Yap
        </Button>
      </Segment>
    </Form>
    <Message>
      Aramızda yeni misin? <a href='/register'>Üye Ol</a>
    </Message>
  </Grid.Column>
</Grid>


   /* <Form>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' size="50"
      id='email'
      name ="email"  value={email}
        onChange={onemailchange} required />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password'
      type="password"
      name ="password"  value={password}
        onChange={onpasswordchange} required/>
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='button' onClick={() =>handleButton("login") } >Login</Button>
  </Form>
  */

  

   
    )
    
}

export default Auth;