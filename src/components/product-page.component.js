import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* how this component works:
1 - constructor starts
2 - render shows the initial render (displays the part that gets displayed if 'this.state.loading = true' because the state is as defined in the constructor)
3 - componentDidMount starts and checks whether to fetch data from the database or no. both options are ASYNC
3.1 - IF FETCH - axios.get starts and changes the state of 'this' thus updating the render component
3.2 - IF DONT FETCH - data is received from the previous location and state is then changed thus updating the render component
4 - render updates because the state got updated and displays the part that gets displayed if 'this.state.loading = false'
*/

export default class ProductPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: undefined,
      price: undefined,
      curColor: undefined,
      isAuthed: 0,
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
      selectedSize: undefined
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
    console.log(this.state);
    // loop that finds the last available size and whether there are more than 1 available size
    // i = size | Object.values(..)[..][..] = how many units are available for that size and color
    for (let i of Object.keys(this.state.sizes)) {
      // console.log(i);
      console.log(Object.values(this.state.sizes)[index][this.state.allColors.indexOf(this.state.curColor)]);
      if (Object.values(this.state.sizes)[index][this.state.allColors.indexOf(this.state.curColor)] > 0) {
        lastIndex = index;
        countOfAvailableSizes++;
      }
      index++;
    }
    console.log(countOfAvailableSizes);

    // if the product is available and it has at least 1 available size, set state to 'curAvailable: true'
    if (this.state.allAvailableStatuses[this.state.allColors.indexOf(this.state.curColor)] && countOfAvailableSizes > 0) {
      this.setState(
        {
          curAvailable: true
        },
        function () {
          console.log('this.state.curAvailable equals to ' + this.state.curAvailable);

          if (countOfAvailableSizes == 1 && this.state.curAvailable)
            this.selectTheSize(Object.keys(this.state.sizes)[lastIndex])
        }
      );
    }


    if (!this.state.loading)
      document.title = this.state.name + ' ' + this.state.type + ' - ' + this.state.curColor
  }


  componentDidMount() {
    if (this.props.location.product) {
      console.log('cache exists, no data from the database is necessary')

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
          loading: false
        },
        this.determineStateProperties
      );
    }
    else {
      console.log('no cache is present, therefore we get data from the database');

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
            loading: false
          },
            this.determineStateProperties
          )
        })
    }
  }

  render() {
    console.log(this.state.selectedSize);
    var sum = 0;

    return (
      <div style={{ margin: "0 auto" }}>

        {/* DEMO */}
        <div style={{ letterSpacing: '-1.2px', textTransform: "uppercase", textDecoration: 'none', color: "black", marginLeft: '1rem', fontSize: "1.8rem", marginTop: '0.25rem' }}>
          <span style={{ fontWeight: '500' }}>
            <Link to={{
              pathname: "/collections/" + this.state.season,
            }}>
              {this.state.season} {}
            </Link>
          </span>


          <span style={{ marginLeft: '0.5rem', fontWeight: '1' }} >
            <Link to={{
              pathname: "/products/" + this.state.season + '/' + this.state.type,
            }}>
              / {this.state.type}s
            </Link>
          </span>
        </div>


        {/* <div class="fullScreenProductPhoto">
        <img class="bigProduct" src={process.env.PUBLIC_URL + '/images/' + this.state.season + `/designs/` + this.state.name + `/` + this.state.name + `_` + this.state.color + `_small.png`} />

        </div> */}

        <div style={!this.state.curAvailable ? { filter: 'grayscale(1) blur(1px)' } : {}}>
          {this.state.loading ?
            <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0', paddingBottom: '400px' }}></p> && console.log('loading bro')
            // everything below here until the end of the conditional operator curly braces DOES NOT GET EXECUTED ON THE INITIAL RENDER
            :
            <div class="box2">
              <div class="productDescription">{console.log('loading completed')}
                {/* height of ~400-600 and overflow scroll */}
                {/* long text bugs this. better of making a single p with a scroll overflow */}
                {/* max 3 lines of text so the design looks good */}
                <div class="productDescriptionText">
                  <p>{this.state.description}</p>
                  <p>{this.state.info}</p>
                </div>

                <p class="productPrice">
                  {this.state.curAvailable ?
                    this.state.price[this.state.allColors.indexOf(this.state.curColor)] + '.00€'
                    :
                    'UNAVAILABLE'

                  }
                </p>
                {/* if product type = tote, accessory. jewelry etc  = onesize only */}
                {this.state.curAvailable && <ul class="productSizing">
                  {/* object keys here? */}
                  {this.state.sizes.XS[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="XS" onClick={this.selectTheSize.bind(this, 'XS')}>XS</li>}
                  {this.state.sizes.S[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="S" onClick={this.selectTheSize.bind(this, 'S')}>S</li>}
                  {this.state.sizes.M[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="M" onClick={this.selectTheSize.bind(this, 'M')}>M</li>}
                  {this.state.sizes.L[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="L" onClick={this.selectTheSize.bind(this, 'L')}>L</li>}
                  {this.state.sizes.XL[this.state.allColors.indexOf(this.state.curColor)] > 0 && <li id="XL" onClick={this.selectTheSize.bind(this, 'XL')}>XL</li>}
                  <li>(i)</li>
                </ul>
                }

                {this.state.curAvailable && <div class='buttonContainer' style={{ textAlign: "center" }}>

                  <button id="buyBtn" onClick={
                    this.props.updateFieldChanged(this.state.productCode, this.state.name, this.state.selectedSize, this.state.price[this.state.allColors.indexOf(this.state.curColor)])
                  } >PURCHASE</button>
                  {/* <button id="cartBtn"><img class='cartBtnImg'  style={{height: '60px', width: '60px'}}src={`${process.env.PUBLIC_URL}/images/navbar/cart.png`}></img></button> */}
                </div>
                }

              </div>
              {/* after clicking it, make the image src _big.png */}
              {/* when switching colors, make the link switch too */}
              {/* give this a key instead of this kind of source */}

              {/* rename to centeringparentformobile pages and make it a class */}
              {/* think of a better name though */}
              {/* max width of the grids box so 100% equals to one cell (33.33333%) of the grid box */}

              {/* rename this class 'bigproductcontainer */}
              <div class="bigProductContainer">
                <img class="bigProduct" src={require('../../src/images/' + this.state.season + `/designs/` + this.state.type + 's/' + this.state.name + `/` + this.state.name + `-` + this.state.curColor + `-small.png`)} />

                {/* perhpas remove box3 altogether andj ust make a css class */}
                {/** <div class="box3"> 
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
              <div class="additionalProductPhotos" style={{ maxWidth: "100%" }}>
                <div id="photosGrid">
                  <div class="additionalPhotoBox">
                    <img style={{ width: '96%', padding: '0 2%' }} src={require('../../src/images/' + this.state.season + `/designs/` + this.state.type + `s/` + this.state.name + `/` + this.state.name + `-` + this.state.curColor + `-small.png`)} />

                  </div>


                  <div class="additionalPhotoBox">
                    <img style={{ width: '96%', padding: '0 2%' }} src={require('../../src/images/' + this.state.season + `/designs/` + this.state.type + 's/' + this.state.name + `/` + this.state.name + `-` + this.state.curColor + `-small.png`)} />

                  </div>
                </div>



              </div>

            </div>
          }
          {/* items here and below are rendered on the initial render  */}
        </div>
      </div>
    )
  }
}
