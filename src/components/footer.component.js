import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <div id="footer-image-container">
          <a href="https://instagram.com/_plasticfuture" target="_blank" rel="noopener noreferrer">
            <img src={require('../../src/images/icons/instagram.png')}  alt="instagram-logo"/>
          </a>

          <a href="https://twitter.com/_plasticfuture" target="_blank" rel="noopener noreferrer">
            <img src={require('../../src/images/icons/twitter.png')}  alt="twitter-logo"/>
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../src/images/icons/youtube.png')}  alt="youtube-logo"/>
          </a>

          <a href="https://www.antislavery.org/" target="_blank" rel="noopener noreferrer">
            <img src={require('../../src/images/icons/slavery.png')} alt="anti-slavery-logo" />
          </a>


          {/* <Link to="/career">
            <img src={process.env.PUBLIC_URL + '/images/icons/career_resized.png'} />
          </Link> */}


        </div>

        <div>
          <p>MB „PLASTIC FUTURE" © 2020, all rights reserved</p>
          
          <Link to="/tac">
            <p>TERMS AND CONDITIONS</p>
          </Link>
        </div>
      </footer >



    );




  }
}
