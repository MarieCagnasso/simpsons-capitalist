import React, {useEffect, useState} from 'react';
import './style/App.css';
import {Services} from "./Services";
import {World} from "./world";
import 'react-pro-sidebar/dist/css/styles.css';
import SideBar from "./components/SideBar";
import Products from "./components/Products";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";


function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())
    const [qtmulti, setqtmiltu ]= useState(1)

    const multiplicateur = () =>{
        switch (qtmulti){
            case 1:
                return  setqtmiltu(10)
            case 10:
                return  setqtmiltu(100)
            case 100:
                return  setqtmiltu(1)

        }
    }


    useEffect(() => {
        let services = new Services('marie')
        setServices(services)
        services.getWorld().then(response => {
                setWorld(response.data)
                console.log(response.data)
            }
        )
    }, [])

    return (
        <div className="App">
            <SideBar wordName={world.name} managers={world.managers} products={world.products} money={world.money} services={services}/>
            <main>
                <Container fluid className="mb-5">
                    <Row>
                        <Col>score : {world.score}</Col>
                        <Col>${world.money}</Col>
                        <Col><Button onClick={multiplicateur}>x{qtmulti}</Button></Col>
                        <Col>{services.user}</Col>
                    </Row>
                </Container>
                <Products products={world.products} services={services} qtmulti={qtmulti} wordmoney={world.money}/>
            </main>
        </div>
    );
}

export default App;
