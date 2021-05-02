import React, { useState, useEffect } from 'react';


import "./Navbar.css"
import logoText from "../../assets/logo/logoText.svg"
import logo from "../../assets/logo/logo2.svg"
import { useDispatch, useSelector } from 'react-redux';
import { RESET } from '../../store/slices/stuffsSlice';

import { Layout, Menu, Button, Drawer } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import SignUpService from '../../pages/SignUp/SignUpService';
import SignInService from '../../pages/SignIn/SignInService';

const { SubMenu } = Menu;
const { Header } = Layout;
const MenuItemGroup = Menu.ItemGroup;


export default function TopNav() {
    const stuffsState = useSelector(state => state.stuffsSlice);
    const dispatch = useDispatch();
    const [state, setState] = useState(false)
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = useState(false);


    useEffect(() => {
        if (stuffsState[0] === "closeSignUp") {
            setIsModalVisibleSignUp(false)
            dispatch(RESET())
        } else if (stuffsState[0] === "closeSignIn") {
            setIsModalVisibleSignIn(false)
            dispatch(RESET())
        }
    }, [stuffsState])



    const showDrawer = () => {
        setState(true)
    };

    const onClose = () => {
        setState(false)
    };

    const openSignUpModal = () => {
        setIsModalVisibleSignUp(true);
    }

    const openSignInModal = () => {
        setIsModalVisibleSignIn(true);
    }


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
                <Menu.Item key="openSignIn" onClick={() => openSignInModal()}>
                    Signin
                </Menu.Item>
                <Menu.Item key="openSignUp" onClick={() => openSignUpModal()}>
                    Signup
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
                        visible={state}
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
            {isModalVisibleSignUp
                ? <SignUpService />
                : ""
            }
            {isModalVisibleSignIn
                ? <SignInService />
                : ""
            }
        </Header>
    )
}
