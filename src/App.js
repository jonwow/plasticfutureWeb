import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from './components/Routes';
import Breadcrumbs from './components/Breadcrumbs';
import FirstVisit from './components/FirstVisit';
import Footer, { StickyFooter } from "./components/Footers";
import Navbar from "./components/Navbar";




const App = () => {
  const [datas, setDatas] = useState([]);
  const [openCartDropdown, setOpenCartDropdown] = useState(false);

  // let timerID;
  // const cartPreviewTimeout = (action) => {
  //   clearTimeout(timerID)

  //   if (action === 'SET')
  //     timerID = setTimeout(() => {
  //       setOpenCartDropdown(false);

  //       // prevent memory leaks
  //       return () => clearTimeout(timerID);
  //     }, 4500);
  // }

  const modifyCount = (amount, key) => {
    let datasTemp = JSON.parse(JSON.stringify(datas));
    datasTemp[key].count += amount;

    // if the count of the item is 0, remove it from the array of the items in the cart.
    if (datasTemp[key].count === 0) {
      datasTemp.splice(key, 1);
    }


    setDatas(datasTemp);

    localStorage.setItem('cartItems', JSON.stringify(datasTemp));
  }

  console.log(localStorage.getItem('cartItems'))
  console.log(localStorage.getItem('cartItems') === true)

  // a deeper problem exists . probably in modify count

  // updates localStorage cartItems
  React.useEffect(() => {
    // if there is something in 'datas', update the localStorage
    if (datas.length > 0)
      localStorage.setItem('cartItems', JSON.stringify(datas));
    // throws an error for some reason
    else if (localStorage.getItem('cartItems') !== null)
      // OR if there are no items in the cart and localStorage has something in it
      if (datas.length === 0 && localStorage.getItem('cartItems') !== [] && localStorage.getItem('cartItems').length > 0 && 0) {
        console.log('x')
        setDatas(JSON.parse(localStorage.getItem('cartItems')));
      }
  }, [datas]);




  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {
        // localStorage.getItem("firstVisit") !== "false" ?
        //     <FirstVisit />
        //     :
        <div className="container" id="top">
          <Navbar datas={datas} modifyCount={modifyCount} openCartDropdown={openCartDropdown} setOpenCartDropdown={setOpenCartDropdown} />
          <Breadcrumbs />

          <Routes datas={datas} openCartDropdown={openCartDropdown} setDatas={setDatas} setOpenCartDropdown={setOpenCartDropdown} />

          <StickyFooter />
          <Footer />
        </div>
      }
    </BrowserRouter>
  );
};

export default App;