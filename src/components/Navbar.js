import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import priceFormatting from '../modules/priceFormatting';


// demo for performance. might try a PureComponent
class CartProductPhoto extends Component {
  constructor() {
    super();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <img src={this.props.src} alt={this.props.altText} />;
  }

}

const Navbar = (props) => {
  const [openLeftDD, setOpenLeftDD] = useState(false);

  // handle clicks
  React.useEffect(() => {
    const hideDropdowns = () => {
      setOpenLeftDD(false);
      props.setOpenCartDropdown(false);
    };

    const handleKeyPress = e => e.key === 'Escape' && hideDropdowns();

    const handleMouseClick = (e) => {
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
    const handleClick = (e) => e.target.id === 'cart-icon' && props.setOpenCartDropdown(!props.openCartDropdown);

    return (
      <div onClick={handleClick} id='icon-btn-container'>
        <img src={require('../../src/images/navbar/cart.png')}
          id='cart-icon' className='icon-button clickable' alt='cart-icon' />

        <span id='cart-item-count'>
          {itemCount(props.datas) < 10 ? itemCount(props.datas) !== 0 && itemCount(props.datas) : '9+'}
        </span>

        {props.openCartDropdown && <DropdownCart datas={props.datas} />}
      </div>
    );
  };


  // transform this to smaller components
  const DropdownCart = ({ datas }) => {
    let sum = 0;

    Object.keys(datas).map(key =>
      sum += datas[key].price * datas[key].count
    )

    return (
      <ul className='dropdown' id='cartDropdown'>
        <div className='dropdownChild'>
          {datas[0] === undefined ? <li style={{ textAlign: 'center', padding: '2rem 0' }}>no products.</li> :
            Object.keys(datas).map(key =>
              <div key={key} value={key} className='cart-item' style={{ height: 'max-content', display: 'block', padding: '1.5rem 0', background: 'whitesmoke' }}>
                <li className='cartPreviewItem'>

                  {/* image of the product */}
                  <Link to={`/products/${datas[key].type}/${datas[key].productCode}/${datas[key].color}/${datas[key]._id}/`} >
                    <CartProductPhoto src={require(`../../src/images/${datas[key].season}/designs/${datas[key].type}s/${datas[key].name}/${datas[key].name}-${datas[key].color}-small.png`)}
                      altText={`${datas[key].name}-${datas[key].color}-photo`} />
                  </Link>


                  <div className='cartPreviewItemTextGrid'>
                    <Link to={`/products/${datas[key].type}/${datas[key].productCode}/${datas[key].color}/${datas[key]._id}/`}
                      style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}
                    >
                      {datas[key].name + ' ' + datas[key].type}
                    </Link>



                    <p style={{ cursor: 'default', margin: '0 auto', fontSize: '1.2rem' }}>
                      {priceFormatting(datas[key].price.toFixed(2)) + '€'}
                    </p>

                    <Link to={`/collections/${datas[key].season}/`}
                      style={{ textTransform: 'uppercase', fontWeight: 'normal', fontSize: '1rem' }}
                    >
                      {datas[key].season + "'" + datas[key].productCode[4] + datas[key].productCode[5]}
                    </Link>

                    <div style={{ marginTop: '-0.75rem', cursor: 'pointer', textAlign: 'center' }}>

                      <span id='modify-amount' onClick={() => (props.modifyCount(-1, key))} >
                        -
                       </span>

                      <span style={{ width: '10rem', margin: '0 1rem' }}>
                        {datas[key].count}
                      </span>

                      <span id='modify-amount' onClick={() => (props.modifyCount(1, key))}  >
                        +
                    </span>

                    </div>

                    <p style={{ cursor: 'default', position: 'relative', top: '35%' }}>
                      {datas[key].color + ' — ' + datas[key].size + ' '}
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
          datas[0] !== undefined &&
          <p className='checkout-text' onClick={() => {
          }}>CHECKOUT</p>
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












  return (
    <nav>
      {console.log('Navbar rendered')}
      <LeftContainer />


      <Link to='/' className='no-select-bg'>PLASTIC FUTURE</Link>


      <Cart datas={props.datas} openCartPreview={props.openCartDropdown} />
    </nav>
  );
}


export default Navbar;