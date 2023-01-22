import React, {useState} from "react";
import CartSummary from "./CartSummary";
import { Container, Image, Menu,Button,Dropdown } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Search from "./Search";
import axios from "axios";

export default function Navi() {
  const {cartItems} = useSelector(state => state.cart)
  
  const history = useHistory()
  const [user, setUser] = useState({})

  let userId = localStorage.getItem("currentUser")

  useState(() => {
      axios
        .get("http://localhost:8081/user?id="+userId)
        .then(res => {
          setUser(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  
  
    }, [])



  function handleSignOut() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("roleId");
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("email");
   
  history.go(0);
 
    
  }

  function handleAddresses() {
    history.push("/addresses")
  }

  function handleInfo() {
    history.push("/profile")
  }
  
  function handleCard() {
    history.push("/cards")
  }
   
  function handleOrders() {
    history.push("/orders")
  }

   
  function handleAres() {
    history.push("/arespay")
  }

 
  const src = '/images/wireframe/image.png'
  return (
    <div>
      <Menu inverted fixed="top" size="huge">
        <Container>
        <Menu.Menu position="left">
        <Menu.Item>
            <Search />
            </Menu.Item>
          
      
         
          </Menu.Menu>
          
          <Image floated="left" spaced centered src='https://i.hizliresim.com/akyxoyr.png'   size='tiny'  />
          


          <Menu.Menu position="right">
          {localStorage.getItem("currentUser") != null?<CartSummary/>
            :""}  
            
            {localStorage.getItem("currentUser") != null?  <Menu.Item>
                <Image avatar spaced="right" src={'data:image/jpeg;base64,'+user.image}/>
                <Dropdown pointing="top right" text={user.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info" onClick={handleInfo} />
                        <Dropdown.Item text="Siparişlerim" icon="box" onClick={handleOrders}/>
                        <Dropdown.Item text="Adreslerim" icon="archive" onClick={handleAddresses}/>
                        <Dropdown.Item text="Kayıtlı Kartlarım" icon="address card" onClick={handleCard}/>
                        <Dropdown.Item text="AresPay" icon="bar" onClick={handleAres}/>
                        <Dropdown.Item onClick={handleSignOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item> : <Menu.Item>
               <Button   inverted as={NavLink} to="/auth">Giriş yap</Button>
               <Button inverted style={{marginLeft:'0.5em'}} as={NavLink} to="/register">Kayıt Ol</Button> 
            </Menu.Item> }
           
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}