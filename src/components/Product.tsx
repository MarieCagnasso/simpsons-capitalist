import {Services} from "../Services";
import {Product} from "../world";
import '../style/product.css';
import {Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import ProgressBar from "./ProgressBar";

type ProductProps = {
    prod: Product
    onProductionDone?: (product: Product) => void,
    services: Services
    lastupdate? : Number
    qtmulti : Number
    wordmoney : Number
}
// function calcScore():Number{
//     if (this.prod.timeleft!=0){
//         return prod.timeleft = Date.now()- lastupdate - prod.timeleft
//     }
//     return 0
// }
function ProductComponent({ prod,onProductionDone, services,lastupdate,qtmulti,wordmoney } : ProductProps) {
    const [progress, setProgress] = useState(0)

    const startFabrication= () => {
        prod.timeleft = prod.vitesse;
        // lastupdate = Date.now();
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 0;
                }
                return oldProgress+10;
            })
       }, 500);
    }

    return (
        <Row>
            <Col sm={3} className='colimageProduct' onClick={startFabrication}>
                <div className="imageProduct">
                    <img  src={services.server+prod.logo}/>
                </div>
                    <div className='levelProduct'>
                        {prod.quantite}
                    </div>
            </Col>
            <Col>
                <Row className="g-1 boxlabelsproduct">
                    <Col xs={12} className="boxlabelproduct">
                        <ProgressBar transitionDuration={"1s"} customLabel= {prod.revenu.toString()} completed={progress} />
                    </Col>
                    <Col className="boxlabelproduct me-1">
                        {qtmulti} {prod.cout}
                    </Col>
                    <Col xs={3} className="boxlabelproduct">
                        {prod.vitesse}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ProductComponent;