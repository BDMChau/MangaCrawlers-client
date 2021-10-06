import React, { useState, useEffect, memo, useRef } from "react";
import "./Navbar.css";
import logoText from "../../assets/logo/logoText.svg";
import logo from "../../assets/logo/logo2.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { RESET, CLOSE_SIGN_IN_FORM } from "../../store/features/auth/AuthSlice";

import { Layout, Menu, Button, Drawer } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import SignUpService from "../../pages/Auth/SignUp/SignUpService";
import SignInService from "../../pages/Auth/SignIn/SignInService";

import UserProfileService from "../../pages/User/UserProfile/UserProfileService";
import { socketActions } from "socket/socketClient";
import NotificationService from "./notification/NotificationService";


const { SubMenu } = Menu;
const { Header } = Layout;


function TopNav({ handleLogOut, genres }) {
    const authState = useSelector((state) => state.authState);
    const userState = useSelector((state) => state.userState);
    const [isUserSignIn, setIsUserSignIn] = useState(false);

    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = useState(false);
    const [isVisibleProfileDrawer, setIsVisibleProfileDrawer] = useState(false);
    const history = useHistory(false);


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
            case "closeSignUpAndRedirectToSignIn":
                if (authState.includes("closeSignIn")) {
                    dispatch(RESET());
                    setIsModalVisibleSignUp(false);
                }
                break;

            default:
                break;
        }
    }, [authState]);



    useEffect(() => {
        if (userState[0]) {
            setIsUserSignIn(true);
            socketActions.updateSocketId(userState[0].user_id)
        } else {
            setIsUserSignIn(false);
        }
    }, [userState[0]])

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



    const renderGenresDropDown = () => (
        genres
            ? genres.map((genre, i) => (
                <Menu.Item
                    title="Genres of Manga"
                    key={i}
                    title={genre.genre_name}
                    style={{
                        color: genre.genre_color,
                        width: window.innerWidth >= 375 && window.innerWidth <= 414 ? "100%" : "170px",
                        borderRadius: "3px"
                    }} >
                    <NavLink to={`/manga/genre/tag?v=${genre.genre_id}`} style={{ color: genre.genre_color }}>{genre.genre_name}</NavLink>
                </Menu.Item>
            ))
            : ""
    )

    const RenderLeft = ({ isMobile }) => {
        return (
            <Menu mode={isMobile ? "vertical" : "horizontal"} triggerSubMenuAction={isMobile ? 'click' : 'hover'} className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="Home" title="Home">
                    <NavLink to="">Home</NavLink>
                </Menu.Item>
                <SubMenu
                    title="Genres"
                    popupClassName="list-genres-dropdown"
                    children={renderGenresDropDown()}
                />
            </Menu>
        );
    };


    const renderAccountDropDown = (isMobile) => (
        <>
            {isMobile ? <NotificationService isMobile={isMobile} /> : ""}
            <Menu.Item key="profile" onClick={() => openProfileDrawer()} icon={<UserOutlined style={{ fontSize: "18px" }} />} title="Profile">
                Profile
            </Menu.Item>
            <Menu.Item key="logOut" icon={<LogoutOutlined style={{ fontSize: "18px" }} />} onClick={() => handleLogOut()} title="Log out">
                Log out
            </Menu.Item>
        </>

    )

    const RenderRight = ({ isMobile }) => (
        isUserSignIn
            ? <Menu
                mode={isMobile ? "vertical" : "horizontal"}
                triggerSubMenuAction='click'
                className="menu-left"
                style={{ background: "transparent" }}
            >
                {isMobile
                    ? <>
                        <SubMenu
                            title="Account"
                            popupClassName="list-account-dropdown"
                            children={renderAccountDropDown(isMobile)}
                        />
                    </>
                    : <>
                        <NotificationService />
                        <SubMenu
                            title="Account"
                            popupClassName="list-account-dropdown"
                            children={renderAccountDropDown(false)}
                        />
                    </>
                }
            </Menu>

            : <Menu mode={isMobile ? "vertical" : "horizontal"} className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="openSignIn" onClick={() => openSignInModal()} title="Sign in" >
                    Signin
                </Menu.Item>
                <Menu.Item key="openSignUp" onClick={() => openSignUpModal()} title="Register">
                    Register
                </Menu.Item>
            </Menu>
    );

    const renderMenu = () => {
        return (
            <nav className="menuBar">
                <img className="logo" src={logoText} alt="" onClick={() => history.push("/")} style={{ cursor: "pointer" }} />
                <div className="menuCon">
                    <div className="leftMenu"><RenderLeft /></div>
                    <div className="rightMenu"><RenderRight /></div>

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
                        <RenderLeft isMobile={true} />
                        <RenderRight isMobile={true} />
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
            {isVisibleProfileDrawer ? <UserProfileService visible={isVisibleProfileDrawer} closeProfileDrawer={(state) => closeProfileDrawer(state)} /> : ""}
        </Header>
    );
}

export default memo(TopNav)