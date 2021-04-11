import React from "react";
import { Link } from "react-router-dom";


export default () =>  {
    const list = ['NEWSLETTER', 'COLLECTIONS', 'CONTACTS'];
    
    return (
        < div className="stickyFooter" >
            <ul>
                {list.map(item => {
                    return <Link to={"/" + item.toLowerCase()} style={{ flexBasis: '33.333333%' }}>
                        <li className="clickable">
                            {item}
                        </li>
                    </Link>
                })}
            </ul>
        </div >
    );
}