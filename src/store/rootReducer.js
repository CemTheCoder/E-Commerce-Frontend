//tüm stateleri topladığım yer

import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducers";
import ProductReducer from "./reducers/productReducers";


const rootReducer = combineReducers({
    cart : cartReducer,
    product : ProductReducer
   
})


export default rootReducer;