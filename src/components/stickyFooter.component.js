import React, {Component} from "react";
import { Link } from "react-router-dom";


export default class StickyFooter extends Component {
    render() {
        return (
            < div className="stickyFooter" >
                <ul>
                    <li className="clickable">
                        <p>NEWSLETTER</p>
                    </li>

                    <li className="clickable">
                        <p>COLLECTIONS</p>
                    </li>

                    <li className="clickable">
                        <p>CONTACTS</p>
                    </li>
                </ul>
            </div >
        );
    }
}