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
        sumCount+= newArr[i].count
      setTotalCount(sumCount);
    

      setDatas(newArr);

      setOpenCartPreview(true);
      { window.sessionStorage.setItem("test", datas) }

      Object.keys(datas).map(key =>
        console.log(sessionStorage.getItem("test")[0].name)
      )







    }


  }
  const modifyCount = (action, key) => {
    var newArr = [...datas];

    switch (action) {
      case 'INCREASE':
        newArr[key].count++;
        break;

      case 'DECREASE':
        newArr[key].count--;
        break;

      default:
        break;
    };

    console.log(key);

    for (var i = 0; i < newArr.length; i++)
      console.log(newArr[i]);

    if (newArr[key].count == 0)
      newArr.splice(key, 1);

    for (var i = 0; i < newArr.length; i++)
      console.log(newArr[i]);

      var sumCount = 0;
      for (var i in newArr)
        sumCount+= newArr[i].count
      setTotalCount(sumCount);
    

    setDatas(newArr);
  }


  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Head />
      <Navbar modifyCount={modifyCount} openCartPreview={openCartPreview} datas={datas} totalCount={totalCount} />
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
