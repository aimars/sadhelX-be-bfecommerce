
import { combineReducers } from 'redux'
import ProductReducer from './product'
import CartReducer from './cart'

const rootReducer = combineReducers({
    ProductReducer,
    CartReducer
});

export default rootReducer