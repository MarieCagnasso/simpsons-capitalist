import React, {useState} from "react";
import { Modal} from "react-bootstrap";
import {MenuItem} from "react-pro-sidebar";
import {Pallier, Product} from "../../world";
import {Services} from "../../Services";
import AngelsUpgrade from "./AngelsUpgrade";
import {GiAngelWings} from "react-icons/gi";
type agelsupgradeProps = {
    products : { "product": Product[] }
    upgrades: { "pallier": Pallier[]}
    money : number
    activeangels: number
    services : Services
    onUnlockedNotification : (msg:string,title:string)=>void
    onAngelUpgradeBuy : (bonus:number,cout:number)=>void
}
function AngelsUpgrades({products,money,services,upgrades,onUnlockedNotification,onAngelUpgradeBuy,activeangels}:agelsupgradeProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

      return (
        <>
            <span onClick={handleShow}>
                 <MenuItem icon={<GiAngelWings/>}>
                    Angel upgrade
                    </MenuItem>
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Angel upgrade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { upgrades.pallier.filter(upgrade => !upgrade.unlocked).map(u =>
                            <AngelsUpgrade key={u.name} products={products}
                                           upgrade={u} money={money} services={services}
                                           onUnlockedNotification={onUnlockedNotification} onAngelUpgradeBuy={onAngelUpgradeBuy}
                                           activeangels={activeangels}/>
                       )}
                </Modal.Body>
            </Modal>
        </>
    );
}export default AngelsUpgrades;