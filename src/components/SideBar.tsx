import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {FcManager, FcUnlock} from "react-icons/fc";
import {BsCashCoin} from "react-icons/bs";
import {GiAngelWings} from "react-icons/gi";
import {FaGithub} from "react-icons/fa";
import React, {useState} from "react";
import App from "../App";

type SideBarProps = {
    wordName: String
}
function SideBar({wordName}:SideBarProps){
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsedSidebar = () => {
        if (collapsed) {
            setCollapsed(false)
        } else {
            setCollapsed(true)

        }
    };
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
    );
}
export default SideBar;
