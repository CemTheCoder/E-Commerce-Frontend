
import React , {useState} from 'react'

import { FormField,Button,Label, FormInput, Dropdown, Form } from 'semantic-ui-react';
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Input } from 'semantic-ui-react'
import axios from 'axios';
import { PostWithoutAuth } from '../services/HttpService';


export default function ProductAdd() {

 

  
 

  const history = useHistory()

  

 
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [addressName, setaddressName] = useState("");
  const [number, setnumber] = useState("");

 

 
  const onCityChange = e => setcity(e.target.value);
  const onAddressChange = e => setaddress(e.target.value);
  const onAddressNameChange = e => setaddressName(e.target.value);
  const onNumberChange = e => setnumber(e.target.value);

  let userId = localStorage.getItem("currentUser")



  const sendRequest = () => {
    PostWithoutAuth(("/address"), {
        address : address, 
        addressName : addressName,
        city : city,
        number : number,
        userId : localStorage.getItem("currentUser")
      })
      .then((res) => res.json())
      .then((result) => {})
      .then(console.log(userId))
      .catch((err) => console.log(err))

      toast.success(`Başarıyla kaydedildi`)
      history.push("/addresses")
}

 

  
  

    return (
      <div>

    
        
          <Form>
        
           
              
              <FormInput name ="addressName" placeholder="Adres Başlığı" value={addressName}
              onChange={onAddressNameChange} required/>
           
              <br/>
              <FormInput name ="address" placeholder="Adres" value={address}
              onChange={onAddressChange} required/>
              <br/>
            <FormInput name ="city" placeholder="Şehir" value={city}
              onChange={onCityChange} required/>
              <br/>
            
            <FormInput  name ="number" placeholder="Telefon Numarası" value={number}
              onChange={onNumberChange} required/>
            
           <br/>
           <br/>
            <Button color='black' type="submit" onClick={sendRequest} >Adres Ekle</Button>
           
          </Form>
  
      
       
      </div>
    );
        


        }


  


 

  
