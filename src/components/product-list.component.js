import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

let currency = '€';
const Product = props => (

    <Link to={{
        pathname: "/products/" + props.product._id + "/" + props.color,
        product: props.product,
        style: props.style
    }} >

        <div style={props.style} className="product">
            <img src={`${process.env.PUBLIC_URL}/images/` + props.product.season + `/designs/` + props.product.type + 's/' + props.product.name + `/` + props.product.name + `_` + props.color + `_small.png`} />


            {/* make a proper formatting solution */}
            {props.product.available ?
                props.product.price.toString().includes('.') ?
                    <p >{props.product.price}</p>
                    :
                    <p  >{props.product.price}.00{currency}</p>

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
        document.title = 'P L A S T I C F U T U R E'

        axios.get("http://localhost:5000/products/")
            .then(response => {
                this.setState({ products: response.data, loading: false })

                console.log('sup')
            })
            .catch((error) => {
                console.log(error);

            })
    }

    productList(productType) {
        // for every product
        var array = []
        var masyvas = []
        console.log(this.state.products)
        var i = 0
        this.state.products.map(curProduct => {
            if (curProduct.public) {
                // example: plasticfuture.net/products/jeans will only display jeans type products
                // if no productType is provided, it will display all products
                if (curProduct.type == productType || productType == undefined)
                    curProduct.color.map(curColor => {
                        // gives 'props.color' and 'props.product' to the Product const

                        if (!array.includes(i)) {
                            console.log(i + 'is not in the array');
                            array.push(i)
                        }
                        console.log(curProduct.name)
                        console.log(' vis dar kepu')
                    })
            }
            console.log(array + '\n----------------------------\n')

            i++
            console.log('i yra ' + i)


        })

        // add colors to this and then start implementing the sorting
        for (var x = 0; x < array.length; x++)
            masyvas.push(this.state.products[array[x]])
        console.log(masyvas);

        // make this sorting stuff a function
        // 1 - all undefined need to go to the end (perhaps a new array and then make a new one from 2 old arrays)
        var unavailableProducts = [],
            availableProducts = []

        for (i in masyvas)
            !masyvas[i].available ?
                unavailableProducts.push(masyvas[i])
                :
                availableProducts.push(masyvas[i])
        



        console.log((unavailableProducts));
        console.log((availableProducts));
        var masyvas = availableProducts.concat(unavailableProducts)
        // 2- sorting



        console.log(this.state.products)
        return masyvas.map(curProduct => {
            // if NOT in stock or ready to be sold
            if (!curProduct.available)
                currentStyle = { filter: "grayscale(1) blur(1px)" }
            else
                var currentStyle = {};

            return curProduct.color.map(curColor => {
                return <Product product={curProduct} color={curColor} style={currentStyle} />
            })

        })
    }


    render() {
        const productType = this.props.match.params.productType;

        return (

            <div className="centeredContainer" id="topElement" >
                {productType && <p style={{ textAlign: "left", marginLeft: '3rem', fontSize: "4rem" }}> {productType}

                    {/* if the product type is jeans, dont add the 's' at the end */}
                    {productType[productType.length - 1] != 's' && 's'}

                </p>}
                < div className="box" >
                    {
                        this.state.loading ?

                            <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0', paddingBottom: '100vh' }}></p>
                            :
                            this.productList(productType)
                    }
                </div >
            </div >
        )
    }
}
