import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
export default class CategoryList extends Component {
  // constructor(props){
  //     //constructor olmasada olur
  //     super(props);
  //     this.state={}
  // }

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       categories: [
  //         { categoryId: 1, categoryName: "Beverages" },
  //         { categoryId: 2, categoryName: "Condiments" },
  //         { categoryId: 3, categoryName: "Leverages" },
  //       ],
  //     };
  //   }

  state = {
    categories: [
      //   { categoryId: 1, categoryName: "Beverages" },
      //   { categoryId: 2, categoryName: "Condiments" },
      //   { categoryId: 3, categoryName: "Leverages" },
    ],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {
    return (
      <div>
        <h2>{this.props.info.title}</h2>
        <h3>{this.state.counter}</h3>
        <ListGroup>
          {
            this.state.categories.map((category) => (
              <ListGroupItem
                active={
                  category.categoryName === this.props.currentCategory
                    ? true
                    : false
                }
                onClick={() => this.props.changeCategory(category)}
                key={category.id}
              >
                {category.categoryName}
              </ListGroupItem>
            ))
            //döngülerde key istiyor
            // biz onclick ile state değiştiricez o yüzden
          }
        </ListGroup>
        <h4>{this.props.currentCategory}</h4>
      </div>
    );
  }
}
