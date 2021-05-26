import React, { useState, useEffect, memo } from "react";
import "./Navbar.css";
import logoText from "../../assets/logo/logoText.svg";
import logo from "../../assets/logo/logo2.svg";
import { useDispatch, useSelector } from "react-redux";
import { RESET, CLOSE_SIGN_IN_FORM } from "../../store/slices/AuthSlice";

import { Layout, Menu, Button, Drawer } from "antd";
import { NavLink, useHistory } from "react-router-dom";
import SignUpService from "../../pages/SignUp/SignUpService";
import SignInService from "../../pages/SignIn/SignInService";

import UserProfile from "../../pages/User/UserProfile/UserProfile";
import UserProfileService from "../../pages/User/UserProfile/UserProfileService";

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
        } else {
            setIsUserSignIn(false);
        }
    }, [userState])

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
            ? genres.map((genre) => (
                <Menu.Item
                    key={genre.genre_id}
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

    const renderLeft = () => {
        return (
            <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
                <Menu.Item key="mail">
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

    const renderRight = () => (
        isUserSignIn
            ?
            <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
                <SubMenu
                    title="Account"
                    popupClassName="list-cccount-dropdown"
                    children={renderAccountDropDown()}
                />
            </Menu>

            :
            <Menu mode="horizontal" className="menu-left" style={{ background: "transparent" }}>
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
            {isVisibleProfileDrawer ? <UserProfileService visible={isVisibleProfileDrawer} closeProfileDrawer={(state) => closeProfileDrawer(state)} /> : ""}
        </Header>
    );
}

export default memo(TopNav)