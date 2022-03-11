import React, {useState} from "react";
import { Modal} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {FcManager} from "react-icons/fc";
import {Pallier, Product} from "../../world";
import Manager from "./Manager";
import {Services} from "../../Services";
type ManagersProps = {
    managers : { "pallier": Pallier[]}
    products : { "product": Product[] }
    money : Number
    services : Services
}
function Managers({managers,products,money,services}:ManagersProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <span onClick={handleShow}>
                <MenuItem icon={<FcManager/>}>
                    Managers
                </MenuItem>
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Managers make you feel better !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {managers.pallier.filter( manager => !manager.unlocked).map(
                    m =>
                        <Manager key={m.name} manager={m} products={products} money={money} services={services}/>
                    )}

                    </Modal.Body>
            </Modal>
        </>


    );
}

export default Managers;