import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import priceFormatting from './priceFormatting';
var timerID;
/* how this component works:
1 - constructor starts
2 - render shows the initial render (displays the part that gets displayed if 'this.state.loading = true' because the state is as defined in the constructor)
3 - componentDidMount starts and checks whether to fetch data from the database or no. both options are ASYNC
3.1 - IF FETCH - axios.get starts and changes the state of 'this' thus updating the render component
3.2 - IF DONT FETCH - data is received from the previous location and state is then changed thus updating the render component
4 - render updates because the state got updated and displays the part that gets displayed if 'this.state.loading = false'*/


export default class extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      description: undefined,
      price: undefined,
      curColor: undefined,
      allColors: undefined,
      season: undefined,
      name: undefined,
      info: undefined,
      loading: true,
      sizes: undefined,
      productCode: undefined,
      type: undefined,
      public: undefined,
      allAvailableStatuses: undefined,
      curAvailable: undefined,
      selectedSize: undefined,
      imageName: []
    }


  }



  selectTheSize(size) {
    var allSizeElements = document.getElementsByClassName('productSizing')[0].children,
      selectedSize = document.getElementById(size);


    // give white background to all size elements
    for (var i = 0; i < allSizeElements.length; i++)
      allSizeElements[i].style.cssText = "background: white"

    // give black background to the selected size element
    selectedSize.style.cssText = "background: black; color: white; transition: background 0.2s, color  0.2s"

    this.setState({
      selectedSize: size,
      fullyLoaded: true
    })

  }

  determineStateProperties() {
    var index = 0, lastIndex = undefined, countOfAvailableSizes = 0;
    // loop that finds the last available size and whether there are more than 1 available size
    // i = size | Object.values(..)[..][..] = how many units are available for that size and color
    for (let i of Object.keys(this.state.sizes)) {
      if (Object(this.state.sizes)[i][this.state.allColors.indexOf(this.state.curColor)] > 0) {
        lastIndex = index;
        countOfAvailableSizes++;
      }
      index++;
    }

    // if the product is available and it has at least 1 available size, set state to 'curAvailable: true'
    if (this.state.allAvailableStatuses[this.state.allColors.indexOf(this.state.curColor)] && countOfAvailableSizes > 0) {
      this.setState(
        {
          curAvailable: true
        },
        function () {
          if (countOfAvailableSizes === 1 && this.state.curAvailable)
            this.selectTheSize(Object.keys(this.state.sizes)[lastIndex])
        }
      );
    }
  }


  componentDidUpdate() {
    var tempState = {
      productCode: this.state.productCode,
      color: this.state.curColor
    }

    // if tempState is set (typically only when this.state is set)
    if (tempState.productCode !== undefined && tempState.color !== undefined)
      // if current url params do not match with the previous state
      if (this.props.match.params.color !== tempState.color || this.props.match.params.productCode !== tempState.productCode) {

        console.log('url switch and didupdate. tempstate color and prod code: ' + tempState.color + tempState.productCode);
        console.log('params data: ' + this.props.match.params.color + this.props.match.params.productCode);

        if (this.props.location.product) {
          // console.log('cache exists, no data from the database is necessary')

          this.setState(
            {
              description: this.props.location.product.description,
              price: this.props.location.product.price,
              // without the 'match.params' the color would be undecided if the product has >1 color
              curColor: this.props.match.params.color,
              allColors: this.props.location.product.color,
              season: this.props.location.product.season,
              name: this.props.location.product.name,
              info: this.props.location.product.info,
              type: this.props.location.product.type,
              sizes: this.props.location.product.sizes,
              public: this.props.location.product.public,
              allAvailableStatuses: this.props.location.product.available,
              curAvailable: false,
              productCode: this.props.location.product.productCode,
              loading: false,
              _id: this.props.location.product._id,
            },
            this.determineStateProperties
          );
        }
        else {
          // console.log('no cache is present, therefore we get data from the database');

          axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
              this.setState({
                description: response.data.description,
                price: response.data.price,
                curColor: this.props.match.params.color,
                allColors: response.data.color,
                season: response.data.season,
                name: response.data.name,
                info: response.data.info,
                sizes: response.data.sizes,
                public: response.data.public,
                productCode: response.data.productCode,
                allAvailableStatuses: response.data.available,
                type: response.data.type,
                loading: false,
                _id: response.data._id
              },
                this.determineStateProperties
              )
            })
        }
      }




  }

  componentDidMount() {
    console.log('n')
    if (this.props.location.product) {
      // console.log('cache exists, no data from the database is necessary')
      this.setState(
        {
          description: this.props.location.product.description,
          price: this.props.location.product.price,
          // without the 'match.params' the color would be undecided if the product has >1 color
          curColor: this.props.match.params.color,
          allColors: this.props.location.product.color,
          season: this.props.location.product.season,
          name: this.props.location.product.name,
          info: this.props.location.product.info,
          type: this.props.location.product.type,
          sizes: this.props.location.product.sizes,
          public: this.props.location.product.public,
          allAvailableStatuses: this.props.location.product.available,
          curAvailable: false,
          productCode: this.props.location.product.productCode,
          loading: false,
          _id: this.props.location.product._id,
        },
        this.determineStateProperties,
      );
    }
    else {
      // console.log('no cache is present, therefore we get data from the database');

      axios.get('http://localhost:5000/products/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            description: response.data.description,
            price: response.data.price,
            curColor: this.props.match.params.color,
            allColors: response.data.color,
            season: response.data.season,
            name: response.data.name,
            info: response.data.info,
            sizes: response.data.sizes,
            public: response.data.public,
            productCode: response.data.productCode,
            allAvailableStatuses: response.data.available,
            type: response.data.type,
            loading: false,
            _id: response.data._id
          },
            this.determineStateProperties
          )
        })
    }
  }


  buyBtnPressed(index, name, size, price, type, season, color, _id) {
    // show 'select a size' msg
    if (size === undefined) {

      document.getElementById("root").style.cssText = "transition: filter 0.75s; filter: blur(5px) grayscale(1)";
      document.getElementById("choose-a-size-msg").classList.toggle("visible");

      setTimeout(() => {
        document.getElementById("root").style.cssText = "transition: 0.75s; filter: blur(0px) grayscale(0)";
        document.getElementById("choose-a-size-msg").classList.toggle("visible");
      }, 2700);
    }
    else {
      console.log(this.props.datas)

      var unique = true;
      let newArr = [...this.props.datas];

      // add item to dropdown if its not already there
      newArr.forEach(cartItem => {
        if (cartItem.productCode === index && cartItem.size === size && cartItem.color === color) {
          unique = false;
          cartItem.count++;
        }
      });

      if (unique) {
        newArr[newArr.length] = {
          productCode: index,
          name: name,
          size: size,
          price: price,
          count: 1,
          type: type,
          season: season,
          color: color,
          _id: _id,
        };
      }
      this.props.setDatas(newArr);
      this.props.setOpenCartPreview(true);
      this.props.cartPreviewTimeout('SET');


      localStorage.setItem('cartItems', JSON.stringify(this.props.datas))
    }
  }

  enlargeImage = (imgSrc) => {
    if (document.getElementById("background-container") !== undefined) {
      document.getElementById("background-container").style.top = window.pageYOffset + 'px';
      document.getElementById("product-page-main-container").style.opacity = "0.5";
      document.getElementById("background-container").classList.toggle("display-none");
      document.getElementsByTagName("body")[0].classList.toggle("setHeightLimit");
      document.getElementById("enlarged-img").src = imgSrc;

    }
  }

  render() {
    var i = -1;

    return (
      <div style={{ margin: "0 auto" }}>
        {/* hidden by default */}
        <div style={{ cursor: 'pointer', background: 'rgb(0 0 0 / 85%)' }} onClick={() => {
          document.getElementById("background-container").classList.toggle("display-none");
          document.getElementById("product-page-main-container").style.opacity = "1";
          document.getElementsByTagName("body")[0].classList.toggle("setHeightLimit");
        }} className="display-none" id="background-container">

          <div id="background-container-2">
            <img className="big-img-container" style={{ borderRadius: '5px', zIndex: '111' }} onClick={() => {
              document.getElementById("product-page-main-container").style.opacity = "1";

            }} id="enlarged-img" alt='enlarged' src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg" />

          </div>

        </div>

        {/* DEMO */}
        {!this.state.loading &&
          <div id="product-page-main-container" style={{ letterSpacing: '-1.2px', textTransform: "uppercase", textDecoration: 'none', color: "black", marginLeft: '1rem', fontSize: "1.8rem", marginTop: '0.25rem' }}>
            <span style={{ fontWeight: '500' }}>
              <Link to={{
                pathname: "/collections/" + this.state.season,
              }}>
                {this.state.season} { }
              </Link>
            </span>


            <span style={{ marginLeft: '0.5rem', fontWeight: '1' }} >
              <Link to={{
                pathname: "/products/" + this.state.season + '/' + this.state.type,
              }}>
                / {this.state.type}
              </Link>
            </span>
          </div>
        }



        <div style={!this.state.curAvailable ? { filter: 'grayscale(1) blur(1px)' } : {}}>
          {this.state.loading ?
            <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0', paddingBottom: '400px' }}></p>

            :
            <div className="box2">
              <div className="productDescription">
                {/* height of ~400-600 and overflow scroll */}
                {/* long text bugs this. better of making a single p with a scroll overflow */}
                {/* max 3 lines of text so the design looks good */}
                <div className="productDescriptionText">
                  <p>{this.state.description}</p>
                  <p>{this.state.info}</p>
                </div>
                <p className="productPrice">
                  {this.state.curAvailable ?
                    priceFormatting(this.state.price[this.state.allColors.indexOf(this.state.curColor)].toFixed(2)) + '€'
                    :
                    'UNAVAILABLE'

                  }
                </p>
                {/* if product type = tote, accessory. jewelry etc  = onesize only */}
                {this.state.curAvailable && <ul className="productSizing">
                  {/* object keys here? */}
                  {this.state.sizes.XS[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="XS" onClick={this.selectTheSize.bind(this, 'XS')}>XS</li>}
                  {this.state.sizes.S[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="S" onClick={this.selectTheSize.bind(this, 'S')}>S</li>}
                  {this.state.sizes.M[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="M" onClick={this.selectTheSize.bind(this, 'M')}>M</li>}
                  {this.state.sizes.L[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="L" onClick={this.selectTheSize.bind(this, 'L')}>L</li>}
                  {this.state.sizes.XL[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="XL" onClick={this.selectTheSize.bind(this, 'XL')}>XL</li>}
                  <li>
                    <img src={require('../../src/images/icons/sizing.png')} alt="sizing-logo" style={{ height: '1.5rem', width: '1.5rem', position: 'relative', top: '0.2rem' }} />

                  </li>
                </ul>
                }

                {this.state.curAvailable && <div className='buttonContainer' style={{ textAlign: "center" }}>

                  <button id="buyBtn" onClick={() =>

                    this.buyBtnPressed(this.state.productCode, this.state.name, this.state.selectedSize, this.state.price[this.state.allColors.indexOf(this.state.curColor)], this.state.type, this.state.season, this.state.curColor, this.state._id)

                  } >PURCHASE</button>
                  {/* <button id="cartBtn"><img className='cartBtnImg'  style={{height: '60px', width: '60px'}}src={`${process.env.PUBLIC_URL}/images/navbar/cart.png`}></img></button> */}
                </div>
                }

              </div>
              {/* after clicking it, make the image src _big.png */}
              {/* when switching colors, make the link switch too */}
              {/* give this a key instead of this kind of source */}

              {/* rename to centeringparentformobile pages and make it a class */}
              {/* think of a better name though */}
              {/* max width of the grids box so 100% equals to one cell (33.33333%) of the grid box */}

              <div className="bigProductContainer">
                <img className="bigProduct" src={require('../../src/images/' + this.state.season + `/designs/` + this.state.type + 's/' + this.state.name + `/` + this.state.name + `-` + this.state.curColor + `-small.png`)} alt={this.state.name + '-' + this.state.curColor + '-big'}
                  onClick={(e) => this.enlargeImage(e.target.src)} />

                {/* perhpas remove box3 altogether andj ust make a css class */}
                {/** <div className="box3"> 
            <div id="arrowLeft">
            {/* hide arrows in mobile view 
              <img src={`${process.env.PUBLIC_URL}/images/icons/arrowLeft.png`} alt="" style={{ height: "30px", width: "40px" }} />
              </div>
              {/* some styles need to go to css and this needs horiz+vertic centering 
                {/* if >1 color, show it 
                  <div onClick={this.print(this.state.color)} style={{ background: this.state.color, border: "1px solid black", width: "40px", height: "40px" }}>               </div>
                  
                  <div id="arrowRight">
                  <img src={`${process.env.PUBLIC_URL}/images/icons/arrowRight.png`} alt="" style={{ height: "30px", width: "40px" }} />
                  
                  </div>
                  </div>
                */}
              </div>
              {this.state.imageName.length > 1 &&
                <div className="additionalProductPhotos" style={{ maxWidth: "100%" }}>
                  {!this.state.loading &&
                    this.state.imageName.map(() => {
                      i++;

                      if (this.state.imageName[i] !== undefined)
                        return (
                          <div key={i + '-item'} id="asd">
                            <img style={{ maxWidth: '100%', cursor: 'pointer', fontSize: '0', margin: '0 auto' }}
                              onClick={(e) => this.swapImages(e.target)} src={this.state.path + this.state.imageName[i]} id={'img' + i} alt={this.state.imageName[i] + "-additional-photo"} />
                          </div>
                        );
                      // if there arent enough additional photos, the grid would portray them improperly therefore an empty picture seems like a decent solution
                      // 3 because max 3 photos and it starts from 0
                      if (i !== 3) {

                        return (
                          <div key={i + '-item'} id="asd">
                            <img alt='additional-empty-pic' style={{ opacity: '0', height: 'inherit', maxWidth: '100%', cursor: 'pointer', fontSize: '0', margin: '0 auto' }} ></img>
                          </div>
                        );
                      }

                      return null;
                    })}

                </div>
              }
            </div>


          }
        </div>
      </div>
    )
  }
}
