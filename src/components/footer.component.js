import React, { Component } from "react";

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

          <a href="https://twitter.com" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/twitter_icon.png'} />
          </a>

          <a href="https://youtube.com" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/youtube_icon.png'} />
          </a>

          <a href="https://www.antislavery.org/" target="_blank">
            <img src={process.env.PUBLIC_URL + '/images/icons/slavery_resized.png'} />
          </a>

          <a href="/tac">
            <img src={process.env.PUBLIC_URL + '/images/icons/tac2_resized.png'} />
          </a>

          <a href="/career" >
            <img src={process.env.PUBLIC_URL + '/images/icons/career_resized.png'} />
          </a>

        </div>
      </footer>
    );

  }
}
