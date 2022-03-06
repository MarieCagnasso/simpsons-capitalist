import {Pallier, Product} from "../../world";
import {Button, Col, Row} from "react-bootstrap";
import {Services} from "../../Services";
import '../../style/manager.css'

type UnlockProps = {
    unlock : Pallier
    services : Services
}

function Unlock({unlock,services}:UnlockProps){
return(
    <Row>
        <Col><img className={"imgManager"} src={services.server+unlock.logo}></img></Col>
        <Col><p>{unlock.name}</p><p>{unlock.seuil}</p></Col>
    </Row>
)
}
export default Unlock;