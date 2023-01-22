import React, {  useState } from 'react'
import { Menu } from 'semantic-ui-react'
import axios from 'axios';
export default function NaviTwo() {

  const [products, setProducts] = useState([])


  const SendRequest = (id) => {
    useState(() => {
      axios
        .get("http://localhost:8081/productske?id="+id)
        .then(res => {
          setProducts(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  
  
  
    }, [])
  }
  return (
    <div>
        <br/>
        <br/>
        
        <Menu  inverted size="huge" widths={9} stackable >
        <Menu.Item  
          name='Elektronik'
          
          href={`/category/${4}`}
        >
          Elektronik
        </Menu.Item>
        <Menu.Item  
          name='Moda'
          href={`/category/${5}`}
        >
          Moda
        </Menu.Item>
        <Menu.Item  
          name='Ev,Mobilya'
          href={`/category/${6}`}
        >
          Ev,Mobilya
        </Menu.Item>
        <Menu.Item  
          name='Oto, Bahçe, Yapı Market'
          href={`/category/${7}`}
        >
          Oto, Bahçe, Yapı Market
        </Menu.Item>

        <Menu.Item
          name='Anne & Çocuk'
          href={`/category/${8}`}
        >
          Anne & Çocuk
        </Menu.Item>
        

        <Menu.Item
          name='Spor, Outdoor'
          href={`/category/${9}`}
        >
          Spor, Outdoor
        </Menu.Item>
      </Menu>
    </div>
  )
}
