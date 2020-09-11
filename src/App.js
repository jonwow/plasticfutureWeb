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


  const [exampleState, setExampleState] = useState(
    {
      product: {
        name: '',
        color: '',
        price: '',
        count: 0
      }
    })

  const handleSet = (productName, productColor, productPrice) => {
    setExampleState({
      ...exampleState, product: {
        name: productName,
        color: productColor,
        price: productPrice,
        count: exampleState.product.count + 1
      },
    },
      console.log(exampleState)
    )
  }
  return (
    <Router>
      <ScrollToTop />
      <Head />

      <Navbar handleSet={handleSet} exampleState={exampleState} />
      <div className="container">
        <Route
          path='/products/:productType/:productCode/:color/:id/'
          render={(props) => (
            <ProductPage handleSet={handleSet} {...props} />
          )}
        />
        <Route path="/" exact component={ProductList} />
        {/* demo for gh pages */}
        <Route exact path="/plasticfutureWeb/" exact component={ProductList} />
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
