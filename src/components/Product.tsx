import {Services} from "../Services";
import {Product} from "../world";
import '../style/product.css';
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import ProgressBar from "./ProgressBar";

type ProductProps = {
    prod: Product,
    onProductionDone: (product: Product) => void,
    services: Services,
    qtmulti : String,
    wordmoney : number,
}

function ProductComponent({ prod,onProductionDone, services,qtmulti,wordmoney } : ProductProps) {
    const [progress, setProgress] = useState(0)
    const [qte, setQte] = useState(0)

    const startFabrication= () => {
        prod.timeleft = prod.vitesse;
        prod.lastupdate = Date.now();
    }
    const calcScore=()=>{
        if (prod.timeleft!==0){
            prod.timeleft-=(Date.now()- prod.lastupdate);
            prod.lastupdate = Date.now()
            if (prod.timeleft<=0){
                prod.timeleft = 0;
                setProgress( 0);
                onProductionDone(prod);
            }else {
                setProgress( ((prod.vitesse - prod.timeleft)/prod.vitesse)*100)
            }
        }
    }

    const calcMaxCanBuy = () => {
      if (qtmulti==="Max") setQte(Math.floor(Math.log(1 - wordmoney * (1 - prod.croissance) / prod.cout) / Math.log(prod.croissance)))
      else setQte(Number(qtmulti))
    }
    useEffect(()=>{
        calcMaxCanBuy()
    })

    const savedCallback = useRef(calcScore)
    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100);
        return (function cleanup() {
            if (timer) clearInterval(timer) })
    }, [])


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
                        <ProgressBar transitionDuration={"0.1s"} customLabel= {prod.revenu.toString()} completed={progress} />
                    </Col>
                    <Col className="boxlabelproduct me-1">
                        {qte} {prod.cout}
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