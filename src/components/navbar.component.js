import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {

    return (
      <navbar>
        <div className="navbarOne">
          <div className="centeringParent">
            <div className="dropdown">
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/navbar/threeLines.png`}
                  alt="threeLines"
                  className="clickable"
                ></img>
                <div className="dropdown-content">
                  <a>T-SHIRTS</a>
                  <a>TOTE BAGS</a>
                  <a>YOUR ACCOUNT</a>
                  <a>COLLECTIONS</a>
                  <a>CONTACTS</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbarTwo">
          <div className="centeringParent" id="navbarText">
            <Link to="/">PLASTIC FUTURE
             </Link>
          </div>
        </div>
        <div className="navbarThree">
          <div className="centeringParent">
            <img src={`${process.env.PUBLIC_URL}/images/navbar/cart.png`} alt="cartPhoto" className="clickable"></img>
          </div>
        </div>
      </navbar>
    );

  }
}