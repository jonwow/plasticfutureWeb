import { Switch, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

// components

import ProductPage from "./ProductPage";
import ProductList from "./ProductList";

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
            <Route path="/yourAccount">yourAccount page will be available soon!</Route>
            <Route path="/newsletter">newsletter page will be available soon!</Route>

            <Route path="/collections">
                collections
            </Route>

            <Route path="/collections/:collectionName">
                collections
                </Route>

            <Route path="/contacts">
                contacts
            </Route>

            <Route path="/tac">T&C page will be available soon!</Route>

            {/* non route pages / 404 */}
            <Route path="*">
                <div style={{ height: 'inherit' }}>
                    <h1 style={{ marginTop: '10%', fontSize: '6rem', fontWeight: 'lighter', fontFamily: 'Roboto', textAlign: 'center', margin: '0 auto', width: '95%' }}>
                        "This page doesn't exist."
                    </h1>
                </div>
            </Route>
        </Switch>
    )

}

export default Routes;