import React, { useState, useEffect, memo, useRef } from "react";
import "./Navbar.css";
import logoText from "../../assets/logo/logoText.svg";
import logo from "../../assets/logo/logo2.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { RESET, CLOSE_SIGN_IN_FORM } from "../../store/features/auth/AuthSlice";

import { Layout, Menu, Button, Drawer, Badge, Popover, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import SignUpService from "../../pages/Auth/SignUp/SignUpService";
import SignInService from "../../pages/Auth/SignIn/SignInService";

import UserProfileService from "../../pages/User/UserProfile/UserProfileService";
import { socketActions } from "socket/socketClient";
import Notification from "./notification/Notification";


const { SubMenu } = Menu;
const { Header } = Layout;


function TopNav({ handleLogOut, genres, notifications, getListNotifications, isEnd }) {
    const authState = useSelector((state) => state.authState);
    const userState = useSelector((state) => state.userState);
    const [isUserSignIn, setIsUserSignIn] = useState(false);

    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
    const [isModalVisibleSignIn, setIsModalVisibleSignIn] = useState(false);
    const [isVisibleProfileDrawer, setIsVisibleProfileDrawer] = useState(false);
    const history = useHistory(false);

    // notification form
    const [visible, setVisible] = useState(false);

    const scrollRef = useRef(null);

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


    ////////// scroll //////////
    useEffect(() => {
        let myRef = scrollRef.current;

        if (myRef) {
            const currentScroll = myRef.scrollTop + myRef.clientHeight;

            // when first loading
            myRef.scrollTop = 0;
        }
    })

    const getMoreHistoryNotifications = async (e) => {
        const bottom = e.target.scrollHeight - e.target.clientHeight;

        if (e.target.scrollTop === bottom) {
            console.log("ascac")
            let myRef = scrollRef.current;

            await getListNotifications();

            if (!isEnd) {
                myRef.scrollTop = bottom;
            }
        }
    }



    const renderGenresDropDown = () => (
        genres
            ? genres.map((genre, i) => (
                <Menu.Item
                    key={i}
                    title={genre.genre_name}
                    onClick={() => history.push(`/manga/genre/tag?v=${genre.genre_id}`)}
                    style={{
                        color: genre.genre_color,
                        width: window.innerWidth >= 375 && window.innerWidth <= 414 ? "100%" : "170px",
                        borderRadius: "3px"
                    }} >
                    {genre.genre_name}
                </Menu.Item>
            ))
            : ""
    )

    const RenderLeft = () => {
        return (
            <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="Home">
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


    const renderAccountDropDown = () => (
        <>
            <Menu.Item key="profile" onClick={() => openProfileDrawer()}>
                Profile
            </Menu.Item>
            <Menu.Item key="logOut" onClick={() => handleLogOut()}>
                Log out
            </Menu.Item>
        </>

    )

    const RenderRight = () => (
        isUserSignIn
            ? <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>

                <Popover
                    overlayClassName="popover-notification"
                    style={{ background: "red" }}
                    trigger="click"
                    visible={true}
                    onVisibleChange={(e) => setVisible(e)}
                    content={
                        notifications.length
                            ? <div className="notifications-cont" onScroll={(e) => getMoreHistoryNotifications(e)} ref={scrollRef}>
                                {notifications.map((item, i) => (
                                    <Notification item={item} key={i} />
                                ))}
                            </div>
                            : <Typography.Text>You dont have any notifications :(</Typography.Text>
                    }
                >
                    <Menu.Item key="notification">
                        <Badge count={1} >
                            <BellOutlined style={{ fontSize: "20px" }} />
                        </Badge>
                    </Menu.Item>
                </Popover>



                <SubMenu
                    title="Account"
                    popupClassName="list-account-dropdown"
                    children={renderAccountDropDown()}
                />
            </Menu>

            : <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="openSignIn" onClick={() => openSignInModal()}>
                    Signin
                </Menu.Item>
                <Menu.Item key="openSignUp" onClick={() => openSignUpModal()}>
                    Register
                </Menu.Item>
            </Menu>
    );

    const renderMenu = () => {
        return (
            <nav className="menuBar">
                <img className="logo" src={logoText} alt="" onClick={() => history.push("/")} />
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
                        <RenderLeft />
                        <RenderRight />
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