import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import priceFormatting from '../modules/priceFormatting';
import { makeStyles } from '@material-ui/core/styles';


// demo for performance. might try a PureComponent
class CartProductPhoto extends Component {
  constructor() {
    super();
  }

  render() {
    return <img src={this.props.src} alt={this.props.altText} />;
  }

}

const useStyles = makeStyles({
  font: {
    fontFamily: "Open Sans Condensed"
  },
});


// transform dcart to smaller components
const DropdownCart = (props) => {
  // for better readability as it is used in a lot of places and would take too much space
  const d = props.datas;
  let sum = 0;

  Object.keys(d).map(key =>
    sum += d[key].price * d[key].count
  )

  return (
    <ul className='dropdown' id='cartDropdown'>
      <div className='cart-dropdown-item-list'>
        {
          !d[0] ? <li>no products.</li> :
            Object.keys(d).map(key =>
              <div key={key} className='cart-item' style={{ height: 'max-content', display: 'block', padding: '1.5rem 0', background: 'whitesmoke' }}>
                <li className='cartPreviewItem'>
                  {/* image of the product */}
                  <Link to={`/products/${d[key].type}/${d[key].productCode}/${d[key].color}/${d[key]._id}/`} >
                    <CartProductPhoto key={key + 'photo'} src={require(`../../src/images/${d[key].season}/designs/${d[key].type}s/${d[key].name}/${d[key].name}-${d[key].color}-small.png`)}
                      altText={`${d[key].name}-${d[key].color}-photo`} />
                  </Link>


                  <div className='cartPreviewItemTextGrid'>
                    <Link to={`/products/${d[key].type}/${d[key].productCode}/${d[key].color}/${d[key]._id}/`}
                      style={{ fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}
                    >
                      {d[key].name + ' ' + d[key].type}
                    </Link>



                    <p style={{ cursor: 'default', margin: '0 auto', marginTop: '0.35rem', fontSize: '1.2rem' }}>
                      {priceFormatting(d[key].price.toFixed(2)) + '€'}
                    </p>

                    <Link to={`/collections/${d[key].season}/`}
                      style={{ textTransform: 'uppercase', fontWeight: 'normal', fontSize: '1rem' }}
                    >
                      {d[key].season + "'" + d[key].productCode[4] + d[key].productCode[5]}
                    </Link>

                    {/* TODO: grid */}
                    <div style={{ marginTop: '-0.75rem', cursor: 'pointer', textAlign: 'center' }}>
                      <span id='modify-amount' onClick={() => (props.modifyCount(-1, key))} >
                        -
                       </span>

                      <span style={{ fontSize: '1.1rem' }}>
                        {d[key].count}
                      </span>

                      <span id='modify-amount' onClick={() => (props.modifyCount(1, key))}  >
                        +
                    </span>

                    </div>

                    <p style={{ cursor: 'default', position: 'relative', top: '35%' }}>
                      {d[key].color + ' — ' + d[key].size + ' '}
                    </p>
                  </div>
                </li>
              </div>
            )
        }
      </div>

      <div id='grid-for-total-cost'>
        <p style={{ textAlign: 'left' }}>TOTAL COST:</p>
        <p style={{ textAlign: 'right', fontWeight: '550' }}>{priceFormatting(sum)} €</p>
      </div>

      {/* if the cart isnt empty, show the checkout button */}
      {
        d[0] !== undefined &&
        <p className='checkout-text'>CHECKOUT</p>
      }
    </ul>
  );
}


const itemCount = (datas) => {
  let count = 0;

  if (datas)
    datas.forEach(arrItem => {
      count += arrItem.count;
    });

  return count;
};



const Navbar = (props) => {
  const [openLeftDD, setOpenLeftDD] = useState(false);

  // handle clicks
  React.useEffect(() => {
    const hideDropdowns = () => {
      setOpenLeftDD(false);
      props.setOpenCartDropdown(false);
    };

    const handleKeyPress = e => e.key === 'Escape' && hideDropdowns();

    const handleMouseClick = e => {
      // hide dropdowns only if the click was on an element that does is not interactive in any way (e.g. not a purchase button, not a threelines button)
      if (e.target.id !== 'icon-btn-container' && e.target.id !== 'three-lines-icon' && e.target.id !== 'cart-icon' && e.target.id !== 'buyBtn' && e.target.id !== 'modify-amount')
        hideDropdowns();

      if (window.innerWidth < 750 && window.innerHeight < 1300) {
        // if the three lines dropdown was displayed on a mobile device and we clicked on the cart
        if (e.target.id === 'cart-icon' && openLeftDD)
          setOpenLeftDD(false);
        else if (e.target.id === 'three-lines-icon' && props.openCartDropdown)
          props.setOpenCartDropdown(false)
      }

    }

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleMouseClick);
  }, []);


  const LeftContainer = () => {
    return (
      <div onClick={() => { setOpenLeftDD(!openLeftDD) }} id='icon-btn-container'>
        <img src={require('../../src/images/navbar/threeLines.png')}
          className='icon-button clickable' id='three-lines-icon' alt='threeLines-icon' />

        {openLeftDD && <LeftContainerDropdown />}
      </div >
    );
  };

  const LeftContainerDropdown = () => {
    return (
      <ul className='dropdown' >
        <Link to='/products/'>
          <li>ALL PRODUCTS</li>
        </Link>

        <Link to='/products/t-shirt'>
          <li>T-SHIRTS</li>
        </Link>

        <Link to='/products/tote'>
          <li>TOTE BAGS</li>
        </Link>

        <Link to='/collections'>
          <li>COLLECTIONS</li>
        </Link>

        <Link to='/contacts'>
          <li>CONTACTS</li>
        </Link>
      </ul>
    );
  };



  const Cart = () => {
    // if the user clicks on the dropdown (for example he clicks + or -), the cart doesn't hide 
    const handleClick = (e) => (e.target.id === 'cart-icon' || e.target.id === 'icon-btn-container') && props.setOpenCartDropdown(!props.openCartDropdown);

    return (
      <div onClick={handleClick} id='icon-btn-container'>
        <img src={require('../../src/images/navbar/cart.png')}
          id='cart-icon' className='icon-button clickable' alt='cart-icon' />

        <span id='cart-item-count'>
          {itemCount(props.datas) < 10 ? itemCount(props.datas) !== 0 && itemCount(props.datas) : '9+'}
        </span>

        {props.openCartDropdown && <DropdownCart modifyCount={props.modifyCount} datas={props.datas} />}
      </div>
    );
  };

  const classes = useStyles();

  return (
    <header>
      <LeftContainer />

      {/* add class no-select-bg */}
      <Link to='/' className={classes.font}>PLASTIC FUTURE</Link>


      <Cart datas={props.datas} openCartPreview={props.openCartDropdown} />
    </header>
  );
}


export default Navbar;