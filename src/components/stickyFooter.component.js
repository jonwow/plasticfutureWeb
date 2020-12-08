import React, {Component} from "react";
import { Link } from "react-router-dom";


export default class StickyFooter extends Component {
    render() {
        return (
            < div className="stickyFooter" >
                <ul>
                    <Link to="/newsletter" style={{flexBasis: '33.333333%'}}>
                        <li className="clickable">
                            NEWSLETTER
                        </li>
                    </Link>


                    <Link to="/collections" style={{flexBasis: '33.333333%'}}>
                        <li className="clickable">
                            COLLECTIONS
                        </li>
                    </Link>


                    <Link to="/contacts" style={{flexBasis: '33.333333%'}}>
                        <li className="clickable">
                            CONTACTS
                        </li>
                    </Link>
                </ul>
            </div >
        );
    }
}