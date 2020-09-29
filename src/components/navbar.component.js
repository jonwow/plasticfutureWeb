import React, { useState, Component, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


// make this usable for footer. probably just change the inside of ThreeLines return
function useComponentVisible() {
  // true/false in useState parentheses = whether the dropdown menu is opened or close on page load
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
    console.log(ref);
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
  } = useComponentVisible();


  return (
    <div style={{ width: "5vh", margin: "0 auto" }} ref={ref}>
      {isComponentVisible && (
        <div onClick={() => setIsComponentVisible(false)}>
          <NavItem>
            <DropdownMenu />
          </NavItem>
        </div>
      )}
      {!isComponentVisible && (
        <div onClick={() => setIsComponentVisible(true)}>
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
  } = useComponentVisible(false);

  // if (fields.openCartPreview && !isComponentVisible) {
  //   setIsComponentVisible(fields.openCartPreview)
  //   console.log(123);
  // }
  const refx = useRef(null);



  //settimeout bugs here, check console.
  // if (isComponentVisible)
  //   setIsComponentVisible(fields.openCartPreview)
  const handleClickOutside = (event) => {
    if (refx.current && !refx.current.contains(event.target)) {
      console.log(refx.current + event.target)
    }
    if (event.target.tagname == "IMG")
      console.log(123);
    console.log(event.target);
  };
  
  document.addEventListener("click", handleClickOutside, true);



  return (
    <div style={{ width: "5vh", margin: "0 auto" }} ref={ref}>
      {isComponentVisible && (
        <div>
          <CartItem><DropdownCart fn={setIsComponentVisible} fields={fields}>

          </DropdownCart> </CartItem>
        </div>
      )}
      {!isComponentVisible && (
        <div onClick={() => setIsComponentVisible(true)}>
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
        <Link to="/products/" class="menu-item">
          <li className="asd">ALL PRODUCTS</li>
        </Link>
      </DropdownItem>


      <DropdownItem>
        <Link to="/products/t-shirt" class="menu-item">
          <li className="asd">TSHIRTS</li>
        </Link>
      </DropdownItem>

      <DropdownItem>
        <Link to="/products/tote" class="menu-item">
          <li>TOTE BAGS</li>
        </Link>
      </DropdownItem>

      {/* <DropdownItem>
        <Link to="/youraccount" class="menu-item">
          <li>YOUR ACCOUNT</li>
        </Link>
      </DropdownItem> */}

      <DropdownItem>
        <Link to="/collections" class="menu-item">
          <li>COLLECTIONS</li>
        </Link>
      </DropdownItem>

      <DropdownItem>
        <Link to="/contacts" class="menu-item">
          <li>CONTACTS</li>
        </Link>
      </DropdownItem>
    </ul>
  );
}


function DropdownCart({fn, fields}) {
  function DropdownItem(props) {
    return props.children;
  }
  let sum = 0;

  var datas = {...fields.datas};


  Object.keys(datas).map(key =>
    sum += datas[key].price * datas[key].count)

  return (
    <ul className="dropdown" id="cartDropdown" >
      <DropdownItem >

        {datas[0] == undefined ? <li style={{ textAlign: "center" }} >no products.</li> :

          Object.keys(datas).map(key =>
            <Link value={key} class="cart-item" to={{
              pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",

            }}>

              <li class="cartPreviewItem">
                <img onClick={()=>fn(false)} class="" src={require('../../src/images/' + datas[key].season + `/designs/` + datas[key].type + 's/' + datas[key].name + `/` + datas[key].name + `-` + datas[key].color + `-small.png`)} />

                <div class="cartPreviewItemTextGrid">
                  <p style={{ fontSize: '1.2rem' }}>
                    {
                      datas[key].name + ' ' + datas[key].type
                    }
                  </p>

                  <p style={{ margin: '0 auto', fontSize: '1.2rem' }}>
                    {
                      datas[key].price.toPrecision(4) + '€'
                    }
                  </p>

                  <p style={{ fontSize: '0.85rem' }}>
                    {
                      datas[key].season + "'" + datas[key].productCode[4] + datas[key].productCode[5]
                    }

                  </p>

                  <p onClick={() => ({...fields.modifyCount('DECREASE', key)})} id="countDiv" style={{ margin: '0 auto', fontSize: '1.1rem', zIndex: '3' }}>
                    {
                      '- ' + datas[key].count + ' +'
                    }
                  </p>

                  <p>
                    {
                      datas[key].color + ' — ' + datas[key].size + ' '}
                  </p>

                </div>

              </li>
            </Link>)

        }
      </DropdownItem>
      {datas[0] != undefined && <p style={{ background: 'whitesmoke', padding: '1rem', textAlign: 'right' }}>TOTAL COST: {sum}€
      </p>}
    </ul>
  );
}




export default class Navbar extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.datas)}
        <nav>
          <div className="navbarOne">
            <div className="centeringParent">
              <ThreeLines></ThreeLines>
            </div>
          </div>

          <div className="navbarTwo">
            <div className="centeringParent" id="navbarText">
              <Link to="/">PLASTIC FUTURE</Link>
            </div>
          </div>
          <div  className="navbarThree">
            <div className="centeringParent">
              <div>
                <CartPreview   fields={this.props} >

                </CartPreview>


                <span style={{ zIndex: "-1", position: 'absolute', left: '48%', top: '50%', fontSize: '1.5vh', borderRadius: '6px', padding: '0 0.25vh' }}>{this.props.totalCount < 10 ? this.props.totalCount : '9+'}</span>

              </div>
            </div>
          </div>
        </nav>
      </div>


    )
  }
}
