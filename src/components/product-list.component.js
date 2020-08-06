import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

let currency = '€';
const Product = props => (
    <Link to={{
        pathname: "/products/" + props.product._id + "/" + props.color,
        product: props.product
    }} >

        <div className="product">
            <img src={`${process.env.PUBLIC_URL}/images/` + props.product.season + `/designs/` + props.product.name + `/` + props.product.name + `_` + props.color + `_small.png`} />

            {/* make a proper formatting solution */}
            {props.product.price.toString().includes('.') ?
                <p>{props.product.price}</p>
                :
                <p >{props.product.price}.00{currency}</p>
            }
        </div>

    </Link >

)

export default class ProductList extends Component {
    constructor(props) {
        super(props);



        this.state = { products: [], loading: true };
    }


    componentDidMount() {
        console.log(this.state.xd);
        axios.get("http://localhost:5000/products/")
        .then(response => {
            this.setState({ products: response.data, loading: false, xd:'123' })
        console.log(this.state.xd);

                console.log(this.state.products)
            })
            .catch((error) => {
                console.log(error);

            })
    }

    productList() {
        // for every product
        return this.state.products.map(curProduct => {
            return curProduct.color.map(curColor => {
                // gives 'props.color' and 'props.product' to the Product const
                return <Product color={curColor} product={curProduct} />;
            })


        })
    }


    render() {
        return (
            <div className="centeredContainer" id="topElement">
                <div className="box">
                    {
                        this.state.loading ?
                            <p style={{ textAlign: 'center', fontSize: '100px', margin: '110px 0', paddingBottom: '370px' }}></p>
                            :
                            this.productList()
                    }
                </div>
            </div>
        )
    }
}
