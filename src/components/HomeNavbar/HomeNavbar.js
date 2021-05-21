import React, { useEffect, useRef, useState } from 'react'
import { Col, Menu, Input, Empty } from 'antd'
import "./HomeNavbar.css"
import { List, Typography } from 'antd';
import TransitionAnimate from '../Animation/transition';


function HomeNavbar({ isScroll, searchResults, onSearch, isLoadingSearch }) {
    const [searchValue, setSearchValue] = useState("")
    const [results, setResults] = useState([])


    useEffect(() => {
        if (searchResults) {
            setResults(searchResults)
        }
    }, [searchResults])

    useEffect(() => {
        if (searchValue === "") {
            setResults([])
        }
    }, [searchValue])


    return (
        <Col span={20} sm={20} xs={23} xxl={18} className={isScroll ? "home-menu scroll" : "home-menu"}>
            <Menu className="menu" mode="horizontal" defaultSelectedKeys={["1"]}  >
                <Menu.Item key="action" className="menu-search">
                    <Input.Search
                        className="searching-box"
                        placeholder="Search your manga..."
                        size={'large'}
                        loading={isLoadingSearch}
                        value={searchValue}
                        allowClear
                        onChange={(e) => { onSearch(e.target.value); setSearchValue(e.target.value) }}
                    />

                </Menu.Item>
            </Menu>


            <div className="result-box" style={{ height: searchValue ? results.length ? "350px" : "200px" : "unset" }} >
                {searchValue
                    ? results.length
                        ? <TransitionAnimate renderPart={
                            <List
                                className="searching-list"
                                dataSource={results}
                                renderItem={manga => (
                                    <List.Item className="searching-item" id={manga.id}>
                                        <img className="img" src={manga.thumbnail} alt="" />
                                        <div className="text">
                                            <Typography.Text className="manga">{manga.manga_name}</Typography.Text>
                                            <Typography.Text className="author">{manga.views ? manga.views : "0"} views</Typography.Text>
                                        </div>
                                    </List.Item>
                                )} />
                        } transitionTime={0.3} />
                        : <TransitionAnimate renderPart={
                            <div style={{ height: "unset" }} >
                                <Empty
                                    style={{ marginTop: "20px", color: "#8a8d92" }}
                                    description="Seem nothing like you're looking for :("
                                />
                            </div>
                        } transitionTime={0.3} />
                    : ""
                }
            </div>




        </Col>
    )
}

export default HomeNavbar