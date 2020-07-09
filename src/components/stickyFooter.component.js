import React, {Component} from "react";


export default class Header extends Component {
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