import React, { useState, Component, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


// make this usable for footer. probably just change the inside of ThreeLines return
function useComponentVisible() {
  // true/false in useState parentheses = whether the dropdown menu is opened or close on page load
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
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


const CartPreview = () => {
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
          <CartItem><DropdownCart></DropdownCart></CartItem>
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
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: "5vh", margin: "0 auto" }}>
      <img
        src={require('../../src/images/navbar/cart.png')}
        className="icon-button clickable"
        onClick={() => {
          setOpen(!open);
        }}
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
    <ul className="dropdown">
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


function DropdownCart() {
  function DropdownItem(props) {
    return props.children;
  }

  return (
    // change to state rendering instead of a href asap
    <ul className="dropdown">
      
      <DropdownItem>
        <Link to="/products/t-shirt" class="menu-item">
          <li>TSHIRTS</li>
        </Link>
      </DropdownItem>


    </ul>
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
              <Link to="/">PLASTIC FUTURE</Link>
            </div>
          </div>
          <div className="navbarThree">
            <div className="centeringParent">
            {this.props.exampleState.product.count > 0 ?
    <div>

      {this.props.exampleState.product.name}-
  {this.props.exampleState.product.color}-
  {this.props.exampleState.product.price}€-
  {this.props.exampleState.product.count} units
  </div>
  :
  <CartPreview></CartPreview>
  }
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

