import React, { useState } from "react";
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
function App() {
  return (
    <Router>
      <ScrollToTop />

      <Head />

      <Navbar />
      <div className="container">
        <Route path="/" exact component={ProductList}/>
        <Route path="/products" exact component={ProductList} />
        <Route path="/products/:id/:color/" exact component={ProductPage} />
        <Route path="/products/:productType" exact component={ProductList} />

        <Route path="/toteBags">
          bbbbbbbbbbbbbbbbbbbbbddaaaaaaaaaaaaabbbbbbbbbbbbbbbbbb
        </Route>
        <Route path="/yourAccount">
          zzzzzzzzzzzzcczzzzzzdddddddddddddaaaaaaaaaaaaaaaadddddddddzzzzzzzzzzzzzzzzzzzzzz
        </Route>
        <Route path="/collections">
          acccccccccccccccccccdddssssssddddddddddddddddcccccccccccccccc
        </Route>
        <Route path="/contacts">
          gsgsgsgsgsfdgergwrgdddddddddddddwrgwrtqweq
        </Route>

        <StickyFooter />
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
