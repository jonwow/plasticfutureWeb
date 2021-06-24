import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    // max links in the breadcrumbs excluding the MAIN/ link
    const MAX_LINKS = 3, location = useLocation(),
        separatedURLStrings = location.pathname.split('/').filter(el => el); 

        console.log(separatedURLStrings)    
        
        console.log(separatedURLStrings)


    return (
        <nav id="breadcrumbs" >
            <Link to='/'>MAIN</Link>

            {separatedURLStrings.map((link, index) => {
                    // index starts from 0 therefore + 1 
                    if (index + 1 > MAX_LINKS)
                        return


                    const path = index === 1 ? `/${link}` : 
                            location.pathname.split(separatedURLStrings[index - 1])[0] + link;
                    // make the last link bold
                    const isBold = index === MAX_LINKS || index === separatedURLStrings.length;

                    return <span key={index}>
                        <span>/</span>

                        <Link to={path} className={isBold ? 'bold-text' : 'normal-weight'}>
                            {link}
                        </Link>
                    </span>
                })}
        </nav>
    );
}

export default Breadcrumbs;