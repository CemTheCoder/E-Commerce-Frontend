import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Menu } from 'semantic-ui-react'

export default function Categories() {

  return (
    <div>
     
      <Menu pointing vertical fluid >
        <Menu.Item as={NavLink} to="/" 
          name="Ana Sayfa" 
        />
        {localStorage.getItem("roleId") == 1? <Menu.Item as={NavLink} to="/product/add"
          name="Add Product"
        /> : "" }
        
        {localStorage.getItem("roleId") == 1? <Menu.Item as={NavLink} to="/product/remove"
          name="Remove Product"
         
        /> : "" }
        
      </Menu>
    </div>
  );
}
