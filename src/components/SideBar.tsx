import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {BsCashCoin} from "react-icons/bs";
import {GiAngelWings} from "react-icons/gi";
import {FaGithub} from "react-icons/fa";
import React, {useState} from "react";
import Managers from "./modals/Managers";
import {Pallier, Product} from "../world";
import {Services} from "../Services";
import Unlocks from "./modals/Unlocks";

type SideBarProps = {
    wordName: String
    managers : { "pallier": Pallier[]}
    products : { "product": Product[] }
    money : number
    services : Services
    onHireManager:(money:number,product:Product)=>void
    allunlocks : { "pallier": Pallier[]}
}
function SideBar({wordName, managers,products,money,services,onHireManager,allunlocks}:SideBarProps){
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
                    {wordName}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <Unlocks products={products} services={services} allunlocks={allunlocks}/>
                    <MenuItem icon={<BsCashCoin/>}> Cash upgrade</MenuItem>
                    <MenuItem icon={<GiAngelWings/>}> Angel upgrade</MenuItem>
                    <Managers managers={managers} products={products} money={money} services={services} onHireManager={onHireManager}/>
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
    );
}
export default SideBar;
