import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {

  render() {
    return (
      <footer>
{/* 600 weight here */}
        <div>
          <p>MB „PLASTIC FUTURE" © 2020, all rights reserved.</p>
        </div>


        <div className="imageContainer">
          <a href="https://instagram.com/_plasticfuture" target="_blank">
            <img src={require('../../src/images/icons/instagram.png')} />
          </a>

          <a href="https://twitter.com/_plasticfuture" target="_blank">
            <img src={require('../../src/images/icons/twitter.png')} />
          </a>

          <a href="https://youtube.com" target="_blank">
            <img src={require('../../src/images/icons/youtube.png')} />
          </a>

          <a href="https://www.antislavery.org/" target="_blank">
            <img src={require('../../src/images/icons/slavery.png')} />
          </a>

          <Link to="/tac">
            <img src={require('../../src/images/icons/tac.png')} />
          </Link>

          {/* <Link to="/career">
            <img src={process.env.PUBLIC_URL + '/images/icons/career_resized.png'} />
          </Link> */}


        </div>
      </footer >
    );

  }
}
