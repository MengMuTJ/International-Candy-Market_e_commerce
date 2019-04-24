import React from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/products'

import './CreateNewProductForm.css'

export class CreateNewProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      image: '',
      inventory: 0,
      price: 0.0
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const newProduct = this.state
    this.props.addNewProduct(newProduct)
  }

  render() {
    return (
      <div id="make-item-container">
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2>Create A New Product: </h2>
          <label>Product Name: </label>
          <br />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Description: </label>
          <br />
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Image: </label>
          <br />
          <input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Inventory: </label>
          <br />
          <input
            type="integer"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Price: </label>
          <br />
          <input
            type="float"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <button id="make-item-button" type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => {
  return {
    addNewProduct: newProduct => dispatch(addNewProduct(newProduct))
  }
}

export default connect(mapState, mapDispatch)(CreateNewProductForm)
