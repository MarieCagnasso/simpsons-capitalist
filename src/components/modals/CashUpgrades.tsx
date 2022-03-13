import React, {useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {Pallier, Product} from "../../world";
import {Services} from "../../Services";
import {BsCashCoin} from "react-icons/bs";
import Cashupgrade from "./Cashupgrade";
type cashUpgradeProps = {
    products : { "product": Product[] }
    upgrades: { "pallier": Pallier[]}
    money : number
    services : Services
    onUnlockedNotification : (msg:string,title:string)=>void
    onCashUpgradeBuy : (money:number)=>void
}
function CashUpgrades({products,money,services,upgrades,onUnlockedNotification,onCashUpgradeBuy}:cashUpgradeProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <span onClick={handleShow}>
                <MenuItem icon={<BsCashCoin/>}>
                    Cash upgrade
                </MenuItem>
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Boots your investments !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {upgrades.pallier.filter(upgrade => !upgrade.unlocked).map(u =>
                        <Cashupgrade key={u.name} products={products}
                                     upgrade={u} money={money} services={services}
                                     onUnlockedNotification={onUnlockedNotification} onCashUpgradeBuy={onCashUpgradeBuy}/>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}export default CashUpgrades;