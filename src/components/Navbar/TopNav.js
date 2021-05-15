import React, { useState, useEffect, memo } from "react";
import "./Navbar.css";
import logoText from "../../assets/logo/logoText.svg";
import logo from "../../assets/logo/logo2.svg";
import { useDispatch, useSelector } from "react-redux";
import { RESET, CLOSE_SIGN_IN_FORM } from "../../store/slices/AuthSlice";

import { Layout, Menu, Button, Drawer } from "antd";
import { NavLink } from "react-router-dom";
import SignUpService from "../../pages/SignUp/SignUpService";
import SignInService from "../../pages/SignIn/SignInService";
import UserProfile from "../../pages/Profile/UserProfile/UserProfile";

const { SubMenu } = Menu;
const { Header } = Layout;
const MenuItemGroup = Menu.ItemGroup;





function TopNav() {
    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = useState(false);
    const [isVisibleProfileDrawer, setIsVisibleProfileDrawer] = useState(false);

    // handle open close modal SignIn SignUp
    useEffect(() => {
        switch (authState[0]) {
            case "closeSignUp":
                setIsModalVisibleSignUp(false);
                dispatch(RESET());
                break;

            case "closeSignIn":
                setIsModalVisibleSignIn(false);
                dispatch(RESET());
                break;

            case "openSignUpFromSignIn":
                setIsModalVisibleSignUp(true);

                setTimeout(() => {
                    dispatch(CLOSE_SIGN_IN_FORM("closeSignIn"));
                }, 300);
                break;

            case "closeSignInAndRedirectToSignUp":
                if (authState.includes("closeSignIn")) {
                    dispatch(RESET());
                    setIsModalVisibleSignIn(false);
                }
                break;

            default:
                break;
        }
    }, [authState]);

    const showDrawer = () => {
        setState(true);
    };

    const onClose = () => {
        setState(false);
    };

    const openSignUpModal = () => {
        setIsModalVisibleSignUp(true);
    };

    const openSignInModal = () => {
        setIsModalVisibleSignIn(true);
    };

    const openProfileDrawer = () => {
        setIsVisibleProfileDrawer(true);
    }

    const closeProfileDrawer = (state) => {
        setIsVisibleProfileDrawer(state);
    }

    const renderLeft = () => {
        return (
            <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="mail">
                    <NavLink to="">Home</NavLink>
                </Menu.Item>
                <SubMenu title="Blogs" >
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="profile" onClick={() => openProfileDrawer()}>
                    Profile
                </Menu.Item>
            </Menu>
        );
    };

    const renderRight = () => {
        return (
            <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="openSignIn" onClick={() => openSignInModal()}>
                    Signin
                </Menu.Item>
                <Menu.Item key="openSignUp" onClick={() => openSignUpModal()}>
                    Signup
                </Menu.Item>
            </Menu>
        );
    };

    const renderMenu = () => {
        return (
            <nav className="menuBar">
                <img className="logo" src={logoText} alt="" />
                <div className="menuCon">
                    <div className="leftMenu">{renderLeft()}</div>
                    <div className="rightMenu">{renderRight()}</div>
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
        );
    };

    return (
        <Header className="header-nav">
            {renderMenu()}
            {isModalVisibleSignUp ? <SignUpService /> : ""}
            {isModalVisibleSignIn ? <SignInService /> : ""}
            {isVisibleProfileDrawer ? <UserProfile visible={isVisibleProfileDrawer} closeProfileDrawer={(state) => closeProfileDrawer(state)} /> : ""}
        </Header>
    );
}

export default memo(TopNav)