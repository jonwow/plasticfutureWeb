import React, { useState } from "react";
import { BrowserRouter, Route,  } from "react-router-dom";

// components
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import StickyFooter from "./components/stickyFooter.component";
import Head from "./components/head.component";
import ProductPage from "./components/product-page.component";

// components-route paths
import ProductList from "./components/product-list.component";
import ScrollToTop from "./scroll-to-top.js";


const SearchableList = () => {
  const [firstTimeBOOL, setFirstTime] = useState(localStorage.getItem("firstVisit"));
  const [datas, setDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [openCartPreview, setOpenCartPreview] = useState(false);
  const buyBtnPressed = (index, name, size, price, type, season, color, _id) => () => {
    if (size === undefined)
    {
     document.getElementById("root").style.cssText = "transition: filter 0.75s; filter: blur(5px) grayscale(1)";
      document.getElementById("choose-a-size-msg").classList.toggle("visible");

      setTimeout(() => {
     document.getElementById("root").style.cssText = "transition: 0.75s; filter: blur(0px) grayscale(0)";
     document.getElementById("choose-a-size-msg").classList.toggle("visible");
    }, 2700);
    }
    else {
      var unique = true;
      let newArr = [...datas];

      newArr.forEach(cartItem => {
        if (cartItem.productCode === index && cartItem.size === size && cartItem.color === color) {
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
    if (cartItems[key].count === 0)
      cartItems.splice(key, 1);

    // calculate how many units of items are in the cart.
    let countOfItems = 0;
    for (var i in cartItems)
      countOfItems += cartItems[i].count;

    // call the function to set the "global" state  
    setTotalCount(countOfItems);
    setDatas(cartItems);
  }
  const firstTime = () =>
  {
    setFirstTime("false");
    localStorage.setItem("firstVisit", "false");
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Head />
{          console.log('public url: ', process.env.PUBLIC_URL)}


      {window.innerWidth <= 240 && window.innerHeight <= 320 &&  window.location.replace("https://genius.com/Playboi-carti-broke-boi-lyrics")}
     
          {/*  */}
      {firstTimeBOOL !== "false" ?
       <div id="first-time-container" onClick={()=> firstTime()}>

         <p class="first-time-welcome-text">ENTER<br/> PLASTIC FUTURE</p>
         <p class="first-time-tnc-gdpr-text">BY CLICKING ANY BUTTON YOU AGREE TO THE TERMS AND CONDITIONS AND THE PRIVACY&GDPR POLICY OF "PLASTIC FUTURE". </p>
      </div>
      :
      <div>
        <ScrollToTop />
        <Navbar modifyCount={modifyCount} setOpenCartPreview={setOpenCartPreview} openCartPreview={openCartPreview} datas={datas} totalCount={totalCount} />

      
      <div className="container" id="top">
        <Route
          path='/products/:productType/:productCode/:color/:id/'
          render={(props) => (
            <ProductPage datas={datas} buyBtnPressed={buyBtnPressed} {...props} />
          )}

        />
        <Route path='/' exact component={ProductList} />
        {/* demo for gh pages */}
        <Route exact path="/1s/"  component={ProductList} />
        <Route path="/products" exact component={ProductList} />
        {/* <Route path="/products/:productType/:productCode/:color/:id/" exact component={ProductPage} /> */}
        <Route exact path="/products/:collection/:productType"  component={ProductList} />
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
      </div>
      }
    </BrowserRouter>
  );
};

export default SearchableList;
