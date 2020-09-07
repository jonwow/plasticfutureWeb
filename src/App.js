import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import StickyFooter from "./components/stickyFooter.component";
import Head from "./components/head.component";
import ProductPage from "./components/product-page.component";

// components-route paths
import ProductList from "./components/product-list.component";
import ScrollToTop from "./scroll-to-top.js";



// const SearchableList = ({  }) => {
//   const [query, setQuery] = React.useState('');
//   const handleQuery = event => {
//     setQuery(event.target.value);
//   };


//   return (
//     <div>
//       <Search query={query} handleQuery={handleQuery}>
// parent query is {query}      </Search>
//       <List query={query}/>
//     </div>
//   );
// };

const SearchableList = ({ }) => {
  const [list, setQuery] = React.useState(0);
  const [prodCode, setProdCode] = React.useState([])
  var oldCode = prodCode;
  const handleQuery = (event) => {
    setQuery(list+1)
  };
  const handleProdCode = (xd) => {
    setProdCode(oldCode)
    console.log(prodCode);
  };

  return (
    <Router>
      <ScrollToTop />
      <Head />

        <Navbar list={list} prodCode={prodCode}/>
{list}
      <div className="container">
        <Route
          path='/products/:productType/:productCode/:color/:id/'
          render={(props) => (
            <ProductPage {...props} list={list} handleProdCode={handleProdCode} handleQuery={handleQuery} />
          )}
        />
        <Route path="/" exact component={ProductList} />
        {/* demo for gh pages */}
        <Route exact path="/plasticfutureWeb" exact component={ProductList} />
        <Route path="/products" exact component={ProductList} />
        {/* <Route path="/products/:productType/:productCode/:color/:id/" exact component={ProductPage} /> */}
        <Route exact path="/products/:collection/:productType" exact component={ProductList} />
        <Route
          exact path='/products/:productType/'
          render={(props) => (
            <ProductList {...props} isAuthed={1} />
          )}
        />

        <Route path="/yourAccount">
          yourAccount
        </Route>
        <Route path="/collections">
          collections:
        </Route>
        <Route path="/collections/:collectionName">
          page of a certain collection, soon to be implemented!
        </Route>
        <Route path="/contacts">
          contacts
        </Route>

        <StickyFooter />
        <Footer />

      </div>
    </Router>
  );
}

export default SearchableList;
