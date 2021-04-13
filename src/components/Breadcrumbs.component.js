import React from "react";
import {  Link, useLocation } from "react-router-dom";

export default (props) => {
    var location = useLocation();
    var modifiedPathname = [];

    // if breadcrumbs are longer than MAIN/*PAGE*
    // example: MAIN/*PAGE*/*CRITERIA*
    // 0th element is nonexistent because the string starts with /
    for (let i = location.pathname.split("/").length - 1; i > 0; i--)
        modifiedPathname[i - 1] = (location.pathname.split("/")[i]);

    // remove empty strings.
    modifiedPathname = modifiedPathname.filter(el => el !== "" && el !== "undefined" && el !== undefined && el !== "null" && el !== null);


    return (
        <ul style={{ background: "transparent" }} id="bcnl-container">
            <div id="breadcrumbs-links">
                <Link to={"/"} style={{ paddingLeft: '1rem', transition: '0.55s', cursor: 'pointer', fontFamily: 'Roboto', color: ' rgba(0, 0, 0, 0.7501)' }}>
                    MAIN
                </Link>

                {/* length is > 0 when at least one item is present. the item starts at index 0, therefore modifiedPathname[0] is required */}
                {modifiedPathname.length > 0 &&
                    <>
                        <span style={{ color: 'rgba(0, 0, 0, 0.7501)' }}>/</span>
                        <Link to={"/"  + modifiedPathname[0]} style={{ transition: '0.55s', cursor: 'pointer', fontFamily: 'Roboto', color: ' rgba(0, 0, 0, 0.7501)', textTransform: 'uppercase' }}>
                            <h1>
                                {modifiedPathname[0]}
                            </h1>
                        </Link>
                    </>
                }


                {modifiedPathname.length > 1 && modifiedPathname[1] !== "null" && modifiedPathname[1] !== "undefined" &&
                    <>
                        <span style={{ color: 'rgba(0, 0, 0, 0.7501)' }}>/</span>
                        <Link to={location.pathname.split(modifiedPathname[1])[0] + modifiedPathname[1]} style={{ transition: '0.55s', cursor: 'pointer', fontFamily: 'Roboto', color: 'rgba(0, 0, 0, 0.7501)', textTransform: 'uppercase' }}>
                            <h2 style={{ fontWeight: 'bold' }}>
                                {modifiedPathname[1]}
                            </h2>
                        </Link>
                    </>
                }
            </div>
        </ul >
    );
}