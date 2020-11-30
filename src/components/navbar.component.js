import React, { useState, Component, useRef } from "react";
import { Link } from "react-router-dom";

// https://stackoverflow.com/questions/61730769/handlekeypress-method-is-called-multiple-times-in-react
// https://www.geeksforgeeks.org/javascript-removeeventlistener-method-with-examples/
// https://jsfiddle.net/2jbLdo9n/
// https://stackoverflow.com/questions/59505296/why-are-my-events-getting-called-so-many-times-react-electron




// make this usable for footer. probably just change the inside of ThreeLines return
function useComponentVisible(xd) {
  // true/false in useState parentheses = whether the dropdown menu is opened or close on page load
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    console.log('handlehidedropdown');
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {

    console.log('handleclickoutside');

    if (ref.current && !ref.current.contains(event.target) && event.target.parentNode.classList[0] !== 'productSizing') {
      console.log(event.target.parentNode);
      console.log(ref.current);
      setIsComponentVisible(false);
    }
  };

  document.addEventListener("keydown", handleHideDropdown, true);
  document.addEventListener("click", handleClickOutside, true);

  return { ref, isComponentVisible, setIsComponentVisible };
}

const ThreeLines = () => {
  const {
    // gives this const the ref from the useComponentVisible function
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible('threelines');


  return (
    <div style={{ width: "5vh", margin: "0 auto" }} ref={ref}>
      {isComponentVisible && (
        <div onClick={() => { setIsComponentVisible(false); console.log("closing threeLines") }}>
          <NavItem>
            <DropdownMenu />
          </NavItem>
        </div>
      )}
      {!isComponentVisible && (
        <div onClick={() => { setIsComponentVisible(true); console.log("opening threeLines ") }}>
          <NavItem></NavItem>
        </div>
      )}
    </div>
  );
};




const CartPreview = ({ fields }) => {
  const {
    // gives this const the ref from the useComponentVisible function
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible('cart');

  // timeouts array is mainly used in the 'cart preview' function to prevent multiple 'purchase button' clicks from lagging the site and bugging the timeouts. (it gets cleared on every call of CartPreview component from its 'if' block)
  var timeouts = [];

  // NEEDS DOCUMENTATION! clicking the buy button too much bugs the program
  if (fields.openCartPreview && isComponentVisible !== true) {
    setIsComponentVisible(true)
    console.log('in the if block');
    for (var i = 0; i < timeouts.length; i++) {
      console.log(timeouts[i]);
      clearTimeout(timeouts[i]);
      console.log(timeouts[i]);
      // perhaps remove the items from the array too?
    }

    // throws an error when you first click the purchase button.
    fields.setOpenCartPreview(false);
    timeouts.push(setTimeout(() => {
      setIsComponentVisible(false);
    }, 5000));
  }



  const handleClick = (e) => {
    e.preventDefault();

    // close cart dropdown if you press on a product (image)
    if (e.target.tagName === "IMG" || e.target.tagName === "H2" || e.target.tagName === "H3")
      setIsComponentVisible(false)

    console.log(e);
  }

  return (
    <div style={{ width: "5vh", margin: "0 auto" }} ref={ref} >
      {isComponentVisible && (
        <div onClick={handleClick}>
          <CartItem>
            <DropdownCart fn={setIsComponentVisible} fields={fields}>
            </DropdownCart>
          </CartItem>
        </div>
      )}
      {!isComponentVisible && (
        <div onClick={() => { setIsComponentVisible(true); console.log("opening cart") }}>
          <CartItem></CartItem>
        </div>
      )}
    </div>

  );
};




function NavItem(props) {
  // call the useState function (hook)
  // open = whether the dropdown menu is open
  // setOpen = function that 'sets state action'
  // false because the dropdown is not 'clicked' by default
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: "5vh", margin: "0 auto" }}>
      <img
        src={require('../../src/images/navbar/threeLines.png')}
        className="icon-button clickable"
        alt="threeLines-logo"
        onClick={() => {
          setOpen(!open);
        }}
      />

      {props.children}
    </div>
  );
}

function CartItem(props) {
  return (
    <div style={{ width: "5vh", margin: "0 auto" }}>
      <img
        src={require('../../src/images/navbar/cart.png')}
        className="icon-button clickable"
        alt="cart-logo"
      />

      {props.children}
    </div>
  );
}
// need more dropdown levels? 11:40 https://www.youtube.com/watch?v=IF6k0uZuypA
function DropdownMenu() {
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


function DropdownCart({ fn, fields }) {
  function DropdownItem(props) {
    return props.children;
  }
  let sum = 0;

  var datas = { ...fields.datas };
  Object.keys(datas).map(key =>
    sum += datas[key].price * datas[key].count
  )

  return (
    <div>
      <ul className="dropdown" id="cartDropdown" >
        <div className="dropdownChild">
          {datas[0] === undefined ? <li style={{ textAlign: "center" }} >no products.</li> :

            Object.keys(datas).map(key =>
              <DropdownItem key={key} >

{/* 10rem+2*2rem(padding) *3 */}
                <div value={key} className="cart-item" style={{ height: "10rem", display: "block", padding: '2rem 0', background: 'whitesmoke' }}>
                  <li className="cartPreviewItem">
                    <Link to={{
                      pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",
                    }}>
                      <img onClick={() => fn(false)}
                        className=""

                        src={require('../../src/images/' + datas[key].season + `/designs/` + datas[key].type + 's/' + datas[key].name + `/` + datas[key].name + `-` + datas[key].color + `-small.png`)}
                        alt={datas[key].name + '-' + datas[key].color + '-photo'} /></Link>
                    <div className="cartPreviewItemTextGrid">
                      <Link to={{
                        pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",
                      }}>
                        <h2 style={{ fontSize: '1.2rem', textTransform: "uppercase" }}>
                          {
                            datas[key].name + ' ' + datas[key].type
                          }
                        </h2>
                      </Link>

                      <p style={{ margin: '0 auto', fontSize: '1.2rem' }}>
                        {
                          datas[key].price.toPrecision(4) + '€'
                        }
                      </p>

                      <Link to={{
                      pathname: "/collections/" + datas[key].season + '/' ,
                    }}>
                      <h3 style={{textTransform:"uppercase", fontWeight:"normal", fontSize: '1rem' }}>
                        {
                          datas[key].season + "'" + datas[key].productCode[4] + datas[key].productCode[5]
                        }

                      </h3>
                      </Link>
                      <div style={{ marginTop: '-0.5rem',cursor: 'pointer',textAlign: 'center' }}>
                        <span onClick={() => ({ ...fields.modifyCount('DECREASE', 1, key) })} style={{ padding:'0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }}>
                          -
                    </span>
                    <span >

                    {
                          ' ' + datas[key].count + ' '
                        }

                    </span>
                        <span onClick={() => ({ ...fields.modifyCount('INCREASE', 1, key) })} style={{padding:'0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }} >
                          +
                    </span>

                      </div>

                      <p style={{position: 'relative', top: '35%'}}>
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
            {sum > 0 ? sum.toFixed(2) : sum}
          €
      </p>
        </div>

        {datas[0] !== undefined  &&
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




export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="navbarOne">
            <div className="centeringParent">
              <ThreeLines></ThreeLines>
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
                <CartPreview fields={this.props} >
                </CartPreview>


                <span className={"no-select-bg"} style={{ zIndex: "-1", position: 'absolute', left: '48%', top: '50%', fontSize: '1.5vh', borderRadius: '6px', padding: '0 0.25vh' }}>
                  {this.props.totalCount < 10 ? this.props.totalCount : '9+'}

                </span>

              </div>
            </div>
          </div>
        </nav>
      </div>


    )
  }
}
