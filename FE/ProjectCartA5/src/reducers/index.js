
import { combineReducers } from 'redux'
import ProductReducer from './product'
import CartReducer from './cart'
import AuthReducer from './auth'
import RajaOngkirReducer from './rajaongkir'

const rootReducer = combineReducers({
    ProductReducer,
    CartReducer,
    AuthReducer,
    RajaOngkirReducer
});

export default rootReducer