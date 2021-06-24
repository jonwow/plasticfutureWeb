import { Switch, Link, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

// components

import ProductPage from "./ProductPage";
import ProductList from "./ProductList";
import Contacts from "./Contacts";

const Routes = (props) => {
    const location = useLocation();

    useEffect(() => {
        const el = document.getElementsByClassName("container");

        window.scrollTo(0, 0);
        el[0].scrollTop = 0;
        el[0].scrollLeft = 0;
    }, [location]);


    return (
        <Switch>
            {/* {...props} contains every props passed to Routes */}
            <Route exact path='/products/:productType/:productCode/:color/:id/'
                location={props.location}
                render={({
                    location,
                    match
                }) => (<ProductPage setOpenCartDropdown={props.setOpenCartDropdown} cartPreviewTimeout={props.cartPreviewTimeout} setDatas={props.setDatas} datas={props.datas} match={match} location={location} />)
                } />



            <Route path='/' exact component={ProductList} />

            <Route path="/products" exact component={ProductList} />
            <Route exact path="/products/:collection/:productType" component={ProductList} />
            <Route exact path='/products/:productType/' component={ProductList} />


            <Route path="/newsletter">
                <div className="under-construction-container">
                    <p>This will be a page for the <strong>newsletter</strong>.</p>
                </div>
            </Route>


            <Route exact path="/collections">
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>      <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>          <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>
                <p>This will be a page for the <strong>collections</strong>.</p>

            </Route>

            <Route exact path="/collections/:collectionName">
                <div className="under-construction-container">
                    <p>This will be a page for <strong>a collection</strong>.</p>
                </div>
            </Route>

            <Route path="/contacts">
                <Contacts />
            </Route>

            <Route exact path="/tac">
                <div className="under-construction-container">
                    <p>This will be a page for the <strong>terms and conditions</strong>.</p>
                </div>
            </Route>

            {/* non route pages / 404 */}
            <Route path="*">
                <div className="under-construction-container">
                    <p>This page doesn't exist. </p>
                    <p>
                        <strong><Link to="/">Go to the main page.</Link></strong>
                    </p>
                </div>
            </Route>
        </Switch>
    )

}

export default Routes;