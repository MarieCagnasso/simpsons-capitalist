import React, {useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {Pallier, Product} from "../../world";
import {Services} from "../../Services";
import {BsCashCoin} from "react-icons/bs";
type cashUpgradeProps = {
    products : { "product": Product[] }
    upgrades: { "pallier": Pallier[]}
    money : number
    services : Services
}
function CashUpgrade({products,money,services,upgrades}:cashUpgradeProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    function buyUPgrade(){}

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
                        <Row>
                            <Col><img className={"imgManager"} src={services.server+u.logo}></img></Col>
                            <Col><p>{u.name}</p>
                                <p>{u.seuil}$</p>
                                <p>{products.product.find(produit => produit.id == u.idcible)?.name} {u.typeratio} x{u.ratio}</p>
                            </Col>
                            <Col><Button disabled={money < u.seuil} onClick={buyUPgrade}> Buy !</Button> </Col>
                        </Row>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}export default CashUpgrade;