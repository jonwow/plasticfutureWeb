import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from './components/Routes';
import Breadcrumbs from './components/Breadcrumbs';
import FirstVisit from './components/FirstVisit';
import Footer, { StickyFooter } from "./components/Footers";
import Navbar from "./components/Navbar";




const App = () => {
  // if there is something in the 'cartItems', set 'datas' to it. otherwise - empty array (empty cart)
  const [datas, setDatas] = useState(JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []);
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
    const datasTemp = JSON.parse(JSON.stringify(datas));
    datasTemp[key].count += amount;

    // if the count of the item is 0, remove it from the array of the items in the cart.
    if (datasTemp[key].count === 0)
      datasTemp.splice(key, 1);

    setDatas(datasTemp);
  }



  // whenever 'datas' changes
  React.useEffect(() => {
    // updates localStorage cartItems if 'datas' isn't empty
    localStorage.setItem('cartItems', JSON.stringify(datas));
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