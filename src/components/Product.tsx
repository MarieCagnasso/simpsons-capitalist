import {Services} from "../Services";
import {Product} from "../world";
import '../style/product.css';
import {Col, Row} from "react-bootstrap";

type ProductProps = {
    prod: Product
    services: Services
}
function ProductComponent({ prod, services } : ProductProps) {
    return (
        <Row>
            <Col md={3} >
                <div className="imageProduct">
                    <img  src={services.server+prod.logo}/>
                </div>
            </Col>
            <Col>
                <Row className="g-1">
                    <Col md={12} className="boxlabelproduct">
                        {prod.name}
                        {prod.croissance}
                    </Col>
                    <Col className="boxlabelproduct me-1">
                        {prod.name}
                        {prod.croissance}
                    </Col>
                    <Col className="boxlabelproduct">
                        {prod.name}
                        {prod.croissance}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ProductComponent;

