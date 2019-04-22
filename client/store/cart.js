import axios from 'axios'


/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';
const LOADED_CART = 'LOADED_CART';

/**
 * INITIAL STATE
 */
const defaultCart = [];

/**
 * ACTION CREATORS
 */
const addToStoreCart = (cart) => ({type: ADD_TO_CART, cart})

const loadedCart = (cart) => ({type: LOADED_CART, cart})


/**
 * THUNK CREATORS
 */
export const addToCart = (product) => async dispatch => {
  try {
    const cartResponse = await axios.post('/api/cart', product);
    const updatedCart = await axios.get('/api/cart')
    dispatch(addToStoreCart(updatedCart.data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchCart = () => async dispatch => {
  try {
    const updatedCart = await axios.get('/api/cart');
    dispatch(loadedCart(updatedCart.data));
  } catch (err) {
    console.log(err)
  }
}

export const removeFromCart = (product) => async dispatch => {
  try {
    const cartResponse = await axios.post('./api/cart/remove', product);
    const updatedCart = await axios.get('/api/cart');
    dispatch(loadedCart(updatedCart.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.cart
    case LOADED_CART:
      return action.cart
    default:
      return state
  }
}




// cart on store
// backend remove from cart thingy
// respond with cart
// update it on store
// move onto editing quantity
// i guess use onchange there. or have a submit thing on there too.
