import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = (props) => {
  // LEFT PART OF THE NAVBAR
  // renders the threelines image or the dropdown if its clicked.
  const Menu = () => {
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


  // need more dropdown levels? 11:40 https://www.youtube.com/watch?v=IF6k0uZuypA
  const DropdownMenu = () => {
    function DropdownItem(props) {
      return props.children;
    }

    return (
      // change to state rendering instead of a href asap
      <ul className="dropdown" >
        <DropdownItem>
          <Link to="/products/" className="menu-item">
            <li className="asd">ALL PRODUCTS</li>
          </Link>
        </DropdownItem>


        <DropdownItem>
          <Link to="/products/t-shirt" className="menu-item">
            <li className="asd">TSHIRTS</li>
          </Link>
        </DropdownItem>

        <DropdownItem>
          <Link to="/products/tote" className="menu-item">
            <li>TOTE BAGS</li>
          </Link>
        </DropdownItem>

        {/* <DropdownItem>
        <Link to="/youraccount" className="menu-item">
          <li>YOUR ACCOUNT</li>
        </Link>
      </DropdownItem> */}

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
  // END OF LEFT PART OF THE NAVBAR
  ///////////////////////////////////////////////////////////////////////////////////////////





  // RIGHT PART OF THE NAVBAR
  // renders the cart image or the dropdown if its clicked.
  const CartMenu = ({ fields }) => {
    // only fires off when clicking on an opened cart's icon
    const handleClick = (e) => {

      if (e.target.id === 'cart-img')
        setOC(false);

      // // close cart dropdown if you press on a product (image)
      // if (e.target.tagName === "IMG" || e.target.tagName === "H2" || e.target.tagName === "H3")
      // {
      //   setOC()
      // }

    }


    return (
      <div style={{ width: "5vh", margin: "0 auto" }}  >
        {openedCart && (
          <div onClick={handleClick}>
            <Cart >
              <DropdownCart fn={setOC} fields={fields}>
              </DropdownCart>
            </Cart>
          </div>
        )}
        {!openedCart &&
          <div onClick={() => { setOC(true) }}>
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
    function DropdownItem(props) {
      return props.children;
    }
    let sum = 0;

    var datas = { ...fields.datas };
    Object.keys(datas).map(key =>
      sum += datas[key].price * datas[key].count
    )

    let sumStr = fields.priceFormatting(sum);


    return (
      <div>
        <ul className="dropdown" id="cartDropdown" >
          <div className="dropdownChild">
            {datas[0] === undefined ? <li style={{ textAlign: "center", padding: '2rem 0' }} >no products.</li> :

              Object.keys(datas).map(key =>
                <DropdownItem key={key} >

                  {/* 10rem+2*2rem(padding) *3 */}
                  <div value={key} className="cart-item" style={{ height: "10rem", display: "block", padding: '2rem 0', background: 'whitesmoke' }}>
                    <li className="cartPreviewItem">
                      <div style={{ margin: '0 auto' }}>
                        <Link to={{
                          pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",
                        }} >
                          <img
                            className=""

                            src={require('../../src/images/' + datas[key].season + `/designs/` + datas[key].type + 's/' + datas[key].name + `/` + datas[key].name + `-` + datas[key].color + `-small.png`)}
                            alt={datas[key].name + '-' + datas[key].color + '-photo'} /></Link>
                      </div>
                      <div className="cartPreviewItemTextGrid">
                        <Link to={{
                          pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",
                        }} >
                          <h2 style={{ fontSize: '1.2rem', textTransform: "uppercase" }}>
                            {
                              datas[key].name + ' ' + datas[key].type
                            }
                          </h2>
                        </Link>

                        <p style={{ margin: '0 auto', fontSize: '1.2rem' }}>
                          {
                            fields.priceFormatting(datas[key].price.toFixed(2)) + '€'
                          }
                        </p>

                        <Link to={{
                          pathname: "/collections/" + datas[key].season + '/',
                        }}>
                          <h3 style={{ textTransform: "uppercase", fontWeight: "normal", fontSize: '1rem' }}>
                            {
                              datas[key].season + "'" + datas[key].productCode[4] + datas[key].productCode[5]
                            }

                          </h3>
                        </Link>
                        <div style={{ marginTop: '-0.75rem', cursor: 'pointer', textAlign: 'center' }}>
                          <span id='decrease-amount' onClick={() => ({ ...fields.modifyCount('DECREASE', 1, key) })} style={{ padding: '0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }}>
                            -
                    </span>
                          <span >

                            {
                              ' ' + datas[key].count + ' '
                            }

                          </span>
                          <span id='increase-amount' onClick={() => ({ ...fields.modifyCount('INCREASE', 1, key) })} style={{ padding: '0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }} >
                            +
                    </span>

                        </div>

                        <p style={{ position: 'relative', top: '35%' }}>
                          {
                            datas[key].color + ' — ' + datas[key].size + ' '}
                        </p>


                      </div>

                    </li>
                  </div>
                </DropdownItem>
              )

            }
          </div>

          <div id="grid-for-total-cost">
            <p style={{ textAlign: "left" }}>
              TOTAL COST:
      </p>
            <p style={{ textAlign: "right", fontWeight: "550" }}>
              {sum > 0 ?
                sumStr
                : sum}
          €
      </p>
          </div>

          {datas[0] !== undefined &&
            <p class="checkout-text">
              CHECKOUT
  </p>
          }
        </ul>
        {/* {datas[0] != undefined && */}

        {/* } */}
      </div>
    );
  }
  // END OF LEFT PART OF THE NAVBAR
  ///////////////////////////////////////////////////////////////////////////////////////////






  // HIDE-SHOW DROPDOWNS
  const [openedThreeLines, setOTL] = useState(false);
  const [openedCart, setOC] = useState(false);



  // after clicking the purchase button
  React.useEffect(() => {
    if (props.openCartPreview) {
      setOC(true);

      setTimeout(() => {
        props.setOpenCartPreview(false);
        setOC(false)

      }, 4000);
    }
  }, [props.openCartPreview]);





  React.useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === 'Escape') {
        console.log('Escape pressed in useEffect')
        setOTL(false);
      }
    }

    const handleMouseClick = (event) => {
      // if the click wasnt on threelines or cart or purchase button
      if (event.target.id !== "three-lines-img" && event.target.id !== 'cart-img' && event.target.id !== 'buyBtn' && event.target.id !== 'decrease-amount' && event.target.id !== 'increase-amount') {
        console.log('id is' + event.target.id)
        setOTL(false);
        setOC(false);
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleMouseClick);
  }, []); // end of React.useEffect()
  // END OF HIDE-SHOW DROPDOWNS
  ///////////////////////////////////////////////////////////////////////////////////////////


  return (
    <div>
      <nav>
        <div className="navbarOne">
          <div className="centeringParent">
            <Menu></Menu>
          </div>
        </div>

        <div className="navbarTwo">
          <div className="centeringParent" id="navbarText">
            {/* when PLASTICFUTURE logo is pressed, go to top of the 'container' */}
            <Link to="/" className="no-select-bg" onClick={() => {
              if (document.getElementsByClassName('container')[0] !== undefined)
                document.getElementsByClassName('container')[0].scrollTop = 0;
            }}>
              PLASTIC FUTURE
              </Link>
          </div>
        </div>
        <div className="navbarThree">
          <div className="centeringParent">
            <div>
              <CartMenu fields={props} >
              </CartMenu>


              <span className={"no-select-bg"} style={{ zIndex: "-1", position: 'absolute', left: '48%', top: '50%', fontSize: '1.5vh', borderRadius: '6px', padding: '0 0.25vh' }}>
                {
                  props.cartLoaded ? props.totalCount < 10 ? props.totalCount : '9+' : ''}

              </span>

            </div>
          </div>
        </div>
      </nav>
    </div>


  );
}

export default Navbar;