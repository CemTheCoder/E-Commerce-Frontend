import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import { Button, ButtonOr, Form, Select } from 'semantic-ui-react'
import { PostWithoutAuth } from '../services/HttpService'

export default function PaymentTwo() {

    let { id } = useParams()

    const history = useHistory()
    
    const [addressId, setAddressId] = useState()
    const [address, setAddress] = useState({})
    const [card, setCard] = useState({})
    const [total, setTotal] = useState()
    const [addresses, setAddresses] = useState([])
    const [user, setUser] = useState({})
    
    let userId = localStorage.getItem("currentUser")
   
    const config = {
      headers: { Authorization: localStorage.getItem("tokenKey") }
  };

  useState(() => {
    axios
      .get("http://localhost:8081/cart?id="+userId,config)
      .then(res => {
        setTotal(res.data.total)
        console.log(res.data.total)
      })
      .catch(err => {
        console.log(err)
      })



  }, [])

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
    useState(() => {
      axios
        .get("http://localhost:8081/user?id="+userId,config)
        .then(res => {
          setUser(res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  
  
  
    }, [])

    useState(() => {
        axios
          .get("http://localhost:8081/card?id="+id,config)
          .then(res => {
            setCard(res.data)
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
    
    
    
      }, [])
      
  
    




    const handleChange = event => {
        console.log(event.target.value);
        
        axios
        .get("http://localhost:8081/address?id="+event.target.value,config)
        .then(res => {
          setAddress(res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      };

      const sendRequest = () => {
        PostWithoutAuth(("/order"), {
          price : total, 
          user : user,
          address : address,
          creditCard : card,
          })
          .then((res) => res.json())
          .then((result) => {console.log(result)})
          .then(console.log(userId))
          .catch((err) => console.log(err))



          PostWithoutAuth(("/payment?id="+id+"&price="+total), {
                      
            })
            .then((res) => res.json())
            .then((result) => {console.log(result)})
            .then(console.log(userId))
            .catch((err) => console.log(err))




    
          toast.success(`Satın Alma İşlemi Başarıyla Gerçekleştirildi..`)





          history.push("/")
    }
    

    
     
        

  return (
    <div>
        <Form>

        <h1>Adresinizi Seçiniz</h1>

        <br/>

        <select value={addressId} onChange={handleChange}>
        {addresses.map(addresske => (
          <option key={addresske.id} value={addresske.id}>
            {addresske.addressName}  {addresske.address}
          </option>
        ))}
      </select>


      <br/>
      
      <br/>
        
      <Button color='black' type="submit" onClick={sendRequest} >Alışverişi Tamamla</Button>

      </Form>

    </div>
  )
}
