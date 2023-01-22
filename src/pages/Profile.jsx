import axios from 'axios';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import { Grid, Segment, Header, Image, Card, Icon, Button, Divider, Radio, Form ,Menu, Input} from 'semantic-ui-react';

export default function Profile() {

    const profile = "Bilgilerim"
    const options = "Seçenekler"
    const xd = "Siparişlerim"
    const xdd = "Kayıtlı Kartlarım"
    const [file, setFile] = useState({})
    const [user, setUser] = useState({})

    let userId = localStorage.getItem("currentUser")

    const history = useHistory()
    const handleFile = e => {
   
    
        setFile(e.target.files[0])
       
        console.log(e.target.files[0])
    
      }
    

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

      const handleSubmit = e => {
   
        let formData = new FormData()
    
        formData.append("id" , userId)
        formData.append("file" , file)
        axios.post("http://localhost:8081/avatar",formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => console.log(res));
      
        
       
    
       
       history.go(0)
       toast.success("Avatar Başarıyla Güncellendi")
       
      }



  return (
    <div>
        <Grid columns={1} stackable className="fill-content">
      <Grid.Column width={1} />
      <Grid.Column width={7}>
        <Segment>
          <Header as="h1">{profile}</Header>
          <Image className="centered"  src={'data:image/jpeg;base64,'+user.image}  size="medium" circular />
          <Card fluid>
            <Card.Content>
              <Card.Header>{user.name + " " + user.surname}</Card.Header>
              <Card.Meta></Card.Meta>
              <Card.Description>Email : {user.email}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
             
              <Input type="file" name="file" class="custom-file-input"
					id="customFile" onChange={(e) => handleFile(e)} transparent  size='mini' />   <Button type="submit" onClick={handleSubmit} color="teal" size='small'>Profil Resmini Değiştir</Button>
          
              </a>
            </Card.Content>
          </Card>
        </Segment>
      </Grid.Column>
      <Grid.Column width={7}>
        <Segment>
          <Header as="h2">{options}</Header>
          
          <Divider />
          <Menu  pointing vertical fluid size='large' >
          <Menu.Item
          as={NavLink} to="/orders"
          name={xd}
         
         
        />
        <Menu.Item
          name='Adreslerim'
          as={NavLink} to="/addresses"
        />
        <Menu.Item
          name={xdd}
          as={NavLink} to="/cards"
        />
         
        <Menu.Item 
          name=' AresPay'
          as={NavLink} to="/arespay"
        />
      </Menu>
          <Divider />
          <Header as="h4">Bildirimler</Header>

          <Radio toggle />
          <Header as="h4"></Header>
          
        </Segment>
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid>
    </div>
  )
}
