import React from "react";
import { Link, useLocation } from "react-router-dom";

// any amount of words is possible in the breadcrumbs.
const Breadcrumbs = () => {
    console.log('Rendering breadcrumbs')
    // amount of links in the breadcrumbs
    const MAX_LINKS = 3,
        location = useLocation();

    let stringsInPathname = [];

    // populate the array of strings that are in the pathname
    for (let i = location.pathname.split('/').length - 1; i > 0; i--)
        stringsInPathname[i - 1] = location.pathname.split('/')[i];


    // remove falsy strings (in this case they are typically empty strings)
    stringsInPathname = stringsInPathname.filter(el => el);


    return (
        <ul id="bcnl-container" >
            <div id="breadcrumbs-links">
                <Link to='/'>MAIN</Link>

                {stringsInPathname.map(link => {
                    const index = stringsInPathname.indexOf(link) + 1;

                    if (index < MAX_LINKS) {
                        const path = index === 1 ? `/${link}` : location.pathname.split(stringsInPathname[index - 1])[0] + link,
                            isBold = index + 1 === MAX_LINKS || index === stringsInPathname.length;

                        return <span key={index}>
                            <span>/</span>

                            <Link to={path} className={isBold ? 'bold-text' : 'normal-text'}>
                                {link}
                            </Link>
                        </span>
                    }
                })}
            </div>
        </ul>
    );
}

export default Breadcrumbs;