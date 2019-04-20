/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../store/cart'

const AddToCartButtonAllProducts = function(props) {
  let product = props.product;
  product.cart = {quantity: 1}
  
  const handleSubmit = function(event) {
    event.preventDefault();
    props.addToCart(product);
  }
  
  return (
    <div>
      <form onClick={handleSubmit}>
        <button type="submit">
          Add To Cart
        </button>
      </form>
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product))
  }
}

export default connect(null, mapDispatchToProps)(RemoveButton)
