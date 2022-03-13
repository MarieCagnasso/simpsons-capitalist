import React, {useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {Pallier, Product} from "../../world";
import {Services} from "../../Services";
import {BsCashCoin} from "react-icons/bs";
import product from "../Product";
type cashUpgradeProps = {
    products : { "product": Product[] }
    upgrade: Pallier
    activeangels: number
    services : Services
    onUnlockedNotification : (msg:string,title:string)=>void
    onAngelUpgradeBuy : (bonus:number,cout:number)=>void
}
function CashUpgrades({products,services,upgrade,onUnlockedNotification,onAngelUpgradeBuy,activeangels}:cashUpgradeProps) {

    function addUpgrade(prod:Product){
        if (upgrade.typeratio=='VITESSE'){
            prod.vitesse /= upgrade.ratio
            prod.timeleft /= upgrade.ratio
        }
        if (upgrade.typeratio=='GAIN'){
            prod.revenu *= upgrade.ratio
        }
    }
    function buyUPgrade(){
        if (activeangels >= upgrade.seuil){
            upgrade.unlocked = true
            if (upgrade.idcible!=0){
                if (upgrade.typeratio=='ANGE'){
                    onAngelUpgradeBuy(upgrade.ratio,upgrade.seuil)
                }
                onUnlockedNotification("Angel Effectiveness  x"+upgrade.ratio,'Angel upgrade unlocked')
            }else if (upgrade.idcible==0){
                products.product.map(p=>addUpgrade(p))
                onUnlockedNotification( "All product x"+upgrade.ratio,'Angel upgrade unlocked')
                onAngelUpgradeBuy(1,upgrade.seuil)
            }
            services.putAngelUpgrade(upgrade)
        }
    }
    function productCible(){
        if (upgrade.idcible===0)return "All product"
        else return 'Angel Effectiveness'
    }

    return (
        <Row>
            <Col><img className={"imgManager"} src={services.server+upgrade.logo}></img></Col>
            <Col><p>{upgrade.name}</p>
                <p>{upgrade.seuil} angels</p>
                <p>{productCible()} {upgrade.typeratio} x{upgrade.ratio}</p>
            </Col>
            <Col><Button disabled={activeangels<upgrade.seuil} onClick={buyUPgrade} > Buy !</Button> </Col>
        </Row>
    );
}export default CashUpgrades;