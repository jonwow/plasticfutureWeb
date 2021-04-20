import React, { useState } from "react";
import Routes from './components/Routes.component';
var timerID;


const App = () => {
  const [datas, setDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [openCartDropdown, setOpenCartDropdown] = useState(false);

  const cartPreviewTimeout = (action) => {
    clearTimeout(timerID)

    if (action === 'SET')
      timerID = setTimeout(() => {
        setOpenCartDropdown(false);

        // prevent memory leaks
        return () => clearTimeout(timerID);
      }, 4500);
  }

  const modifyCount = (amount, key) => {
    let datasTemp = JSON.parse(localStorage.getItem('cartItems'));
    datasTemp[key].count += amount;

    // if the count of the item is 0, remove it from the array of the items in the cart.
      if(datasTemp[key].count === 0) {
      datasTemp.splice(key, 1);
    }

    setDatas(datasTemp);
    
    // if 0 items are present in the array after removing the last one
    localStorage.setItem('cartItems', JSON.stringify(datasTemp))
  }



  // updates localStorage cartItems, total item count
  React.useEffect(() => {
    let countOfItems = 0;
    for (var i in datas)
      countOfItems += datas[i].count;

    // call the function to set the "global" state  
    setTotalCount(countOfItems);

    // if there is something in 'datas', update the localStorage
    if (datas.length > 0)
      localStorage.setItem('cartItems', JSON.stringify(datas))

    // if there are no items in the cart and localStorage has something in it
    if (datas.length === 0 && JSON.parse(localStorage.getItem('cartItems')) !== null && JSON.parse(localStorage.getItem('cartItems')).length !== 0) {
      setDatas(JSON.parse(localStorage.getItem('cartItems')));
    }


  }, [datas]);


  return (
    <Routes datas={datas} modifyCount={modifyCount} cartPreviewTimeout={cartPreviewTimeout} openCartDropdown={openCartDropdown} totalCount={totalCount} setDatas={setDatas} setOpenCartDropdown={setOpenCartDropdown} setTotalCount={setTotalCount} />
  );
};

export default App;