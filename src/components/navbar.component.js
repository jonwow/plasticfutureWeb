import React, { useState, Component, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


// make this usable for footer. probably just change the inside of bzzz return
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

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);

  return { ref, isComponentVisible, setIsComponentVisible };
}

const Bzzz = () => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
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

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="navbarOne">
            <div className="centeringParent">
              <Bzzz></Bzzz>
            </div>
          </div>

          <div className="navbarTwo">
            <div className="centeringParent" id="navbarText">
              <Link to="/">PLASTIC FUTURE</Link>
            </div>
          </div>
          <div className="navbarThree">
            <div className="centeringParent">
              <img
                src={`${process.env.PUBLIC_URL}/images/navbar/cart.png`}
                alt="cartPhoto"
                className="clickable"
              ></img>
            </div>
          </div>
        </nav>
      </div>
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
    <div style={{ width: "5vh", margin: "0 auto" }}>
      <img
        src={`${process.env.PUBLIC_URL}/images/navbar/threeLines.png`}
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
        <Link to="/products/tshirts" class="menu-item">
          <li className="asd">TSHIRTS</li>
        </Link>
      </DropdownItem>

      <DropdownItem>
        <Link to="/totebags" class="menu-item">
          <li>TOTE BAGS</li>
        </Link>
      </DropdownItem>

      <DropdownItem>
        <Link to="/youraccount" class="menu-item">
          <li>YOUR ACCOUNT</li>
        </Link>
      </DropdownItem>

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
