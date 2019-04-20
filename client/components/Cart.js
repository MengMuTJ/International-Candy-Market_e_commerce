import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RemoveButton from './RemoveButton'

class Cart extends React.Component {
  
  
  
  render() {
    const products = this.props.cart
    
    if (!products) {
      return <div>Your cart is empty!</div>
    }
    
    
    return (
      <div>
        
        {products.map(product => {
          return (
            
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name}
                <img src={product.image} />
              </Link>
              
              <RemoveButton product={product}/>
              
            </div>
            
          )
        })}
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchProducts: () => dispatch(fetchProducts())
//   }
// }

export default connect(mapStateToProps)(Cart)
