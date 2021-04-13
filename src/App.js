import React, { useState } from "react";
import Routes from './components/Routes.component';
var timerID;


export default () => {
  const [datas, setDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [openCartPreview, setOpenCartPreview] = useState(false);


  const cartPreviewTimeout = (action) => {
    clearTimeout(timerID)

    if (action === 'SET')
      timerID = setTimeout(() => {
        setOpenCartPreview(false);
        return () => clearTimeout(timerID);
      }, 4500);
  }

  // called everytime 'datas' is updated. it updates localStorage cartItems, total item count
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
    <Routes cartPreviewTimeout={cartPreviewTimeout} datas={datas} openCartPreview={openCartPreview} totalCount={totalCount} setDatas={setDatas} setOpenCartPreview={setOpenCartPreview} setTotalCount={setTotalCount} />
  );
};