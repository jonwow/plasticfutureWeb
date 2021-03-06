import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import priceFormatting from '../modules/priceFormatting';




const Product = props => (
    <Link to={{
        pathname: `/products/${props.product.type}/${props.product.productCode}/${props.color}/${props.product._id}/`,
        product: props.product
    }}>

        <div style={props.style} className="product">
            <img src={require(`../../src/images/${props.product.season}/designs/${props.product.type}s/${props.product.name}/${props.product.name}-${props.color}-small.png`)}
                alt={`${props.product.name}-${props.color}-photo`} />
            <p>
                {/* product is not hidden and there are available units(amountOfSizes) */}
                {props.product.available[props.index] && props.amountOfSizes > 0 ?
                    priceFormatting(props.product.price[props.index].toFixed(2)) + props.currency[0][1]
                    :
                    "unavailable"
                }
            </p>
        </div>
    </Link >
)


export default class ProductList extends Component {
    state = { fetchedProducts: [], loading: true };


    componentDidMount() {
        axios.get("http://plasticfuture.net:5000/DBproducts/")
            .then(response => {
                this.setState({ fetchedProducts: response.data, loading: false });
            })
            .catch((error) => {
                console.log(`axios fail: GET the /DBproducts/ ${error}`);
            })
    }

    sumOfValues(values, index) {
        let sum = 0;

        // values = sizes, for example XS S M
        for (let value of Object.values(values))
            // sum += XS[1] if index 1 is for the black color
            sum += value[index];

        return sum;
    }

    filterAndSort(productType, productCollection) {
        const products = {
            available: [],
            availColorIndex: [],

            unavailable: [],
            unavailColorIndex: [],
        }

        // FILTERING
        // for every product that gets fetched from the database 
        this.state.fetchedProducts.forEach(curProduct => {
            // product season has to match the collection of the page that the client is on (for example PLASTICIDOL) or all products
            if (curProduct.season === productCollection || !productCollection)
                // product type has to match the type of the page that the client is on (tshirt, tote) or all products
                if (curProduct.type === productType || !productType)
                    // for each color of that product
                    for (let index = 0; index < curProduct.color.length; index++) {
                        // if the product in that color is public 
                        if (curProduct.public[index]) {
                            // if it is available and has any sizes available
                            if (curProduct.available[index] && this.sumOfValues(curProduct.sizes, index) > 0)
                                products.availColorIndex.push(index) && products.available.push(curProduct);
                            else
                                products.unavailColorIndex.push(index) && products.unavailable.push(curProduct);
                        }
                    }
        }
        )

        // SORTING
        for (let i = 0; i < products.available.length; i++)
            for (let j = i + 1; j < products.available.length; j++)
                // if the number in the left is bigger than the number in the right. 
                // price index = the index of that color, e.g. YesLove in black (color #2) product price index has to be 2 as well

                // ***** SORT BY PRICE ASCENDING
                // if (products.available[i].price[products.availColorIndex[i]] > products.available[j].price[products.availColorIndex[j]]) {

                // ***** SORT BY UNITS SOLD
                if (products.available[i].unitsSold[products.availColorIndex[i]] < products.available[j].unitsSold[products.availColorIndex[j]]) {
                    let temp = products.available[j],
                        tempColor = products.availColorIndex[j];


                    products.available[j] = products.available[i];
                    products.availColorIndex[j] = products.availColorIndex[i];

                    products.available[i] = temp;
                    products.availColorIndex[i] = tempColor;
                }

        // return sorted + unavailable, nereikia objekto cia ir kitur
        return products;
    }


    productList(productType, productCollection, currency) {
        const filteredObject = this.filterAndSort(productType, productCollection),
            // to sort by available first and then by unavailable
            products = filteredObject.available.concat(filteredObject.unavailable),
            colorIndexes = filteredObject.availColorIndex.concat(filteredObject.unavailColorIndex);

        let currentStyle, i = -1;


        return products.map(curProduct => {
            i++;
            const amountOfSizes = this.sumOfValues(curProduct.sizes, colorIndexes[i]);

            // if no sizes are available in that color or that product is not available
            if (!curProduct.available[colorIndexes[i]] || !this.sumOfValues(curProduct.sizes, colorIndexes[i]))
                currentStyle = { filter: "grayscale(1) blur(1px)" };
            else
                currentStyle = {};

            return <Product currency={currency} key={curProduct.productCode + curProduct.color[colorIndexes[i]]} product={curProduct} color={curProduct.color[colorIndexes[i]]} style={currentStyle} index={colorIndexes[i]} amountOfSizes={amountOfSizes} />
        })
    }

    render() {
        const productType = this.props.match.params.productType || undefined,
            collection = this.props.match.params.collection || undefined;

        let currency = [
            ['EUR', '€']
        ];


        return (
            <div className="products-container">
                {this.state.loading ? <div style={{ height: '100vh' }} /> : this.productList(productType, collection, currency)}
            </div >
        )
    }
}
