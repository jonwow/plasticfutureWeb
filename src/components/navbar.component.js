import React, { useState, Component } from "react";
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
  render() {
    return (
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
      </nav>
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

      <img src={`${process.env.PUBLIC_URL}/images/navbar/threeLines.png`} className="icon-button clickable" onClick={() => setOpen(!open)}/> 
      
      {open && props.children}
      </div>
      
  );
}


// need more dropdown levels? 11:40 https://www.youtube.com/watch?v=IF6k0uZuypA
function DropdownMenu() {
  function DropdownItem(props) {
    return <li className="menu-item" >{props.children}</li>;
    
  }


  return (
    // change to state rendering instead of a href asap
    <ul className="dropdown">
      <DropdownItem >
      <a href="/tshirts"> TSHIRTS</a>
      </DropdownItem>

      <DropdownItem>
        <a href="/toteBags">TOTE BAGS</a>
      </DropdownItem>

      <DropdownItem>
        <a href="/yourAccount">YOUR ACCOUNT</a>
      </DropdownItem>

      <DropdownItem>
        <a href="/collections/">COLLECTIONS</a>
      </DropdownItem>

      <DropdownItem>
        <a href="/contacts">CONTACTS</a>
      </DropdownItem>

    </ul>
  );
}