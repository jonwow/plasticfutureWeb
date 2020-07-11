import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Footer from './components/footer.component';
import Navbar from './components/navbar.component';
import StickyFooter from './components/stickyFooter.component';
import Head from './components/head.component';

// components-route paths
import ProductPage from "./components/product-page.component";
import ProductList from "./components/product-list.component";

// full mongodb documentation especially about performance
// prices ir primecosts masyvai, nes skirtingu spalvu shirts skirtingos kainos
// uzsirasyt, kas implementuota sitam saite: react, react router, expres,nodejs,mongodb,mongoose,
function App() {
  return (
    <Router>
      <Head />

      <Navbar />
      <div class="container">
        {/* make a container for main content + footer in it and put a scrollbar there instead of a full page one  */}

        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id/:color/" exact component={ProductPage} />
        <StickyFooter />
        <Footer />
      </div>
    </Router>
  );
}
export default App;

