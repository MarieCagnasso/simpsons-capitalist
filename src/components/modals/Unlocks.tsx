import React, {useState} from "react";
import { Modal} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {FcManager, FcUnlock} from "react-icons/fc";
import {Pallier, Product} from "../../world";
import Manager from "./Manager";
import {Services} from "../../Services";
import Unlock from "./Unlock";
type UnlocksProps = {
    unlocks : { "pallier": Pallier[]}
    services : Services
}
function Unlocks({unlocks,services}:UnlocksProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
                    {unlocks.pallier.filter( unlock => !unlock.unlocked).map(
                    u =>
                        <Unlock key={u.name} unlock={u} services={services}/>
                    )}

                    </Modal.Body>
            </Modal>
        </>


    );
}

export default Unlocks;