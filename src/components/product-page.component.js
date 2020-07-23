import React, { Component } from 'react';
import axios from 'axios';
// import { useEffect } from 'react';
// useEffect(() => {
//   window.scrollTo(0, 0)
// }, [])
// solve the problem of formatting and currency 
export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    // color is not an array for some reason. investigation is necessary
    this.state = {
      description: '',
      price: '',
      color: [],
      season: '',
      name: '',
      info: ''
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
          name: response.data.name,
          info: response.data.info
        })
      })
      .catch(function (error) {
        console.log(error);
      })


  }

  print() {
    console.log(this.state.color);
  }



  render() {
    return (
      <div class="box2">
        <div class="productText">
          {/* make a foreach of description array. when entering into databse, make it possible to select the amount of lines  */}
          {/* height of ~400-600 and overflow scroll */}
          {/* long text bugs this. better of making a single p with a scroll overflow */}
          <p>{this.state.description}</p>
          <p>{this.state.info}</p>

          <p style={{ marginTop: "3rem", filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.25))", fontSize: "3rem", fontFamily: "Quicksand, serif" }}>              {this.state.price + '.00€'}</p>


          <div style={{ textAlign: "center" }}>

            <button id="buyBtn">PURCHASE</button>
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
            <div class="testBox">          </div>


          <div class="testBox">          </div>
          </div>



        </div>
      </div>
    )
  }
}
