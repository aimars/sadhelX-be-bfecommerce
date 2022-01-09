
import { combineReducers } from 'redux'
import ProductReducer from './product'
import CartReducer from './cart'
import AuthReducer from './auth'
import RajaOngkirReducer from './rajaongkir'
import PaymentReducer from './payment'

const rootReducer = combineReducers({
    ProductReducer,
    CartReducer,
    AuthReducer,
    RajaOngkirReducer,
    PaymentReducer
});

export default rootReducer