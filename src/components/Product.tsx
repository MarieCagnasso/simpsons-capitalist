import {Services} from "../Services";
import {Pallier, Product} from "../world";
import '../style/product.css';
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import ProgressBar from "./ProgressBar";
import unlock from "./modals/Unlock";
import {transform, transformTime} from "../App";

type ProductProps = {
    prod: Product,
    onProductionDone: (product: Product) => void,
    onProductBuy:(qt: number, product: Product) =>void
    services: Services,
    qtmulti : String,
    wordmoney : number,
    onUnlockedNotification : (msg:string,title:string)=>void
    allUnlock : { "pallier": Pallier[]}
    onAllUnlock : (unlock : Pallier)=>void
}

function ProductComponent({ prod,onProductionDone,onProductBuy, services,qtmulti,wordmoney,onUnlockedNotification,allUnlock,onAllUnlock} : ProductProps) {
    const [progress, setProgress] = useState(0)
    const [qtmultiNumber, setqtmultiNumber] = useState(0)
    const [qtexPrice, setQtexPrice] = useState(0)
    const [revenu, setRevenu] = useState(prod.revenu)
    const [vitesse, setVitesse] = useState(prod.vitesse)

    const startFabrication= () => {
        if (prod.quantite>0){
            prod.timeleft = prod.vitesse;
            prod.lastupdate = Date.now();
        }
    }
    const calcScore=()=>{
        if (prod.timeleft!==0 || prod.managerUnlocked){
            prod.timeleft-=(Date.now()- prod.lastupdate);
            prod.lastupdate = Date.now()
            if (prod.timeleft<=0){
                prod.timeleft = 0;
                setProgress( 0);
                setVitesse(prod.vitesse)
                onProductionDone(prod);
                if (prod.managerUnlocked) startFabrication();
            }else {
                if (prod.vitesse<1000){
                    setProgress(100)
                }else {
                    setProgress( ((prod.vitesse - prod.timeleft)/prod.vitesse)*100)
                }
                setVitesse(prod.timeleft)
            }
        }
    }

    const calcMaxCanBuy = () => {
      if (qtmulti==="Max") setqtmultiNumber(Math.floor(Math.log(1 - wordmoney * (1 - prod.croissance) / prod.cout) / Math.log(prod.croissance)))
      else setqtmultiNumber(Number(qtmulti))
    }
    useEffect(()=>{
        calcMaxCanBuy()
        let cout=0;
        for(let i=0;i<(qtmultiNumber);i++){
            cout=cout+prod.cout*Math.pow(prod.croissance,i);
        }
        setQtexPrice(cout);
    })

    const buyProduct = () => {
        if (qtexPrice<=wordmoney && qtexPrice>0){
            prod.quantite+=qtmultiNumber
            prod.cout = prod.cout*Math.pow(prod.croissance, qtmultiNumber)
            setRevenu(prod.revenu*prod.quantite)
            calcMaxCanBuy()
            onProductBuy(qtexPrice,prod)

            prod.palliers.pallier.filter(unlock => !unlock.unlocked).map(unlock=>{
                    if (unlock.seuil<=prod.quantite){
                        unlock.unlocked = true
                        if (unlock.typeratio=='VITESSE'||unlock.typeratio=='vitesse'){
                            prod.vitesse /= unlock.ratio
                            prod.timeleft /= unlock.ratio
                        }
                        if (unlock.typeratio=='GAIN'||unlock.typeratio=='gain'){
                            prod.revenu *= unlock.ratio
                        }
                        onUnlockedNotification(prod.name + " " + unlock.typeratio +" x"+unlock.ratio,'Unlocked')
                    }
                }
            )
            allUnlock.pallier.filter(p => !p.unlocked).map(unlock => {
                if (unlock.seuil<=prod.quantite) onAllUnlock(unlock)
            })
        }
    }

    useEffect(()=>setRevenu(prod.revenu*prod.quantite))
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
                        <ProgressBar transitionDuration={"0.1s"} customLabel= {revenu.toString()} completed={progress} />
                    </Col>
                    <Col className="boxlabelproduct me-1" onClick={buyProduct}>
                        {qtmultiNumber} <span dangerouslySetInnerHTML={{__html: transform(qtexPrice)}}/>
                    </Col>
                    <Col xs={3} className="boxlabelproduct">
                        <span dangerouslySetInnerHTML={{__html: transformTime(vitesse)}}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ProductComponent;