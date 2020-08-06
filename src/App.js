import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Footer from './components/footer.component';
import Navbar from './components/navbar.component';
import StickyFooter from './components/stickyFooter.component';
import Head from './components/head.component';
import ProductPage from './components/product-page.component'
// components-route paths
import ProductList from "./components/product-list.component";

function App() {
  return (
    <Router>
      <Head />
      <Navbar />
      <div class="container">
        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id/:color/"  exact component={ProductPage} />
        {/* <Route path="/products/:id/:color/"
          render={(props) => (
            <ProductPage {...props} isAuthed={true} />)}
        /> */}
        <StickyFooter />
        <Footer />
      </div>
    </Router>
  );
}
export default App;

