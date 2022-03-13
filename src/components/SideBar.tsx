import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {GiAngelWings} from "react-icons/gi";
import {FaGithub} from "react-icons/fa";
import React, {useState} from "react";
import Managers from "./modals/Managers";
import {Pallier, Product, World} from "../world";
import {Services} from "../Services";
import Unlocks from "./modals/Unlocks";
import CashUpgrades from "./modals/CashUpgrades";
import Angels from "./modals/Angels";
import AngelsUpgrades from "./modals/AngelsUpgrades";

type SideBarProps = {
    services : Services
    world:World
    onHireManager:(money:number,product:Product)=>void
    onUnlockedNotification : (msg:string,title:string)=>void
    onCashUpgradeBuy : (money:number)=>void
    onAngelUpgradeBuy : (bonus:number,cout:number)=>void
}
function SideBar({services,onHireManager,world,onUnlockedNotification,onCashUpgradeBuy,onAngelUpgradeBuy}:SideBarProps){
    const [collapsed, setCollapsed] = useState(true);
    const handleCollapsedSidebar = () => {
        if (collapsed) {
            setCollapsed(false)
        } else {
            setCollapsed(true)

        }
    };
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return(
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
                    <Unlocks products={world.products} services={services} allunlocks={world.allunlocks}/>
                    <CashUpgrades products={world.products} upgrades={world.upgrades} money={world.money}
                                    services={services} onUnlockedNotification={onUnlockedNotification} onCashUpgradeBuy={onCashUpgradeBuy}/>
                    <AngelsUpgrades products={world.products} upgrades={world.angelupgrades} services={services}
                                    onUnlockedNotification={onUnlockedNotification} onAngelUpgradeBuy={onAngelUpgradeBuy}
                                    activeangels={world.activeangels}/>
                    <Managers managers={world.managers} products={world.products} money={world.money} services={services} onHireManager={onHireManager}/>
                    <Angels totalangels={world.totalangels} activeangels={world.activeangels} angelbonus={world.angelbonus}
                            score={world.score} services={services}/>
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
    );
}export default SideBar;