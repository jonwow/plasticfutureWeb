import React, { Component } from 'react';
import axios from 'axios';

// solve the problem of formatting and currency 
export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    // color is not an array for some reason. investigation is necessary
    this.state = {
      description: '',
      users: [], price: '', color: [], season: '', name: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/products/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          description: response.data.description,
          price: response.data.price,
          color: this.props.match.params.color,
          season: response.data.season,
          name: response.data.name
        })
      })
      .catch(function (error) {
        console.log(error);
      })

      
  }

  print(){
    console.log(this.state.color);
  }



  render() {
    return (
      <div class="centeredContainer2">
      <div class="box2">
          <div class="productText">
            {/* make a foreach of description array. when entering into databse, make it possible to select the amount of lines  */}
            {/* height of ~400-600 and overflow scroll */}
            <p>{this.state.description.substr(0,11)}</p>
              <p>{this.state.description.substr(13)}</p>
              <p>{this.state.season}</p>           

              {/* <p>{100% organic cotton}
              </p>
              <p>Simple but elegant.</p>
              <p>Default plasticfuture logo t shirt.</p> */}

              <div class="centeringImages">
                  <img src={`${process.env.PUBLIC_URL}/images/icons/certification_sustainable_small.png`} alt=""/>
                  <img src={`${process.env.PUBLIC_URL}/images/icons/CHARITY_CERTIFICATION.png`} alt=""/>
              </div>
          </div>
          <div>
            {/* after clicking it, make the image src _big.png */}
            {/* when switching colors, make the link switch too */}
            {/* give this a key instead of this kind of source */}
          <img src={`${process.env.PUBLIC_URL}/images/` + this.state.season + `/designs/` + this.state.name + `/` + this.state.name + `_` + this.state.color+ `_small.png`} />
              <div class="box3">
                  <div>
                      <img src={`${process.env.PUBLIC_URL}/images/icons/arrowLeft.png`} alt="" style={{height: "30px", width: "40px"}}/>
                  </div>
                  {/* some styles need to go to css and this needs horiz+vertic centering */}
                  <div onClick={this.print(this.state.color)}  style={{background: this.state.color,border: "3px solid black", width: "40px", height: "40px"}}>
                  </div>

                  <div>
                  <img src={`${process.env.PUBLIC_URL}/images/icons/arrowRight.png`} alt="" style={{height: "30px", width: "40px"}}/>

                  </div>
              </div>
          </div>
          <div class="productSizingEtc">
            {/* make a css class here */}
              <p style={{filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.55))", fontSize: "60px", fontFamily: "Quicksand, serif"}}>
                {this.state.price}.00€</p>
              <div>
                <span>XS</span>
                <span>S</span>
                <span>M</span>
                <span>L</span>
                <span>XL</span>
              </div>

              {/* make this into css */}
              <div style={{textAlign: "center", margin: "12px 0"}}>

              <button id="bagBtn">ADD TO BAG</button>
              </div>


              <div style={{textAlign: "center"}}>

              <button id="buyBtn">BUY NOW</button>
              </div>




              <p  class="shippingNSIZE">SHIPPING INFORMATION · SIZE GUIDE</p>
          </div>
      </div>
      </div>
    )
  }
}