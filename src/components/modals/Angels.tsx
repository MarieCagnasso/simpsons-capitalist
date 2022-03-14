import {MenuItem} from "react-pro-sidebar";
import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {GiAngelWings} from "react-icons/gi";
import {Services} from "../../Services";

type angelsProps={
    totalangels: number
    activeangels: number
    angelbonus: number
    score:number
    services:Services
}
function Angels({totalangels,activeangels,angelbonus,score,services}:angelsProps){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [anglesNext,setAgelsNext] = useState(Math.round(150*Math.sqrt(score/Math.pow(10,15))-totalangels))
    useEffect(()=>setAgelsNext(Math.round(150*Math.sqrt(score/Math.pow(10,15))-totalangels)))

    function addAngles(){
        services.deleteWord()
        window.location.reload()
    }
    return (
        <>
            <span onClick={handleShow}>
                <MenuItem icon={<GiAngelWings/>}>
                    Angels
                </MenuItem>
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Angels investitors</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{totalangels} Total Angels</p>
                    <p>{angelbonus}% Bonus per Angels</p>
                    <p>{activeangels} actif</p>
                    <Button disabled={anglesNext==0} onClick={addAngles}>{anglesNext} angels<br/>To claim with restart</Button>
                </Modal.Body>
            </Modal>
        </>


    );
}export default Angels