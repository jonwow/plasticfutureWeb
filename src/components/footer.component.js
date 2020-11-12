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

          <Link to="/tac">
            <img src={require('../../src/images/icons/tac.png')} alt="tac-logo" />
          </Link>

          {/* <Link to="/career">
            <img src={process.env.PUBLIC_URL + '/images/icons/career_resized.png'} />
          </Link> */}


        </div>
      </footer >



    );




  }
}
