import React, { Component } from "react";

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/icons/slaveryICON_internetDL.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/tacICON_demo.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/careerICON.png'} />
        </div>


        <div>

        </div>


        <div>
          <img src={process.env.PUBLIC_URL + '/images/icons/slaveryICON_internetDL.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/tacICON_demo.png'} />
          <img src={process.env.PUBLIC_URL + '/images/icons/careerICON.png'} />
        </div>


        <p>MB „PLASTIC FUTURE" © 2020, all rights reserved.</p>
      </footer>
    );

  }
}
