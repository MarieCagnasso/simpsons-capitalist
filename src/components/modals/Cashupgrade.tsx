import React, {useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {Pallier, Product} from "../../world";
import {Services} from "../../Services";
import {BsCashCoin} from "react-icons/bs";
import product from "../Product";
import {transform} from "../../App";
type cashUpgradeProps = {
    products : { "product": Product[] }
    upgrade: Pallier
    money : number
    services : Services
    onUnlockedNotification : (msg:string,title:string)=>void
    onCashUpgradeBuy : (money:number)=>void
}
function CashUpgrades({products,money,services,upgrade,onUnlockedNotification,onCashUpgradeBuy}:cashUpgradeProps) {

    function addUpgrade(prod:Product){
        if (upgrade.typeratio=='VITESSE'||upgrade.typeratio=='vitesse'){
            prod.vitesse /= upgrade.ratio
            prod.timeleft /= upgrade.ratio
        }
        if (upgrade.typeratio=='GAIN'||upgrade.typeratio=='gain'){
            prod.revenu *= upgrade.ratio
        }
    }
    function buyUPgrade(){
        if (money >= upgrade.seuil){
            money-=upgrade.seuil
            upgrade.unlocked = true
            if (upgrade.idcible!=0){
                let prod = products.product.find(produit => produit.id == upgrade.idcible)
                // @ts-ignore
                addUpgrade(prod)
                // @ts-ignore
                onUnlockedNotification(prod.name + " " + upgrade.typeratio +" x"+upgrade.ratio,'Upgrade unlocked')
            }else if (upgrade.idcible==0){
                products.product.map(p=>addUpgrade(p))
                onUnlockedNotification( "All product" + upgrade.typeratio +" x"+upgrade.ratio,'Upgrade unlocked')
            }
            services.putUpgrade(upgrade)
        }
        onCashUpgradeBuy(money)
    }
    function productCible(){
        if (upgrade.idcible==0)return "All product"
        else return products.product.find(produit => produit.id == upgrade.idcible)?.name
    }

    return (
        <Row>
            <Col><img className={"imgManager"} src={services.server+upgrade.logo}></img></Col>
            <Col><p>{upgrade.name}</p>
                <p>$<span dangerouslySetInnerHTML={{__html: transform(upgrade.seuil)}}/></p>
                <p>{productCible()} {upgrade.typeratio} x{upgrade.ratio}</p>
            </Col>
            <Col><Button disabled={money < upgrade.seuil} onClick={buyUPgrade}> Buy !</Button> </Col>
        </Row>
    );
}export default CashUpgrades;