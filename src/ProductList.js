import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class ProductList extends Component {
  
  // constructor(props){
  // constructor olmasa da olur props
  //     super(props);
  //     state:{}
  // }



  render() {
    return (
      <div>
        <h2>
          {this.props.info.title} - {this.props.currentCategory}
        </h2>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category ID</th>
              <th>Quantity Per Unit</th>
              <th>UnitPrice</th>
              <th>UnitsInStock</th>
              <th>Add To Cart</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.ProductName}</td>
                  <td>{product.CategoryID}</td>
                  <td>{product.QuantityPerUnit}</td>
                  <td>{product.UnitPrice}</td>
                  <td>{product.UnitsInStock}</td>
                  <td><Button onClick={() => this.props.addToCart(product)} color="info">add</Button></td>
                </tr>
              ))
              
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
