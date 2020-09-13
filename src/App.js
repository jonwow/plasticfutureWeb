import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import StickyFooter from "./components/stickyFooter.component";
import Head from "./components/head.component";
import ProductPage from "./components/product-page.component";

// components-route paths
import ProductList from "./components/product-list.component";
import ScrollToTop from "./scroll-to-top.js";


const SearchableList = ({ }) => {



  const [datas, setDatas] = useState([]);

  const updateFieldChanged = (index, name, size, price,type,season,color,_id) => () => {
    if (size == undefined)
      alert('select a size (temporary fix)')
    else {
      var unique = true;
      let newArr = [...datas];

      newArr.forEach(cartItem => {
        if (cartItem.productCode == index && cartItem.size == size) {
          console.log('THERE IS ONE!');
          unique = false;
          cartItem.count++;
        }
      });

      if (unique) {
        newArr[newArr.length] = {
          productCode: index,
          name: name,
          size: size,
          price: price,
          count: 1,
          type: type,
          season: season,
          color: color,
          _id:_id
        };
      }

      setDatas(newArr);
    }
  }

  var sum = 0;

  return (
    <Router>
      <ScrollToTop />
      <Head />
      <Navbar datas={datas} />

      {datas.map((data) => {
        return <input type="text" name="name" value={data.name + ' ' + data.count + ' ' + data.size + ' ' + data.price * data.count + '€'} />
      })
      }

      <p>
        total:
        {datas.map((data) => {
        sum += data.price * data.count;
      })}
        {sum + '.00€'}
      </p>


      <div className="container">
        <Route
          path='/products/:productType/:productCode/:color/:id/'
          render={(props) => (
            <ProductPage datas={datas} updateFieldChanged={updateFieldChanged} {...props} />
          )}
        />
        <Route path="/" exact component={ProductList} />
        {/* demo for gh pages */}
        <Route exact path="/plasticfutureWeb/" exact component={ProductList} />
        <Route path="/products" exact component={ProductList} />
        {/* <Route path="/products/:productType/:productCode/:color/:id/" exact component={ProductPage} /> */}
        <Route exact path="/products/:collection/:productType" exact component={ProductList} />
        <Route
          exact path='/products/:productType/'
          render={(props) => (
            <ProductList {...props} isAuthed={1} />
          )}
        />

        <Route path="/yourAccount">
          yourAccount
        </Route>
        <Route path="/collections">
          collections:
        </Route>
        <Route path="/collections/:collectionName">
          page of a certain collection, soon to be implemented!
        </Route>
        <Route path="/contacts">
          contacts
        </Route>

        <StickyFooter />
        <Footer />

      </div>
    </Router>
  );
}

export default SearchableList;
