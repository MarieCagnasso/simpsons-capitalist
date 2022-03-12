import React, {useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {FcManager, FcUnlock} from "react-icons/fc";
import {Pallier, Product} from "../../world";
import Manager from "./Manager";
import {Services} from "../../Services";
import Unlock from "./Unlock";
type UnlocksProps = {
    products : { "product": Product[] }
    services : Services
}
function Unlocks({products,services}:UnlocksProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    function unlock(p:Product){
        let unlocks = p.palliers.pallier.filter(unlock => !unlock.unlocked)
        return(
            <Row>
                <Col><img className={"imgManager"} src={services.server+unlocks.at(0)?.logo}></img></Col>
                <Col><p>{unlocks.at(0)?.name}</p>
                    <p>{unlocks.at(0)?.seuil}</p>
                    <p>{p.name} {unlocks.at(0)?.typeratio} x{unlocks.at(0)?.ratio}</p>
                </Col>
            </Row>
        )
    }
    return (
        <>
            <span onClick={handleShow}>
                <MenuItem icon={<FcUnlock/>}>Unlock</MenuItem>
            </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Unlocks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {products.product.map(p => unlock(p))}
                    </Modal.Body>
            </Modal>
        </>


    );
}

export default Unlocks;