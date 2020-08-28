import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

let currency = '€';

var availableColorIndexes = [];

const Product = props => (
    <Link to={{
        pathname: "/products/" + props.product.type + '/' + props.product.productCode + '/' + props.color + '/' + props.product._id + "/",
        product: props.product,
        style: props.style
    }} >

        <div style={props.style} className="product">
            <img src={`${process.env.PUBLIC_URL}/images/` + props.product.season + `/designs/` + props.product.type + 's/' + props.product.name + `/` + props.product.name + `_` + props.color + `_small.png`} />

            {/* make a proper formatting solution */}
            {props.product.available ?
                props.product.price.toString().includes('.') ?
                    <p >{props.product.price[props.index]}</p>
                    :
                    <p  >{props.product.price[props.index]}.00{currency}</p>
                :
                <p >unavailable</p>
            }
        </div>

    </Link >
)


export default class ProductList extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { products: [], loading: true };
    }


    componentDidMount() {
        document.title = 'P L A S T I C F U T U R E '

        axios.get("http://localhost:5000/products/")
            .then(response => {
                this.setState({ products: response.data, loading: false });
            })
            .catch((error) => {
                console.log(error);

            })
    }

    /*
    uzduotis: masyvas kuriam kiekvieno produkto kiekvienos spalvos variacija ir kuriam pirmiausia available produktai
    
    ideja a:
    1) push the products to available&unavailable arrays
    2) push the color indexes to available&unavailableindex arrays
    3) concat both arrays to products[] and colorIndexes[]
	
    this.state.fetchedProducts= old this.state.products
    this.state.displayableProducts = 
    
    ------
    jei sortint, tai indexu nepamirst.
    ar default sortingas pagal unitsSold ar jei kainosvienodos tada pagal unitsSold    
    */

    filterProducts(productType) {
        var availableProducts = [],
            unavailableProducts = [], unavailableColorIndexes = [];


        // for every product that gets fetched from the database to this.state
        this.state.products.map(curProduct => {
            // for each color of that product
            for (var index = 0; index < curProduct.color.length; index++) {
                // if the product in that color is public 
                if (curProduct.public[index])
                    // if the client is on a specific product type page (tshirt, tote) or all products
                    if (curProduct.type == productType || productType == undefined)
                        if (curProduct.available[index])
{

                           availableColorIndexes.push(index) && availableProducts.push(curProduct);
 console.log(curProduct.name + index)
}
                        else
                            unavailableColorIndexes.push(index) && unavailableProducts.push(curProduct);
            }
        })

        // sort available products before concating 
        
        
        
        // !!!!!!!!!!!
        //  price = array. make the index by color index and swap the colroindex values as well
console.log('before testing')
console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
        // 2- sorting
        
for (var i = 0; i < availableProducts.length-1; i++)
{
for (var j = i+1 ; j < availableProducts.length; j++)
{
if (availableProducts[i].price[0] > availableProducts[j].price[0])
{
var temp = availableProducts[j];
var tempColor = availableColorIndexes[j];

availableProducts[j] = availableProducts[i];
availableColorIndexes[j] = availableColorIndexes[i];

availableProducts[i] = temp;
availableColorIndexes[i] = tempColor;
}
}}
console.log(availableProducts)
console.log(availableColorIndexes)
	
        // add colors to this and then start implementing the sorting
        return availableProducts.concat(unavailableProducts);
    }

    productList(productType) {
        var productList = this.filterProducts(productType)
        console.log(productList)
        // make this sorting stuff a function
        // 1 - all undefined need to go to the end (perhaps a new array and then make a new one from 2 old arrays)

        // for (i in masyvas)
        //     if (masyvas[i].available)
        //         unavailableProducts.push(masyvas[i])
        //     else
        //         availableProducts.push(masyvas[i])




        // var masyvas = availableProducts.concat(unavailableProducts)
        // 2- sorting
        // for (var i = 0; i < masyvas.length; i++) {
        //     for (var j = 1; j < masyvas.length; j++) {
        //         if (masyvas[i] > masyvas[j]) {
        //             [masyvas[i], masyvas[j]] = [masyvas[j], masyvas[i]]
        //         }
        //     }
        // }
        // console.log(masyvas)

        // return masyvas.map(curProduct => {
        //     // if NOT in stock or ready to be sold
        //     if (!curProduct.available)
        //         currentStyle = { filter: "grayscale(1) blur(1px)" }
        //     else
        //         var currentStyle = {};

        //     return curProduct.color.map(curColor => {
        //         return <Product product={curProduct} color={curColor} style={currentStyle} index={curProduct.color.indexOf(curColor)} />
        //     })

        // })
    }


    render() {
        const productType = this.props.match.params.productType;
        return (

            <div className="centeredContainer" id="topElement" >
                {productType ?
                    <p style={{ textAlign: "left", marginLeft: '3rem', fontSize: "4rem" }}> {productType}
                        {/* if the product type is jeans, dont add the 's' at the end */}
                        {productType[productType.length - 1] != 's' && 's'}
                    </p>
                    :
                    <p style={{ textAlign: "left", marginLeft: '3rem', fontSize: "4rem" }}>all products </p>}
                < div className="box" >
                    {
                        this.state.loading ?

                            <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0' }}></p>
                            :
                            this.productList(productType)
                    }
                </div >
            </div >
        )
    }
}
