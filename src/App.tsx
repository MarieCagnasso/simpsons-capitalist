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


function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())

// SIDEBAR
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsedSidebar = () => {
        if (collapsed) {
            setCollapsed(false)
        } else {
            setCollapsed(true)

        }
    };

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
{/*---------------------------------SIDEBAR---------------------------------*/}
            <ProSidebar
                collapsed={collapsed}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleCollapsedSidebar()}
                    >
                        {world.name}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FcUnlock/>}>Unlock</MenuItem>
                        <MenuItem icon={<BsCashCoin/>}> Cash upgrade</MenuItem>
                        <MenuItem icon={<GiAngelWings/>}> Angel upgrade</MenuItem>
                        <MenuItem icon={<FcManager/>}> Manager</MenuItem>
                        <MenuItem icon={<GiAngelWings/>}> Angel</MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{textAlign: 'center'}}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/MarieCagnasso/simpsons-capitalist"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub/>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
{/*/!*---------------------------------END SIDEBAR---------------------------------*!/*/}
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
