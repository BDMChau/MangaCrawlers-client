import React from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Menu } from 'antd'
import "./HomeNavbar.css"



export default function HomeNavbar({isScroll}) {
    return (
        <Col span={20} sm={20} xs={23} xxl={18} className={isScroll ? "home-menu-scroll" : "home-menu"}>
            <Menu className="menu" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="action" className="menu-item">
                    <NavLink to="">Action</NavLink>
                </Menu.Item>
                <Menu.Item key="comedy">
                    <NavLink to="">Comedy</NavLink>
                </Menu.Item>
                <Menu.Item key="drama">
                    <NavLink to="">Drama</NavLink>
                </Menu.Item>
                <Menu.Item key="fantasy">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item key="fantasy1">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item key="fantasy2">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item key="fantasy3">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item key="sliceoflife">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
                <Menu.Item key="sliceoflife1">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
                <Menu.Item key="sliceoflife2">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
                <Menu.Item key="sliceoflife3">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
            </Menu>
        </Col>
    )
}
