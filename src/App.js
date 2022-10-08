import "./App.css";
import React, { Component } from "react";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";
export default class App extends Component {
  //Bizim yaptığımız projede categorylist üzerinden seçilen ürün kategorisinin
  // product liste geçmesini ve listelenmesini istiyoruz
  // categorylist üzerinden product list geçiremeyeceğimiz için
  //ana classı app.js category işlemlerini çektik
  // artık alt class olan productliste props bilgi yollayabiliriz.

  // burada currentcategory sadece buraya özel bir veri o yüzden state oldu
  // ama eventi ve veriyi yollayabilmek adına categorylist içinde state adı ile yolladık
  // categorylist.js kısmında bu bilgi props olarak tutuldu ve veri transferi başarıyla gerçekleşti.

  //bu state kullanılan bütün kısımlar yeniden render edilir.

  // "Switch"  yerine "Routes"
  // Route içindeki "component" yerine de "element" kullanmak geriyor.

  state = { currentCategory: "", products: [], cart: [] };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.ProductName + "added to cart!", 2);
  };

  getProducts = (CategoryID) => {
    let url = "http://localhost:3000/products";

    if (CategoryID) {
      url += "?CategoryID=" + CategoryID;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((p) => p.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.ProductName + "removed from cart!", 2);
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              {/* <ProductList
                products={this.state.products}
                addToCart={this.addToCart}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              /> */}
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  }
                />
                <Route
                  exact
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                      products={this.state.products}
                    />
                  }
                />
                <Route path="/form1" element={<FormDemo1 />} />
                <Route path="/form2" element={<FormDemo2 />} />
                <Route element={<NotFound />} />
                {/* routes tek tek gezer en üstten aşağı exact ile
                tam yol varsa olur yoksa en altta not found kullanılır */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
