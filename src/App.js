import React, { useState } from "react";
import { BrowserRouter as BrowserRouter, Router, Route, Link } from "react-router-dom";

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
  const [totalCount, setTotalCount] = useState(0);
  const [openCartPreview, setOpenCartPreview] = useState(false);
  const buyBtnPressed = (index, name, size, price, type, season, color, _id) => () => {
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
          _id: _id,

        };
      }

      var sumCount = 0;
      for (var i in newArr)
        sumCount += newArr[i].count
      setTotalCount(sumCount);


      setDatas(newArr);

      setOpenCartPreview(true);
      console.log(openCartPreview);
      { window.sessionStorage.setItem("test", datas) }

      Object.keys(datas).map(key =>
        console.log(sessionStorage.getItem("test")[0].name)
      )







    }


  }

  const modifyCount = (action, amount, key) => {
    let cartItems = [...datas];

    switch (action) {
      case 'INCREASE':
        cartItems[key].count += amount;
        break;

      case 'DECREASE':
        cartItems[key].count -= amount;
        break;

      default:
        break;
    };

    // if the count of the item is 0, remove it from the array of the items in the cart.
    if (cartItems[key].count == 0)
      cartItems.splice(key, 1);

    // calculate how many units of items are in the cart.
    let countOfItems = 0;
    for (var i in cartItems)
      countOfItems += cartItems[i].count;

    // call the function to set the "global" state  
    setTotalCount(countOfItems);
    setDatas(cartItems);
  }


  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Head />
      <Navbar modifyCount={modifyCount}  setOpenCartPreview={setOpenCartPreview} openCartPreview={openCartPreview} datas={datas} totalCount={totalCount} />
      {console.log(openCartPreview)}
      
      <div className="container">
        <Route
          path='/products/:productType/:productCode/:color/:id/'
          render={(props) => (
            <ProductPage datas={datas} buyBtnPressed={buyBtnPressed} {...props} />
          )}
        />
        <Route path='/' exact component={ProductList} />
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
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
};

export default SearchableList;
