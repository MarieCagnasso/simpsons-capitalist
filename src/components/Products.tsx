import {Col, Container, Row} from "react-bootstrap";
import ProductComponent from "./Product";
import React from "react";
import {Product} from "../world";
import {Services} from "../Services";

type ProductsProps = {
    products: { "product": Product[] }
    services: Services
    qtmulti: Number
    wordmoney : Number
}

function Products({products, services, qtmulti, wordmoney}: ProductsProps) {

    return (
        <Container fluid className='listProduct'>
            <Row xs ={1} md={1} lg={2} className="g-5">
                <Col>
                    <ProductComponent prod={products.product[0]} services={services} qtmulti={qtmulti} wordmoney={wordmoney}/>
                </Col>
                <Col>
                    <ProductComponent prod={products.product[1]} services={services} qtmulti={qtmulti} wordmoney={wordmoney}/>
                </Col>
            </Row>
            <Row xs ={1} md={1} lg={2} className="g-5">
                <Col>
                    <ProductComponent prod={products.product[2]} services={services} qtmulti={qtmulti} wordmoney={wordmoney}/>
                </Col>
                <Col>
                    <ProductComponent prod={products.product[3]} services={services} qtmulti={qtmulti} wordmoney={wordmoney}/>
                </Col>
            </Row>
            <Row  xs ={1} md={1} lg={2} className="g-5">
                <Col>
                    <ProductComponent prod={products.product[4]} services={services} qtmulti={qtmulti} wordmoney={wordmoney}/>
                </Col>
                <Col>
                    <ProductComponent prod={products.product[5]} services={services} qtmulti={qtmulti} wordmoney={wordmoney}/>
                </Col>
            </Row>
        </Container>
    )
}
export default Products;