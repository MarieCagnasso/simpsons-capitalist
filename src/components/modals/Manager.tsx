import {Pallier, Product} from "../../world";
import {Button, Col, Row} from "react-bootstrap";
import {Services} from "../../Services";
import '../../style/manager.css'

type ManagerProps = {
    manager : Pallier
    products : { "product": Product[] }
    money : Number
    services : Services
}
function Manager({manager,products,money,services}:ManagerProps){
return(
    <Row>
        <Col><img className={"imgManager"} src={services.server+manager.logo}></img></Col>
        <Col><p>{manager.name}</p><p>{products.product[manager.idcible-1].name}</p><p>{manager.seuil}</p></Col>
        <Col><Button disabled={money < manager.seuil}> Hire !</Button> </Col>
    </Row>
)
}
export default Manager;