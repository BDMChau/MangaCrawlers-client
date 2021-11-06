import React, { useState } from 'react'
import { Col, Menu, Input, Empty } from 'antd'
import "./HomeNavbar.css"
import { List, Typography } from 'antd';
import TransitionAnimate from '../Animation/transition';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';


function HomeNavbar({ isScroll, searchResults, onSearch, isLoadingSearch }) {
    const [searchValue, setSearchValue] = useState("")


    return (
        <Col span={16} sm={20} xs={22} xxl={16} className={isScroll ? "home-menu scroll" : "home-menu"}>
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


            <div className="result-box" style={{ maxHeight: searchValue ? searchResults.length ? "350px" : "200px" : "unset" }} >
                {searchValue
                    ? searchResults.length
                        ? <TransitionAnimate renderPart={
                            <List
                                className="searching-list"
                                dataSource={searchResults}
                                renderItem={manga => (
                                    <List.Item id={manga.manga_id} title={manga.manga_name}>
                                        <NavLink to={redirectURI.mangaPage_uri(manga.manga_id, manga.manga_name)} className="searching-item">
                                            <img className="img" src={manga.thumbnail} alt="" />
                                            <div className="text">
                                                <Typography.Text className="manga-name">{manga.manga_name}</Typography.Text>
                                                <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} className="view">{manga.views ? manga.views : "0"} views</Typography.Text>
                                            </div>
                                        </NavLink>
                                    </List.Item>
                                )} />
                        } transitionTime={0.3} />
                        : <TransitionAnimate renderPart={
                            <div style={{ height: "unset" }} >
                                <Empty
                                    style={{ marginTop: "40px", color: "#8a8d92" }}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
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