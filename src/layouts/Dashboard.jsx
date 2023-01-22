import React from "react";
import SearchProducts from "../pages/SearchProducts";
import AddressAdd from "../pages/AddressAdd";
import Categories from "./Categories";
import { Container, Grid } from "semantic-ui-react";
import { Route } from "react-router";
import ProductDetail from "../pages/ProductDetail";
import Orders from "../pages/Orders";
import CardRemove from "../pages/CardRemove";
import CartDetail from "../pages/CartDetail";
import { ToastContainer } from "react-toastify";
import ProductAdd from "../pages/ProductAdd";
import CartSummary from "./CartSummary";
import CartComponent from "./CartComponent";
import ProductRemove from "../pages/ProductRemove";
import AddressRemove from "../pages/AddressRemove";
import AddressList from "../pages/AddressList";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Auth from "./Auth";
import AuthRegister from "./AuthRegister";
import ProductListMain from "../pages/ProductListMain";
import CartDetailMain from "../pages/CartDetailMain";
import ProductsCategory from "../pages/ProductsCategory";
import OrderSum from "./OrderSum";
import Profile from "../pages/Profile";
import CreditCardAdd from "../pages/CreditCardAdd";
import CreditCardList from "../pages/CreditCardList";
import Payment from "../pages/Payment";
import PaymentCard from "../pages/PaymentCard";
import PaymentTwo from "../pages/PaymentTwo";

export default function Dashboard() {
  
  return (
    <div>
     <Container >
      <ToastContainer position="bottom-right"/>
      <Switch>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
          <Route exact path="/" component={Categories} />
            <Route exact path="/products" component={Categories} />
            <Route path="/products/:id" component={Categories} />
          
            <Route path="/product/add" component={Categories}/>
            <Route path="/product/remove" component={Categories}/>
            <Route path="/category/:id" component={Categories} />
            <Route path="/search/:name" component={Categories} />
            <Route path="/addresses" component={Categories} />   
            <Route path="/address/add" component={Categories}/>
            <Route path="/cards" component={Categories} />
            <Route path="/deletecard" component={Categories} />
            <Route path="/deleteaddress" component={Categories} />
            <Route path="/orders" component={Categories} />
          </Grid.Column>
          <Grid.Column width={12}>

            <Route exact path="/" component={ProductListMain} />
            <Route exact path="/products" component={ProductListMain} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/category/:id" component={ProductsCategory} />
            <Route path="/address/add" component={AddressAdd}/>
            <Route path="/product/add" component={ProductAdd}/>
            <Route path="/product/remove" component={ProductRemove}/>
            <Route path="/search/:name" component={SearchProducts} />   
            <Route path="/addresses" component={AddressList} />
            <Route path="/cards" component={CreditCardList} />
            <Route path="/deletecard" component={CardRemove} />
            <Route path="/deleteaddress" component={AddressRemove} />
            <Route path="/orders" component={Orders} />
          </Grid.Column>
          <Grid.Column width={16}>
            <br></br>
            <br></br>
            <br></br>
            <Route exact path="/auth">
            {localStorage.getItem("currentUser") != null? <Redirect to="/"/>:<Auth/> }
            </Route>
            
          </Grid.Column>
          <Grid.Column width={16}>
            
            <br></br>
            <Route exact path="/register" component={AuthRegister}/>
           
            
          </Grid.Column>
          <Grid.Column width={16}>

            <Route exact path="/profile" component={Profile}/>
           
            
          </Grid.Column>
          <Grid.Column width={16}>

            <Route exact path="/addcard" component={CreditCardAdd}/>


          </Grid.Column>
          <Grid.Column width={16}>

            <Route exact path="/paymentcard" component={PaymentCard}/>


          </Grid.Column>
          <Grid.Column width={16}>

          <Route exact path="/payment" component={Payment}/>


          </Grid.Column>
          <Grid.Column width={16}>

<Route exact path="/paymentwo/:id" component={PaymentTwo}/>


</Grid.Column>
          <Grid.Column width={10}>
            
          <Route path="/cart" component={CartDetailMain} />
           
            
          </Grid.Column>

          <Grid.Column width={6}>
            
            <Route path="/cart" component={OrderSum} />
             
              
            </Grid.Column>
            
        </Grid.Row>
      </Grid>
      
      
      </Switch>
      </Container>
    </div>
  );
}
