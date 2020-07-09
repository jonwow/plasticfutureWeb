import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

let currency = '€';
const Product = props => (
    // {/* product code be pf_ */}
    // link = /item/designName_productCode
    // debug viska ir su chrome console (i notes)
    // colors[4] > stringSpalva xszs x m l
    // color[3].xs
    // copy json post teksta i faila 
    // gal viska nuo 1 skaiciuot nes database ir nenerdai naudosis.NE, supazindint su sistema juos. pf bus ir nevien designer
    // orderby irgi masyvas, nes gal juoda t shirt pries balta noriu. padaryt database documentationa su reasoning ir tt
    // website vulnerability n security checklist
    // pf investing part - shows a detailed graph thats updated every second of the stocks you are following
    // <Link to={"/products/" + props.product.name + '-' + props.product.productCode} color={props.color}>
    <Link to={"/products/" + props.product._id+"/"+props.color}>
        {/* failu pavadinimuose spalvos turi but mazos. */}
        {console.log(props.product.color.length)}

        <div className="product">
            <img src={`${process.env.PUBLIC_URL}/images/` + props.product.season + `/designs/` + props.product.name + `/` + props.product.name + `_` + props.color + `_small.png`} />

{/* make a proper formatting solution */}
            <p>{props.product.price}.00{currency}</p>
        </div>

    </Link>

)

export default class ProductList extends Component {
    constructor(props) {
        super(props);



        this.state = { products: [] };
    }


    componentDidMount() {
        axios.get("http://localhost:5000/products/")
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch((error) => {
                console.log(error);

            })
    }
    // pfe cto ir cio

    productList() {
        // for every product
        return this.state.products.map(curProduct => {
            // for every color of the product
            // if(curProduct.color.length >1) { perdaryt sita eilute kad tiems produktams, kurie yra
            return curProduct.color.map(curColor => {
                // gives 'props.color' and 'props.product' to the Product const
                return <Product color={curColor} product={curProduct}  />;
            })
        })
    }


    render() {
        return (
            <div className="centeredContainer" id="topElement">
                <div className="box">
                    {this.productList()}
                    {this.productList()}
                </div>
            </div>
        )
    }
}
