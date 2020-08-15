import React, { useState, Component, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'


// parent dropdown menu > children li items with this function
function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}



const Bzzz = () => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(true);
  return (
    <div ref={ref}>
      {isComponentVisible && (

        <span style={{ border: "1px solid black" }}>Going into Hiding</span>

      )}
      {!isComponentVisible && (
        <p onClick={() => setIsComponentVisible(true)}>
          Component hidden: Click me show component again
        </p>
      )}
    </div>
  );
};




export default class Navbar extends Component {
  render() {
    return (
      <div>
      <Bzzz></Bzzz>
      <nav>
        <div className="navbarOne">
          <div className="centeringParent">
            <NavItem>
              <DropdownMenu />
            </NavItem>
          </div>
        </div>

        <div className="navbarTwo">
          <div className="centeringParent" id="navbarText">
            <Link to="/">PLASTIC FUTURE
             </Link>

          </div>
        </div>
        <div className="navbarThree">
          <div className="centeringParent">
            <img src={`${process.env.PUBLIC_URL}/images/navbar/cart.png`} alt="cartPhoto" className="clickable"></img>
          </div>
        </div>
      </nav></div>
    );

  }
}





function NavItem(props) {
  // call the useState function (hook)
  // open = bool for current state.(whether the dropdown menu is open)
  // setOpen = function that 'sets state action'
  // false because the dropdown is not 'clicked' by default
  const [open, setOpen] = useState(false);
  return (
    <div>

      <img src={`${process.env.PUBLIC_URL}/images/navbar/threeLines.png`} className="icon-button clickable" onClick={() => {
        setOpen(!open)
      }} />

      {open && props.children}
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
      <DropdownItem >
        <Link to="/tshirts" class="menu-item">
          <li>TSHIRTS</li>
        </Link>
      </DropdownItem>

      <DropdownItem>
        <a class="menu-item" href="/toteBags">

          <li>TOTE BAGS</li>

        </a>
      </DropdownItem>

      <DropdownItem>
        <a class="menu-item" href="/yourAccount">
          <li>YOUR ACCOUNT</li>
        </a>
      </DropdownItem>

      <DropdownItem>
        <a class="menu-item" href="/collections/">
          <li>COLLECTIONS</li>
        </a>
      </DropdownItem>

      <DropdownItem>
        <a class="menu-item" href="/contacts">
          <li>CONTACTS</li>
        </a>
      </DropdownItem>

    </ul>
  );
}