import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* how this component works:
1 - constructor starts
2 - render shows the initial render (displays the part that gets displayed if 'this.state.loading = true' because the state is as defined in the constructor)
3 - componentDidMount starts and in the ELSE block it executes all code except for axios.get
3.1 - axios.get starts and changes the state of 'this' thus updating the render component
3.2 - all code in the 'axios.get' right below 'setState' gets executed
4 - render updates because the state got updated and displays the part that gets displayed if 'this.state.loading = false
*/

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      price: [],
      curColor: '',
      allColors: [],
      season: '',
      name: '',
      info: '',
      loading: true,
      sizes: {},
      productCode: '',
      public: true,
      allAvailableStatuses: [],
      curAvailable: undefined,
      selectedSize: undefined,
      x: this.props.match.params.productType
    }
  }

  selectTheSize(size) {
    this.state.selectedSize = size;
    var x = document.getElementsByClassName('productSizing')[0].children;
    for (var i = 0; i < x.length; i++)
      x[i].style.cssText = "background: white"
    document.getElementById(size).style.cssText = "background: black; color: white; transition: background 0.2s, color  0.2s"
  }

  // kaip pavadint funkcija kuri nsutatys ar available ir ar 
  determineStateProperties() {
    // index = sizeIndex 2 = S
    console.log(this.state);
    var index = 0, lastIndex, countOfAvailableSizes = 0;
    console.log(Object.values(this.state.sizes))
    console.log(this.state.sizes)
    for (let i of Object.keys(this.state.sizes)) {
      console.log(i);
      if (Object.values(this.state.sizes)[index][this.state.allColors.indexOf(this.state.curColor)] > 0) {
        lastIndex = index;
        countOfAvailableSizes++;
      }
      index++;
    }

    console.log(lastIndex);

    if (this.state.allAvailableStatuses[this.state.allColors.indexOf(this.state.curColor)] && countOfAvailableSizes > 0) {
      console.log('boop2');

      this.setState({ curAvailable: true })
    }
    else {
      console.log('boop');
    }

    console.log(this.state.curAvailable);
    console.log(countOfAvailableSizes);

    if (countOfAvailableSizes == 1 && this.state.curAvailable)
      this.selectTheSize(Object.keys(this.state.sizes)[lastIndex])
  }
  componentDidMount() {
    if (this.props.location.product) {
      console.log('cache exists, no `axios.get()` is necessary')
      this.setState({
        description: this.props.location.product.description,
        price: this.props.location.product.price,
        // without the 'match.params' the color would be undecided if the product has >1 color
        curColor: this.props.match.params.color,
        allColors: this.props.location.product.color,
        season: this.props.location.product.season,
        name: this.props.location.product.name,
        info: this.props.location.product.info,
        type: this.props.location.product.type,
        public: this.props.location.product.public,
        allAvailableStatuses: this.props.location.product.available,
        curAvailable: false,
        productCode: this.props.location.product.productCode,
        loading: false
      })

      // kodel cia setstate netinka?
      this.state.sizes = this.props.location.product.sizes;
      this.state.curColor = this.props.match.params.color;
      this.state.allColors= this.props.location.product.color;
      this.state.allAvailableStatuses= this.props.location.product.available;
      this.state.price = this.props.location.product.price;

      console.log(this.state);
      this.determineStateProperties()


    }
    else {
      console.log('no cache is present, therefore we get data from the server');
      console.log(this.state.price)


      axios.get('http://localhost:5000/products/' + this.props.match.params.id)
        .then(response => {
          console.log(this.state.price)

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
          })
          this.determineStateProperties()
        })

      // all lines here and above in the 'else' block get executed BEFORE the axios.get
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      // this.state.type = 'xd'

      // console.log(this.state.description);

    }

  }

  // first lines after the constructor that get executed
  render() {
    if (!this.state.loading)
      document.title = this.state.name + ' ' + this.state.type + ' - ' + this.state.curColor
    console.log('shlime');

    // if (this.state.allAvailableStatuses[this.state.allColors.indexOf(this.state.curColor)] && sum > 0)
    //   this.state.curAvailable = true

    return (
      <div style={{ margin: "0 auto" }}>
        <Link to={{
          pathname: "/products/" + this.state.x,
        }}>{this.state.x}</Link>

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

                  <button id="buyBtn">PURCHASE</button>
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
                <img class="bigProduct" src={process.env.PUBLIC_URL + '/images/' + this.state.season + `/designs/` + this.state.type + 's/' + this.state.name + `/` + this.state.name + `_` + this.state.curColor + `_small.png`} />

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
                    <img style={{ width: '96%', padding: '0 2%' }} src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.type + 's/' + this.state.name + `/` + this.state.name + `_` + this.state.curColor + `_small.png`} />

                  </div>


                  <div class="additionalPhotoBox">
                    <img style={{ width: '96%', padding: '0 2%' }} src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.type + 's/' + this.state.name + `/` + this.state.name + `_` + this.state.curColor + `_small.png`} />

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
