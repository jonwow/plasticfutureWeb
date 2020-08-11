import React, { Component } from "react";

export default class Footer extends Component {

  render() {
    return (
      <footer>

        <div>
          <p>MB „PLASTIC FUTURE" © 2020, all rights reserved.</p>
        </div>


        <div class="imageContainer">
          <img src={process.env.PUBLIC_URL + '/images/icons/instagram_icon.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/twitter_icon.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/youtube_icon.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/slavery_resized.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/tac2_resized.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/career_resized.png'} />
        </div>
      </footer>
    );

  }
}
