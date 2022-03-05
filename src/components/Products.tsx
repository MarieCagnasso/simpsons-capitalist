import {Col, Container, Row} from "react-bootstrap";
import ProductComponent from "./Product";
import React from "react";
import {Product} from "../world";
import {Services} from "../Services";

type ProductsProps = {
    products: { "product": Product[] }
    services: Services
}

function Products({products, services}: ProductsProps) {

    return (
        <Container fluid>
            <Row className="g-5">
                <Col>
                    <ProductComponent prod={products.product[0]} services={services}/>
                </Col>
                <Col>
                    <ProductComponent prod={products.product[1]} services={services}/>
                </Col>
            </Row>
            <Row className="g-5">
                <Col>
                    <ProductComponent prod={products.product[2]} services={services}/>
                </Col>
                <Col>
                    <ProductComponent prod={products.product[3]} services={services}/>
                </Col>
            </Row>
            <Row className="g-5">
                <Col>
                    <ProductComponent prod={products.product[4]} services={services}/>
                </Col>
                <Col>
                    <ProductComponent prod={products.product[5]} services={services}/>
                </Col>
            </Row>
        </Container>
    )
}
export default Products;