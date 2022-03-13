import React, {useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {FcUnlock} from "react-icons/fc";
import {Pallier, Product} from "../../world";
import {Services} from "../../Services";
import Unlock from "./Unlock";
type UnlocksProps = {
    products : { "product": Product[] }
    services : Services
    allunlocks:{ "pallier": Pallier[]}
}
function Unlocks({products,services,allunlocks}:UnlocksProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    function unlockProd(p:Product){
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
                    {products.product.map(p => unlockProd(p))}
                    {allunlocks.pallier.filter(u => !u.unlocked).map(u => <Unlock key={u.name} unlock={u} services={services}/>)}
                    </Modal.Body>
            </Modal>
        </>


    );
}

export default Unlocks;