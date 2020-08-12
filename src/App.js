import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Footer from './components/footer.component';
import Navbarx from './components/navbar.component';
import StickyFooter from './components/stickyFooter.component';
import Head from './components/head.component';
import ProductPage from './components/product-page.component'
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
      <div class="container">
        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id/:color/" exact component={ProductPage} />

        <StickyFooter />
        <Footer />
      </div>

    </Router>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
      {props.children}
      </ul>
    </nav>
  );
}




function NavItem(props )
{
  // call the useState function (hook)
  // open = bool for current state.(whether the dropdown menu is open)
  // setOpen = function that 'sets state action'
   // false because the dropdown is not 'clicked' by default 
  const[open,setOpen] = useState(false);
  


  return ( 
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}        
      </a>
       

       {
         open && props.children
       }
    </li>
  );
}

function DropdownMenu()
{

  function DropdownItem(props)
  {
    return (
      <a href="#" className="menu-item">
        {props.children}
      </a>
    );
  }



  return (
    <div className="dropdown">
        <DropdownItem>My Profile</DropdownItem>

    </div>
  );

}


export default App;

