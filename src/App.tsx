import React, {useEffect, useState} from 'react';
import './App.css';
import {Services} from "./Services";
import {World} from "./world";
import 'react-pro-sidebar/dist/css/styles.css';
import {Col, Container, Row} from "react-bootstrap";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import { FaGithub } from "react-icons/fa";
import { FcManager, FcUnlock} from "react-icons/fc";
import { GiAngelWings} from "react-icons/gi";
import {BsCashCoin} from "react-icons/bs";
import ProductComponent from "./components/Product";
import SideBar from "./components/SideBar";


function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())

    useEffect(() => {
        let services = new Services('marie')
        setServices(services)
        services.getWorld().then(response => {
                setWorld(response.data)
            }
        )
    }, [])


    return (

        <div className="App">
            <SideBar wordName={world.name}/>

            <Container fluid>
                <Row>
                    <Col>
                        <ProductComponent prod={ world.products.product[0] } services={ services }/>
                    </Col>
                    <Col>
                        <ProductComponent prod={ world.products.product[1] } services={ services }/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProductComponent prod={ world.products.product[2] } services={ services }/>
                    </Col>
                    <Col>
                        <ProductComponent prod={ world.products.product[3] } services={ services }/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProductComponent prod={ world.products.product[4] } services={ services }/>
                    </Col>
                    <Col>
                        <ProductComponent prod={ world.products.product[5] } services={ services }/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
