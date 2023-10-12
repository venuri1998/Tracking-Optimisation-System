import React, { Component } from 'react';

class AddOrder extends Component {
  constructor() {
    super();
    this.state = {
      order: {
        productName: '',
        quantity: 0,
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      order: {
        ...prevState.order,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log('Submitted data:', this.state.order);
  };

  render() {
    const { order } = this.state;

    return (
      <div>
        <h2>Add New Order</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={order.productName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={order.quantity}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddOrder;
