import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {

  render() {
    return (
      <footer>

        <div>
          <p>MB „PLASTIC FUTURE" © 2020, all rights reserved.</p>
        </div>



        <div className="imageContainer">
          <a href="https://instagram.com/_plasticfuture" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/instagram_icon.png'} />
          </a>

          <a href="https://twitter.com/_plasticfuture" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/twitter_icon.png'} />
          </a>

          <a href="https://youtube.com" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/youtube_icon.png'} />
          </a>

          <a href="https://www.antislavery.org/" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/slavery_resized.png'} />
          </a>

          <Link to="/tac">
            <img src={process.env.PUBLIC_URL + '/images/icons/tac2_resized.png'} />
          </Link>

          {/* <Link to="/career">
            <img src={process.env.PUBLIC_URL + '/images/icons/career_resized.png'} />
          </Link> */}


        </div>
      </footer >
    );

  }
}
