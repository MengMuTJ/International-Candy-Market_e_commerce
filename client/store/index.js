import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productsReducer from './products'
import singleProductReducer from './singleProduct'
import user from './user'
import cart from './cart'
import singleOrder from './singleOrder'
import orders from './orders'

const reducer = combineReducers({
  user: user,
  products: productsReducer,
  cart: cart,
  singleOrder: singleOrder,
  singleProduct: singleProductReducer,
  orders: orders
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
