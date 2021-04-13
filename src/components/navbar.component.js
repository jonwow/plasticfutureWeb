import React, { useState } from "react";
import { Link } from "react-router-dom";
import priceFormatting from './priceFormatting';


export default (props) => {
  const LeftContainer = () => {
    return (
      <div style={{ width: "5vh", margin: "0 auto" }} >
        {/* OPENED */}
        { openedThreeLines &&
          <div onClick={() => { setOTL(false) }}>
            <ThreeLines>
              <DropdownMenu />
            </ThreeLines>
          </div>}


        {/* CLOSED */}
        { !openedThreeLines &&
          <div onClick={() => { setOTL(true) }}>
            <ThreeLines></ThreeLines>
          </div>}
      </div>
    );
  };

  const ThreeLines = (props) => {
    return (
      <div style={{ width: "5vh", margin: "0 auto" }}>
        <img
          src={require('../../src/images/navbar/threeLines.png')}
          className="icon-button clickable"
          alt="threeLines-logo"
          id='three-lines-img'
        />

        {/* dropdown */}
        {props.children}
      </div>
    );
  }

  const DropdownMenu = () => {

    function DropdownItem(props) {
      return props.children;
    }

    return (
      <ul className="dropdown" >
        <DropdownItem>
          <Link to="/products/" className="menu-item">
            <li>ALL PRODUCTS</li>
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link to="/products/t-shirt" className="menu-item">
            <li>T-SHIRTS</li>
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link to="/products/tote" className="menu-item">
            <li>TOTE BAGS</li>
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link to="/collections" className="menu-item">
            <li>COLLECTIONS</li>
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link to="/contacts" className="menu-item">
            <li>CONTACTS</li>
          </Link>
        </DropdownItem>
      </ul>
    );
  }





  const CartMenu = ({ fields }) => {
    // only fires off when clicking on an opened cart's icon
    const handleClick = (e) => {
      props.cartPreviewTimeout('clear');


      if (e.target.id === 'cart-img')
        props.setOpenCartPreview(false);
    }

    return (
      <div style={{ width: "5vh", margin: "0 auto" }}  >
        {props.openCartPreview && (
          <div onClick={handleClick}>
            <Cart >
              <DropdownCart fn={props.setOpenCartPreview} fields={fields} />
            </Cart>
          </div>
        )}
        {!props.openCartPreview &&
          <div onClick={() => { props.setOpenCartPreview(true) }}>
            <Cart></Cart>
          </div>
        }
      </div>

    );
  };

  const Cart = (props) => {
    return (
      <div style={{ width: "5vh", margin: "0 auto" }}>
        <img
          src={require('../../src/images/navbar/cart.png')}
          className="icon-button clickable"
          alt="cart-logo"
          id='cart-img'
        />

        {/* dropdown */}
        {props.children}
      </div>
    );
  }



  const DropdownCart = ({ fn, fields }) => {
    let sum = 0;
    var cartItems = { ...fields.datas };

    function DropdownItem(props) {
      return props.children;
    }



    Object.keys(cartItems).map(key =>
      sum += cartItems[key].price * cartItems[key].count
    )

    let sumStr = priceFormatting(sum);


    return (
      <div>
        <ul className="dropdown" id="cartDropdown" >
          <div className="dropdownChild">
            {cartItems[0] === undefined ? <li style={{ textAlign: "center", padding: '2rem 0' }} >no products.</li> :


              Object.keys(cartItems).map(key =>
                <DropdownItem key={key} >
                  {/* 10rem+2*2rem(padding) *3 */}
                  <div value={key} className="cart-item" style={{ height: "10rem", display: "block", padding: '2rem 0', background: 'whitesmoke' }}>
                    <li className="cartPreviewItem">

                      {/* image of the product */}
                      <div style={{ margin: '0 auto' }}>
                        <Link to={{
                          pathname: "/products/" + cartItems[key].type + '/' + cartItems[key].productCode + '/' + cartItems[key].color + '/' + cartItems[key]._id + "/",
                        }} >
                          <img
                            className=""
                            src={require('../../src/images/' + cartItems[key].season + `/designs/` + cartItems[key].type + 's/' + cartItems[key].name + `/` + cartItems[key].name + `-` + cartItems[key].color + `-small.png`)}
                            alt={cartItems[key].name + '-' + cartItems[key].color + '-photo'} />
                        </Link>
                      </div>


                      <div className="cartPreviewItemTextGrid">
                        <Link to={{
                          pathname: "/products/" + cartItems[key].type + '/' + cartItems[key].productCode + '/' + cartItems[key].color + '/' + cartItems[key]._id + "/",
                        }} >
                          <h2 style={{ fontSize: '1.2rem', textTransform: "uppercase" }}>
                            {
                              cartItems[key].name + ' ' + cartItems[key].type
                            }
                          </h2>
                        </Link>



                        <p style={{ margin: '0 auto', fontSize: '1.2rem' }}>
                          {
                            priceFormatting(cartItems[key].price.toFixed(2)) + '€'
                          }
                        </p>

                        <Link to={{
                          pathname: "/collections/" + cartItems[key].season + '/',
                        }}>
                          <h3 style={{ textTransform: "uppercase", fontWeight: "normal", fontSize: '1rem' }}>
                            {
                              cartItems[key].season + "'" + cartItems[key].productCode[4] + cartItems[key].productCode[5]
                            }

                          </h3>
                        </Link>

                        <div style={{ marginTop: '-0.75rem', cursor: 'pointer', textAlign: 'center' }}>
                          <span id='decrease-amount' onClick={() => (modifyCount(-1, key))} style={{ padding: '0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }}>
                            -
                          </span>

                          <span >
                            {
                              ' ' + cartItems[key].count + ' '
                            }
                          </span>
                          <span id='increase-amount' onClick={() => (modifyCount(1, key))} style={{ padding: '0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }} >
                            +
                    </span>

                        </div>

                        <p style={{ position: 'relative', top: '35%' }}>
                          {
                            cartItems[key].color + ' — ' + cartItems[key].size + ' '}
                        </p>


                      </div>
                    </li>
                  </div>
                </DropdownItem>
              )
            }
          </div>

          <div id="grid-for-total-cost">
            <p style={{ textAlign: "left" }}>TOTAL COST:</p>
            <p style={{ textAlign: "right", fontWeight: "550" }}>{sumStr} €</p>
          </div>

          {cartItems[0] !== undefined &&
            <p className="checkout-text" onClick={() => {
              console.log(cartItems)
            }}>CHECKOUT</p>
          }

        </ul>
      </div>
    );
  }

  const [openedThreeLines, setOTL] = useState(false);
  // handle clicks

  React.useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === 'Escape') {
        console.log('Escape pressed in useEffect')
        setOTL(false);
      }
    }

    const handleMouseClick = (event) => {
      console.log('clicked on soemthing' + event.target.id + openedThreeLines)
      // if the click wasnt on threelines or cart or purchase button
      if (event.target.id !== "three-lines-img" && event.target.id !== 'cart-img' && event.target.id !== 'buyBtn' && event.target.id !== 'decrease-amount' && event.target.id !== 'increase-amount') {
        console.log('id is' + event.target.id)
        setOTL(false);
        props.setOpenCartPreview(false);
      }

      if (window.innerWidth < 750 && window.innerHeight < 1300) {
        console.log('1')
        // if threelines were displayed on a mobile device and we clicked on the cart
        if (event.target.id === 'cart-img') {
          setOTL(false);
        }
        else if ( event.target.id === "three-lines-img")
          props.setOpenCartPreview(false)
      }

    }

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleMouseClick);
  }, []);


  const modifyCount = (amount, key) => {
    let datasTemp = [...props.datas];

    datasTemp[key].count += amount;

    // if the count of the item is 0, remove it from the array of the items in the cart.
    if (datasTemp[key].count === 0) {
      datasTemp.splice(key, 1);
    }
    props.setDatas(datasTemp);

    // if 0 items are present in the array after removing the last one
    localStorage.setItem('cartItems', JSON.stringify(datasTemp))
  }




  return (
    <nav>
      {/* left part of the navbar */}
      <div className="navbarChild">
        <div className="centeringParent">
          <LeftContainer />
        </div>
      </div>


      {/* mid part of the navbar */}
      <div className="navbarChild">
        <div className="centeringParent" id="navbarText">
          {/* when PLASTICFUTURE logo is pressed, go to top of the 'container' (for example when you are on the main page and want to go to the top by clicking it) */}
          <Link to="/" className="no-select-bg" onClick={() => {
            if (document.getElementsByClassName('container')[0] !== undefined)
              document.getElementsByClassName('container')[0].scrollTop = 0;
          }}>
            PLASTIC FUTURE
              </Link>
        </div>
      </div>


      {/* right part of the navbar */}
      <div className="navbarChild">
        <div className="centeringParent">
          <CartMenu fields={props} />
          <span className={"no-select-bg"} style={{ zIndex: "-1", position: 'absolute', left: '48%', top: '50%', fontSize: '1.5vh', borderRadius: '6px', padding: '0 0.25vh' }}>
            {(props.totalCount < 10) ? props.totalCount !== 0 && props.totalCount : '9+'}
          </span>
        </div>
      </div>
    </nav>


  );
}
