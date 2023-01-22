import { Formik, Form, Field, ErrorMessage } from 'formik'
import React , {useState} from 'react'
import * as Yup from "yup";
import { FormField,Button,Label, FormInput, Dropdown } from 'semantic-ui-react';
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Input } from 'semantic-ui-react'
import axios from 'axios';


export default function ProductAdd() {

  const [file, setFile] = useState({})

  const [categories, setCategories] = useState([])

  const [category, setCategory] = useState({})

  const handleFile = e => {
   
    
    setFile(e.target.files[0])
   
    console.log(e.target.files[0])

  }

 
  useState(() => {
    axios
      .get("http://localhost:8081/categories")
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => {
        console.log(err)
      })



  }, [])




  const initialValues = {
    productName : "",
    price : "" ,
    brand : "" ,
    stock : ""

  }
  const InputExampleRightLabeledTag = () => (
    <Input
      icon='tags'
      iconPosition='left'
      label={{ tag: true, content: 'Add Tag' }}
      labelPosition='right'
      placeholder='Enter tags'
    />
  )
  


  const history = useHistory()

  

  const [productName, setproductName] = useState("");
  const [price, setprice] = useState("");
  const [brand, setbrand] = useState("");
  const [stock, setstock] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setdescription] = useState("");


  const onProductNameChange = e => setproductName(e.target.value);
  const onPriceChange = e => setprice(e.target.value);
  const onBrandChange = e => setbrand(e.target.value);
  const onStockChange = e => setstock(e.target.value);
  const onAvatarChange = e => setAvatar(e.target.value);
  const onDescriptionChange = e => setdescription(e.target.value);

  let userId = localStorage.getItem("currentUser")

  const handleSubmit = e => {
   
    let formData = new FormData()

    formData.append("file" , file)
    formData.append("productName" , productName)
    formData.append("price" , price)
    formData.append("description" , description)
    formData.append("brand"  , brand)
    formData.append("stock" , stock)
    formData.append("categoryId" , category)
    formData.append("userId" , userId)
    axios.post("http://localhost:8081/product",formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => console.log(res));
  
    
   

   
   
   toast.success("Product Created Successfully")
   
  }
  const schema = Yup.object({
    name: Yup.string().required("Ürün adı zorunlu"),
    price: Yup.number().required("ürün fiyatı zorunludur"),
    brand : Yup.string().required("ürün markası zorunlu"),
    stock : Yup.number().required("Stok sayısı zorunlu!"),
    avatar : Yup.string().required("Avatar zorunlu")
  })

  
  const categoryOptions =  categories.map(category => (
    {
      key : category.id,
      text: category.categoryName,
      value:  category.categoryName
    }
  ))
  
  const handleChange = event => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

    return (
      <div>

        {localStorage.getItem("roleId") != 1? "You have not permission in this page" : <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values)=>{ 
            console.log(values)
          }}
        >
          <Form className='ui form'   >
          <KodlamaIoTextInput name ="brand" placeholder="Ürün Markası" value={brand}
              onChange={onBrandChange} required/>
           
              <br/>
              <KodlamaIoTextInput name ="name" placeholder="Ürün Adı" value={productName}
              onChange={onProductNameChange} required/>
           
              <br/>
              <KodlamaIoTextInput name ="price" placeholder="Ürün Fiyatı" value={price}
              onChange={onPriceChange} required/>
              <br/>
            <KodlamaIoTextInput name ="stock" placeholder="Stok Miktarı" value={stock}
              onChange={onStockChange} required/>
              <br/>
            
            <KodlamaIoTextInput  name ="description" placeholder="Ürün Açıklaması" value={description}
              onChange={onDescriptionChange} required/>
            <br/>
            <select value={category} onChange={handleChange}>
        {categories.map(categoryke => (
          <option key={categoryke.id} value={categoryke.id}>
            {categoryke.categoryName}
          </option>
        ))}
      </select>
<br/>

            <input type="file" name="file" class="custom-file-input"
					id="customFile" onChange={(e) => handleFile(e)}  />
           <br/>
           <br/>
            <Button color='black' type="submit" onClick={handleSubmit} >Ürünü Yayınla</Button>
           
          </Form>
  
        </Formik> }
       
      </div>
    );
        


        }


  


 

  
