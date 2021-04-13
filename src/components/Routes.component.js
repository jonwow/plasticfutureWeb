import { BrowserRouter, Route, } from "react-router-dom";
import React from "react";

// components
import Breadcrumbs from './Breadcrumbs.component';
import FirstVisit from './FirstVisit.component';
import Footer from "./Footer.component";
import Navbar from "./Navbar.component";
import StickyFooter from "./StickyFooter.component";
import ProductPage from "./ProductPage.component";
import ProductList from "./ProductList.component";
import ScrollToTop from "../scrollToTop";

export default (props) => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            {/* for people with extraordinary screens */}
            {window.innerWidth <= 240 && window.innerHeight <= 320 && window.location.replace("https://genius.com/Playboi-carti-broke-boi-lyrics")}

            {localStorage.getItem("firstVisit") !== "false" ?
                <FirstVisit />
                :
                <div>
                    <ScrollToTop />
                    <Navbar cartPreviewTimeout={props.cartPreviewTimeout} setDatas={props.setDatas} setOpenCartPreview={props.setOpenCartPreview} openCartPreview={props.openCartPreview} datas={props.datas} totalCount={props.totalCount} />
                    <Breadcrumbs />


                    <div className="container" id="top">
                        {/* <Route exact path='/products/:productType/:productCode/:color/:id/'>
                            <ProductPage datas={props.datas} setDatas={props.setDatas} setOpenCartPreview={props.setOpenCartPreview} />
                        </Route> */}


                        {/* {...props} contains every props passed to Routes */}
                        <Route exact path='/products/:productType/:productCode/:color/:id/'
                            location={props.location}
                            render={({
                                location,
                                match
                            }) => (<ProductPage  {...props} match={match} location={location} />)
                            } />



                        <Route path='/' exact component={ProductList} />

                        <Route path="/products" exact component={ProductList} />
                        {/* <Route path="/products/:productType/:productCode/:color/:id/" exact component={ProductPage} /> */}
                        <Route exact path="/products/:collection/:productType" component={ProductList} />
                        <Route exact path='/products/:productType/' component={ProductList} />
                        <Route path="/yourAccount">              yourAccount        </Route>
                        <Route path="/collections">              collections:        </Route>
                        <Route path="/collections/:collectionName">              page of a certain collection, soon to be implemented!        </Route>
                        <Route path="/contacts">              contacts        </Route>
                        <StickyFooter />
                        <Footer />
                    </div>
                </div>
            }
        </BrowserRouter>
    )

}