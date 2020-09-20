import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

let currency = '€';

const Product = props => (
    <Link to={{
        pathname: "/products/" + props.product.type + '/' + props.product.productCode + '/' + props.color + '/' + props.product._id + "/",
        product: props.product,
        style: props.style,
        amountOfSizes: props.amountOfSizes
    }}>

        <div style={props.style} className="product">
            <img src={require(`../../src/images/` + props.product.season + `/designs/` + props.product.type + 's/' + props.product.name + `/` + props.product.name + `-` + props.color + `-small.png`)} />
            {/* make a proper formatting solution */}


            {props.product.available[props.index] && props.amountOfSizes > 0 ?
                props.product.price.toString().includes('.') ?
                    <p >{props.product.price[props.index]}</p>
                    :
                    <p  >{props.product.price[props.index]}.00{currency}</p>
                :
                <p>unavailable</p>
            }
        </div>

    </Link >
)


export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = { fetchedProducts: [], loading: true };
    }


    componentDidMount() {
        document.title = 'P L A S T I C F U T U R E '

        axios.get("http://localhost:5000/products/")
            .then(response => {
                this.setState({ fetchedProducts: response.data, loading: false });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sumOfValues(values, index) {
        let sum = 0;

        for (let value of Object.values(values))
            sum += value[index];

        return sum;
    }

    filterAndSort(productType, productCollection) {
        var products = {
            available: [],
            availColorIndex: [],

            unavailable: [],
            unavailColorIndex: [],
        }
        console.log(productCollection);

        // *******************************************************************
        // FILTERING
        // for every product that gets fetched from the database 
        this.state.fetchedProducts.map(curProduct => {
            // product type has to match the type of the page that the client is on (tshirt, tote) or all products
            if (curProduct.season == productCollection || productCollection == undefined)
                if (curProduct.type == productType || productType == undefined)
                    // for each color of that product
                    for (var index = 0; index < curProduct.color.length; index++) {
                        // if the product in that color is public 
                        if (curProduct.public[index]) {
                            if (curProduct.available[index] && this.sumOfValues(curProduct.sizes, index) > 0)
                                products.availColorIndex.push(index) && products.available.push(curProduct);
                            else
                                products.unavailColorIndex.push(index) && products.unavailable.push(curProduct);
                        }
                    }
        })

        // *******************************************************************
        // SORTING
        for (var i = 0; i < products.available.length; i++)
            for (var j = i + 1; j < products.available.length; j++)
                // if the number in the left is bigger than the number in the right. 
                // price index = the index of that color, e.g. YesLove in black (color #2) product price index has to be 2 as well

                // ***** SORT BY PRICE ASCENDING
                // if (products.available[i].price[products.availColorIndex[i]] > products.available[j].price[products.availColorIndex[j]]) {

                // ***** SORT BY UNITS SOLD
                if (products.available[i].unitsSold[products.availColorIndex[i]] < products.available[j].unitsSold[products.availColorIndex[j]]) {
                    var temp = products.available[j],
                        tempColor = products.availColorIndex[j];


                    products.available[j] = products.available[i];
                    products.availColorIndex[j] = products.availColorIndex[i];

                    products.available[i] = temp;
                    products.availColorIndex[i] = tempColor;
                }

        // return sorted + unavailable, nereikia objekto cia ir kitur
        return products;
    }


    productList(productType, productCollection) {
        var filteredObject = this.filterAndSort(productType, productCollection)

        var products = filteredObject.available.concat(filteredObject.unavailable),
            colorIndexes = filteredObject.availColorIndex.concat(filteredObject.unavailColorIndex)

        let i = -1;

        return products.map(curProduct => {
            i++
            let amountOfSizes = this.sumOfValues(curProduct.sizes, colorIndexes[i]);

            if (!curProduct.available[colorIndexes[i]] || !this.sumOfValues(curProduct.sizes, colorIndexes[i]))
                currentStyle = { filter: "grayscale(1) blur(1px)" }
            else
                var currentStyle = {};

            return <Product product={curProduct} color={curProduct.color[colorIndexes[i]]} style={currentStyle} index={colorIndexes[i]} amountOfSizes={amountOfSizes}></Product>
        })
    }


    render() {
        const productType = this.props.match.params.productType,
            productCollection = this.props.match.params.collection;

        return (
            <div>
                {/* breadcrumbs DEMO!!! */}
                {productType ?
                    <div>
                        {this.props.match.params.collection &&
                            <span style={{ textAlign: "left", marginTop: '0.25rem', letterSpacing: '-1.2px', marginLeft: '1rem', fontSize: "1.8rem", textTransform: 'uppercase', fontWeight: '500' }}>
                                {this.props.match.params.collection} /
                        </span>}

                        <span style={{ textAlign: "left", marginTop: '0.25rem', letterSpacing: '-1.2px', marginLeft: '1rem', fontSize: "1.8rem", textTransform: 'uppercase', fontWeight: 'lighter' }}>

                            {productType}

                            {/* if the product type is jeans, dont add the 's' at the end */}
                            {productType[productType.length - 1] != 's' && 's'}

                        </span>
                        <div>


                        </div>

                    </div>
                    :
                    <p style={{ textAlign: "left", marginTop: '0.25rem', letterSpacing: '-1.2px', marginLeft: '1rem', fontSize: "1.8rem", textTransform: 'uppercase', fontWeight: 'lighter' }}>
                        ALL PRODUCTS
                    </p>
                }

                <div className="centeredContainer" id="topElement" >

                    <div className="box">
                        {
                            this.state.loading ?

                                <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0' }}></p>
                                :
                                this.productList(productType, productCollection)
                        }
                    </div >
                </div >
            </div>

        )
    }
}
