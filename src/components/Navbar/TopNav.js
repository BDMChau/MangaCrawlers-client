import React, { useState } from 'react'
import "./Navbar.css"
import logoText from "../../assets/logo/logoText.svg"
import logo from "../../assets/logo/logo2.svg"

import { Layout, Menu, Button, Drawer } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;


export default function TopNav() {
    const [state, setState] = useState({
        current: 'mail',
        visible: false
    })


    const showDrawer = () => {
        setState({ ...state, visible: true })
    };
    const onClose = () => {
        setState({ ...state, visible: false })

    };

    const renderLeft = () => {
        return (
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="mail">
                    <NavLink to="">Home</NavLink>
                </Menu.Item>
                <SubMenu title="Blogs">
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
                    <NavLink to="">Contact Us</NavLink>
                </Menu.Item>
            </Menu>
        );
    }

    const renderRight = () => {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="mail">
                    <NavLink to="">Signin</NavLink>
                </Menu.Item>
                <Menu.Item key="app">
                    <NavLink to="">Signup</NavLink>
                </Menu.Item>
            </Menu>
        )
    }


    const renderMenu = () => {
        return (
            <nav className="menuBar">
                <img className="logo" src={logoText} alt="" />
                <div className="menuCon">
                    <div className="leftMenu">
                        {renderLeft()}
                    </div>
                    <div className="rightMenu">
                        {renderRight()}
                    </div>
                    <Button className="barsMenu" onClick={showDrawer}>
                        <span className="barsBtn"></span>
                    </Button>
                    <Drawer
                        className="drawer"
                        title={<img className="logo-drawer" src={logo} alt="" />}
                        placement="right"
                        closable={true}
                        onClose={onClose}
                        visible={state.visible}
                    >
                        {renderLeft()}
                        {renderRight()}

                    </Drawer>
                </div>
            </nav>
        )
    }

    return (
        <Header className="header-nav">
            {renderMenu()}
        </Header>
    )
}
