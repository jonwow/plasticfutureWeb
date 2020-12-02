import React, {Component} from "react";
import { Link } from "react-router-dom";


export default class StickyFooter extends Component {
    render() {
        return (
            < div className="stickyFooter" >
                <ul>
                    <li className="clickable">
                        <Link>NEWSLETTER</Link>
                    </li>

                    <li className="clickable">
                        <Link>COLLECTIONS</Link>
                    </li>

                    <li className="clickable">
                        <Link>CONTACTS</Link>
                    </li>
                </ul>
            </div >
        );
    }
}