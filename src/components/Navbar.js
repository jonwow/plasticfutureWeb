import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import priceFormatting from '../modules/priceFormatting';

// sum = 0
// z.forEach(item => sum += item.count)









class CartProductPhoto extends Component {
  constructor() {
    super();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    { console.log('rendering image') }
    return <img src={this.props.src} alt={this.props.altText} />;
  }

}

const Navbar = (props) => {
  const [openLeftContDD, setOTL] = useState(false);


  const LeftContainer = () => {
    return (
      <div onClick={() => { setOTL(!openLeftContDD) }} style={{ width: "3rem", margin: "0 auto" }}>
        <img src={require('../../src/images/navbar/threeLines.png')}
          className="icon-button clickable" id='three-lines-img' alt="threeLines-logo" />

        {openLeftContDD && <LeftContainerDropdown />}
      </div >
    );
  };

  const LeftContainerDropdown = () => {
    return (
      <ul className="dropdown" >
        <Link to="/products/">
          <li>ALL PRODUCTS</li>
        </Link>

        <Link to="/products/t-shirt">
          <li>T-SHIRTS</li>
        </Link>

        <Link to="/products/tote">
          <li>TOTE BAGS</li>
        </Link>

        <Link to="/collections">
          <li>COLLECTIONS</li>
        </Link>

        <Link to="/contacts">
          <li>CONTACTS</li>
        </Link>
      </ul>
    );
  }



  const Cart = () => {
    // if the user clicks on the dropdown (for example he clicks + or -), the cart doesn't hide 
    const handleClick = (e) => {
      if (e.target.id === 'cart-img')
        props.setOpenCartDropdown(!props.openCartDropdown);
    }


    return (
      <div onClick={handleClick} style={{ width: "3rem", margin: "0 auto" }}>
        <img src={require('../../src/images/navbar/cart.png')}
          id='cart-img' className="icon-button clickable" alt="cart-logo" />

        {props.openCartDropdown && <DropdownCart datas={props.datas} />}
      </div>
    );
  };


  // transform this to smaller components
  const DropdownCart = ({ datas }) => {
    let sum = 0;

    Object.keys(datas).map(key =>
      // used to use state instead of localstorage, if any problems occur - this is where they are
      sum += datas[key].price * datas[key].count
    )

    return (
      <ul className="dropdown" id="cartDropdown" >
        <div className="dropdownChild">
          {datas[0] === undefined ? <li style={{ textAlign: "center", padding: '2rem 0' }}>no products.</li> :
            Object.keys(datas).map(key =>
              <div key={key} value={key} className="cart-item" style={{ height: "max-content", display: "block", padding: '1.5rem 0', background: 'whitesmoke' }}>
                <li className="cartPreviewItem">

                  {/* image of the product */}
                  <div style={{ margin: '0 auto' }}>
                    <Link to={{
                      pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",
                    }} >
                      <CartProductPhoto altText={datas[key].name + '-' + datas[key].color + '-photo'} src={require('../../src/images/' + datas[key].season + `/designs/` + datas[key].type + 's/' + datas[key].name + `/` + datas[key].name + `-` + datas[key].color + `-small.png`)} />
                    </Link>
                  </div>


                  <div className="cartPreviewItemTextGrid">
                    <Link to={{
                      pathname: "/products/" + datas[key].type + '/' + datas[key].productCode + '/' + datas[key].color + '/' + datas[key]._id + "/",
                    }} >
                      <h2 style={{ fontSize: '1.2rem', textTransform: "uppercase" }}>
                        {
                          datas[key].name + ' ' + datas[key].type
                        }
                      </h2>
                    </Link>



                    <p style={{ cursor: 'default', margin: '0 auto', fontSize: '1.2rem' }}>
                      {
                        priceFormatting(datas[key].price.toFixed(2)) + '€'
                      }
                    </p>

                    <Link to={{
                      pathname: "/collections/" + datas[key].season + '/',
                    }}>
                      <h3 style={{ textTransform: "uppercase", fontWeight: "normal", fontSize: '1rem' }}>
                        {
                          datas[key].season + "'" + datas[key].productCode[4] + datas[key].productCode[5]
                        }

                      </h3>
                    </Link>

                    <div style={{ marginTop: '-0.75rem', cursor: 'pointer', textAlign: 'center' }}>

                      <span id='decrease-amount' onClick={() => (props.modifyCount(-1, key))} style={{ padding: '0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }}>
                        -
                          </span>

                      <span >
                        {
                          ' ' + datas[key].count + ' '
                        }
                      </span>

                      <span id='increase-amount' onClick={() => (props.modifyCount(1, key))} style={{ padding: '0 0.25rem', margin: '0 auto', fontSize: '1.5rem', zIndex: '3' }} >
                        +
                    </span>

                    </div>

                    <p style={{ cursor: 'default', position: 'relative', top: '35%' }}>
                      {
                        datas[key].color + ' — ' + datas[key].size + ' '}
                    </p>


                  </div>
                </li>
              </div>
            )
          }
        </div>

        <div id="grid-for-total-cost">
          <p style={{ textAlign: "left" }}>TOTAL COST:</p>
          <p style={{ textAlign: "right", fontWeight: "550" }}>{priceFormatting(sum)} €</p>
        </div>

        {/* if the cart isnt empty, show the checkout button */}
        {
          datas[0] !== undefined &&
          <p className="checkout-text" onClick={() => {
            console.log(datas)
          }}>CHECKOUT</p>
        }
      </ul >
    );
  }






  // handle clicks
  React.useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === 'Escape') {
        setOTL(false);
      }
    }

    const handleMouseClick = (event) => {
      // if the click wasnt on threelines or cart or purchase button
      if (event.target.id !== "three-lines-img" && event.target.id !== 'cart-img' && event.target.id !== 'buyBtn' && event.target.id !== 'decrease-amount' && event.target.id !== 'increase-amount') {
        setOTL(false);
        props.setOpenCartDropdown(false);
      }

      if (window.innerWidth < 750 && window.innerHeight < 1300) {
        // if threelines were displayed on a mobile device and we clicked on the cart
        if (event.target.id === 'cart-img') {
          setOTL(false);
        }
        else if (event.target.id === "three-lines-img")
          props.setOpenCartDropdown(false)
      }

    }

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleMouseClick);
  }, []);






  return (
    <nav>
      {console.log('Navbar rendered')}
      {console.log(props)}
      {/* left part of the navbar */}
      <div className="navbarChild">
        <div className="centeringParent">
          <LeftContainer />
        </div>
      </div>


      {/* mid part of the navbar */}
      <div className="navbarChild">
        <div className="centeringParent" id="navbarText">
          {/* when the logo is pressed, go to top of the 'container' (for example when you are on the main page and want to go to the top by clicking it) */}
          <Link to="/" className="no-select-bg" onClick={() => {
            if (document.getElementsByClassName('container')[0])
              document.getElementsByClassName('container')[0].scrollTop = 0;
          }}>
            PLASTIC FUTURE
              </Link>
        </div>
      </div>


      {/* right part of the navbar */}
      <div className="navbarChild">
        <div className="centeringParent">
          <Cart datas={props.datas} openCartPreview={props.openCartDropdown} />
          <span className={"no-select-bg"} style={{ zIndex: "-1", position: 'absolute', left: '48%', top: '50%', fontSize: '1.5vh', borderRadius: '6px', padding: '0 0.25vh' }}>
            {(props.totalCount < 10) ? props.totalCount !== 0 && props.totalCount : '9+'}
          </span>
        </div>
      </div>
    </nav>


  );
}


export default Navbar;