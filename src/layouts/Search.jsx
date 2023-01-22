import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button, Input } from 'semantic-ui-react'

export default function Search() {

const history = useHistory()
const [productName, setproductName] = useState("")

const onproductNameChange = e => setproductName(e.target.value);


function handleButton() {
  history.push("/search/"+productName)
  history.go(0)
}

  return (
    <div class="ui action input" >
        <Input name ="productName"  value={productName}
              onChange={onproductNameChange} required inverted size='mini'  type="text" placeholder="Search..."/>
        <Button onClick={() => handleButton()} inverted class="ui button" >Ara</Button>
    </div>
  )
}
