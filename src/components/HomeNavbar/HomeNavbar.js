import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Menu, Input } from 'antd'
import "./HomeNavbar.css"


export default function HomeNavbar({ isScroll }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Col span={20} sm={20} xs={23} xxl={18} className={isScroll ? "home-menu-scroll" : "home-menu"}>
            <Menu className="menu" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="action" className="item-search">
                    <Input.Search
                        className="search-box"
                        placeholder="Search your manga..."
                        size={'medium'}
                        loading={isLoading}
                        allowClear
                        // onSearch={} 
                    />

                </Menu.Item>
                <Menu.Item className="item" key="comedy">
                    <NavLink to="">Comedy</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="drama">
                    <NavLink to="">Drama</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="fantasy">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="fantasy1">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="fantasy2">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="fantasy3">
                    <NavLink to="">Fantasy</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="sliceoflife">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="sliceoflife1">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="sliceoflife2">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
                <Menu.Item className="item" key="sliceoflife3">
                    <NavLink to="">Slice of Life</NavLink>
                </Menu.Item>
            </Menu>
        </Col>
    )
}
