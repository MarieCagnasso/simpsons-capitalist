import {Pallier, Product} from "../../world";
import {Button, Col, Row} from "react-bootstrap";
import {Services} from "../../Services";
import '../../style/manager.css'
import {transform} from "../../App";
import React from "react";

type ManagerProps = {
    manager : Pallier
    products : { "product": Product[] }
    money : number
    services : Services
    onHireManager:(money:number,product:Product)=>void
}

function Manager({manager,products,money,services,onHireManager}:ManagerProps){
    const hireManager = () => {
        if (money >= manager.seuil){
            money-=manager.seuil
            manager.unlocked = true
            products.product[manager.idcible-1].managerUnlocked = true
            onHireManager(money,products.product[manager.idcible-1])
            services.putManager(manager)
        }
    }


return(
    <Row>
        <Col><img className={"imgManager"} src={services.server+manager.logo}></img></Col>
        <Col><p>{manager.name}</p><p>{products.product[manager.idcible-1].name}</p>
            <p>$<span dangerouslySetInnerHTML={{__html: transform(manager.seuil)}}/></p></Col>
        <Col><Button disabled={money < manager.seuil} onClick={hireManager}> Hire !</Button> </Col>
    </Row>
)
}
export default Manager;