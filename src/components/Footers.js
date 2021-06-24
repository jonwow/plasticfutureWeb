import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div id="footer-image-container">
        <a href="https://instagram.com/_plasticfuture" target="_blank" rel="noopener noreferrer">
          <img src={require('../../src/images/icons/instagram.png')} alt="instagram-logo" />
        </a>

        <a href="https://twitter.com/_plasticfuture" target="_blank" rel="noopener noreferrer">
          <img src={require('../../src/images/icons/twitter.png')} alt="twitter-logo" />
        </a>

        <a href="https://www.youtube.com/channel/UCnLGSWlLm_MEHQgKbeqSolg" target="_blank" rel="noopener noreferrer">
          <img src={require('../../src/images/icons/youtube.png')} alt="youtube-logo" />
        </a>

        <a href="https://www.antislavery.org/" target="_blank" rel="noopener noreferrer">
          <img src={require('../../src/images/icons/slavery.png')} alt="anti-slavery-logo" />
        </a>
      </div>

      <div>
        <p>PLASTIC FUTURE © {new Date().getFullYear()}, all rights reserved</p>

        <Link to='/tac'>
          <p>TERMS AND CONDITIONS</p>
        </Link>
      </div>
    </footer >
  );
}


export const StickyFooter = () => {
  const list = ['NEWSLETTER', 'COLLECTIONS', 'CONTACTS'];

  return (
    <ul id="sticky-footer">
      {
        list.map((item, index) => {
          return <Link to={`/${item.toLowerCase()}`} key={item + index}>
            <li> {item} </li>
          </Link>
        })
      }
    </ul>
  );
}


export default Footer;