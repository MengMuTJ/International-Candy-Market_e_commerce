import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productsReducer from './products'
import singleProductReducer from './singleProduct'
import user from './user'
import cart from './cart'
<<<<<<< HEAD
import orders from './orders'
=======
import singleOrder from './singleOrder'
>>>>>>> origin/single-order-componenct

const reducer = combineReducers({
  user: user,
  products: productsReducer,
<<<<<<< HEAD
<<<<<<< HEAD
  cart: cart,
  orders: orders
=======
  singleProduct: singleProductReducer,
  cart: cart
>>>>>>> d71f48ef30a5b672faa126ce7eae32e627c1bee1
=======
  cart: cart,
  singleOrder: singleOrder,
  singleProduct: singleProductReducer
>>>>>>> origin/single-order-componenct
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
