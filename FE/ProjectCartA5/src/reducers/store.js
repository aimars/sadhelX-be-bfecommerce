import { createStore, applyMiddleware } from 'redux';
import reducers from './index';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export default store