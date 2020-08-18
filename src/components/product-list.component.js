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

                console.log(this.state.products)
            })
            .catch((error) => {
                console.log(error);

            })
    }

    productList(productType) {
        var currentStyle = {
            
        };

        // for every product
        return this.state.products.map(curProduct => {
            if (curProduct.public) {
                // if NOT in stock or ready to be sold
                if (!curProduct.available) {
                    currentStyle = {
                        filter: "grayscale(1) blur(1px)"
                    }
                }
                else {
                    currentStyle = {
                    }
                }
                // example: plasticfuture.net/products/jeans will only display jeans type products
                if (curProduct.type == productType) {
                    return curProduct.color.map(curColor => {
                        // gives 'props.color' and 'props.product' to the Product const
                        return <Product style={currentStyle} color={curColor} product={curProduct} />;
                    })
                }
                // if no productType is provided, it will display all products
                else if (productType == undefined) {
                    return curProduct.color.map(curColor => {
                        // gives 'props.color' and 'props.product' to the Product const
                        return <Product style={currentStyle} color={curColor} product={curProduct} />;
                    })
                }

            }


        })
    }


    render() {
        const productType = this.props.match.params.productType;

        return (

            <div className="centeredContainer" id="topElement">
                {productType && <p style={{ textAlign: "left", marginLeft: '3rem', fontSize: "4rem" }}> {productType}

                    {/* if the product type is jeans, dont add the 's' at the end */}
                    {productType[productType.length - 1] != 's' && 's'}

                </p>}
                <div className="box">
                    {
                        this.state.loading ?

                            <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0', paddingBottom: '370px' }}></p>
                            :
                            this.productList(productType)
                    }
                </div>
            </div>
        )
    }
}
