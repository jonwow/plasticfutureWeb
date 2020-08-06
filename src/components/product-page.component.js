import React, { Component } from 'react';
import axios from 'axios';

// solve the problem of formatting and currency 


export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // description: props.descriptionProps.desc,
      price: '',
      color: [],
      season: '',
      name: '',
      info: '',
      loading: true,
      productCode: ''
    }
  }

  componentDidMount() {
    if (this.props.location.product) {
      console.log('cache exists, no `axios.get()` is necessary')

      this.setState({
        description: this.props.location.product.description,
        price: this.props.location.product.price,
        // without the 'match.params' the color would be undecided if the product has >1 color
        color: this.props.match.params.color,
        season: this.props.location.product.season,
        name: this.props.location.product.name,
        info: this.props.location.product.info,
        loading: false
      })
    }
    else {
      console.log('no cache is present, therefore we get data from the server');

      axios.get('http://localhost:5000/products/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            // description: response.data.description,
            price: response.data.price,
            color: this.props.match.params.color,
            season: response.data.season,
            name: response.data.name,
            info: response.data.info,
            loading: false
          })

        })
        .catch(function (error) {
          console.log(error);
        })

    }
  }



  render() {
    return (

      <div>
        {this.state.loading ?
          <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0', paddingBottom: '400px' }}></p>
          :
          <div class="box2">
            <div class="productDescription">

              {/* height of ~400-600 and overflow scroll */}
              {/* long text bugs this. better of making a single p with a scroll overflow */}
              {/* max 3 lines of text so the design looks good */}
              <div class="productDescriptionText">
                <p>{this.state.description}</p>
                <p>{this.state.info}</p>
              </div>

              <p class="productPrice">
                {this.state.price + '.00€'}
              </p>

              <ul class="productSizing">
                <li>XS</li>
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
                <li>(i)</li>
              </ul>

              <div class='buttonContainer' style={{ textAlign: "center" }}>

                <button id="buyBtn">PURCHASE</button>
                {/* <button id="cartBtn"><img class='cartBtnImg'  style={{height: '60px', width: '60px'}}src={`${process.env.PUBLIC_URL}/images/navbar/cart.png`}></img></button> */}
              </div>


            </div>
            {/* after clicking it, make the image src _big.png */}
            {/* when switching colors, make the link switch too */}
            {/* give this a key instead of this kind of source */}

            {/* rename to centeringparentformobile pages and make it a class */}
            {/* think of a better name though */}
            {/* max width of the grids box so 100% equals to one cell (33.33333%) of the grid box */}

            {/* rename this class 'bigproductcontainer */}
            <div class="bigProductContainer">
              <img class="bigProduct" src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.name + `/` + this.state.name + `_` + this.state.color + `_small.png`} />

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
                  <img style={{ width: '100%', height: '100%', padding: '0%' }} class="bigProduct" src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.name + `/` + this.state.name + `_` + this.state.color + `_small.png`} />

                </div>


                <div class="additionalPhotoBox">
                  <img style={{ width: '100%', height: '100%', padding: '0%' }} class="bigProduct" src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.name + `/` + this.state.name + `_` + this.state.color + `_small.png`} />

                </div>
              </div>



            </div>

          </div>

        }
      </div>
    )
  }
}
