import React, { useState } from 'react'
import { Col, Menu, Input, Empty } from 'antd'
import "./HomeNavbar.css"
import { List, Typography } from 'antd';
import TransitionAnimate from '../Animation/transition';


function HomeNavbar({ isScroll }) {
    const [isLoading, setIsLoading] = useState(false)
    const [dataSearch, setDataSearch] = useState([])
    const [searchingText, setSearchingText] = useState("")


    const onSearch = (val) => {
        setDataSearch([...dataSearch, val])
    }

    return (
        <Col span={20} sm={20} xs={23} xxl={18} className={isScroll ? "home-menu scroll" : "home-menu"}>
            <Menu className="menu" mode="horizontal" defaultSelectedKeys={["1"]}  >
                <Menu.Item key="action" className="menu-search">
                    <Input.Search
                        className="searching-box"
                        placeholder="Search your manga..."
                        size={'medium'}
                        loading={isLoading}
                        allowClear
                        onChange={(e) => setSearchingText(e.target.value)}
                        onSearch={onSearch}
                    />

                </Menu.Item>
            </Menu>


            <div className="result-box" style={{ height: searchingText && dataSearch.length ? "350px" : "unset" }} >
                {searchingText
                    ? dataSearch.length
                        ? <TransitionAnimate renderPart={
                            <List
                                className="searching-list"
                                dataSource={dataSearch}
                                renderItem={item => (
                                    <List.Item className="searching-item">
                                        <img className="img" src="https://i.pinimg.com/originals/67/8f/60/678f60127554207a97056c191e64a1b4.jpg" alt="" />
                                        <div className="text">
                                            <Typography.Text className="manga">{item}</Typography.Text>
                                            <Typography.Text className="author">Author</Typography.Text>
                                        </div>
                                    </List.Item>
                                )} />
                        } />
                        : <TransitionAnimate renderPart={
                            <div style={{ height: "160px" }} >
                                <Empty
                                    style={{ marginTop: "20px", color: "#8a8d92" }}
                                    description="Seem nothing like you're looking for :("
                                />
                            </div>
                        } />
                    : ""
                }
            </div>




        </Col>
    )
}

export default HomeNavbar