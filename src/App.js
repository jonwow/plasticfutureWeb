import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Footer from "./components/footer.component";
import Navbarx from "./components/navbar.component";
import StickyFooter from "./components/stickyFooter.component";
import Head from "./components/head.component";
import ProductPage from "./components/product-page.component";
// components-route paths
import ProductList from "./components/product-list.component";

import ScrollToTop from "./scroll-to-top.js";
function App() {
  return (
    <Router>
      <ScrollToTop />

      <Head />
      {/* <Navbarx /> */}
      <Navbar>
        <NavItem icon="=">
          <DropdownMenu/>
        </NavItem>
      </Navbar>
      <div className="container">
        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id/:color/" exact component={ProductPage} />
        <Route path="/tshirts">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasd</Route>
        <Route path="/toteBags">bbbbbbbbbbbbbbbbbbbbbddaaaaaaaaaaaaabbbbbbbbbbbbbbbbbb</Route>
        <Route path="/yourAccount">zzzzzzzzzzzzcczzzzzzdddddddddddddaaaaaaaaaaaaaaaadddddddddzzzzzzzzzzzzzzzzzzzzzz</Route>
        <Route path="/collections">acccccccccccccccccccdddssssssddddddddddddddddcccccccccccccccc</Route>
        <Route path="/contacts">gsgsgsgsgsfdgergwrgdddddddddddddwrgwrtqweq</Route>
        
        
        <StickyFooter />
        <Footer />
      </div>
    </Router>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  // call the useState function (hook)
  // open = bool for current state.(whether the dropdown menu is open)
  // setOpen = function that 'sets state action'
  // false because the dropdown is not 'clicked' by default
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <p  className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </p>

      {open && props.children}
      
    </li>
  );
}

// need more dropdown levels? 11:40 https://www.youtube.com/watch?v=IF6k0uZuypA
function DropdownMenu() {
  function DropdownItem(props) {
    return <p className="menu-item" >{props.children}</p>;
  }

  return (
    // change to state rendering instead of a href asap
    <div className="dropdown">
      <DropdownItem>
        <a href="/tshirts">TSHIRTS</a>
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

    </div>
  );
}

export default App;
