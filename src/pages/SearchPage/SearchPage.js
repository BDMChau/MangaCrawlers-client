import React, { useEffect, useState } from 'react'
import "./SearchPage.css"

import { useDispatch, useSelector } from 'react-redux';
import { SET_PATH, SET_IS_SEARCHED } from "store/features/search/searchSlice"
import { useHistory, useLocation, useParams, NavLink } from 'react-router-dom'
import { Avatar, Col, Empty, Row, Tabs, Typography } from 'antd';
import redirectURI from 'helpers/redirectURI';
import forumApi from 'api/apis/MainServer/forumApi';
import userApi from 'api/apis/MainServer/userApi';
import mangaApi from 'api/apis/MainServer/mangaApi';
import MyTag from 'pages/Forum/features/MyTag';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { format } from 'helpers/format';


export default function SearchPage() {
    const dispatch = useDispatch();
    const searchState = useSelector(state => state.searchState)
    const query = new URLSearchParams(useLocation().search);
    const params = useParams();
    const history = useHistory();

    const { path_param } = params;
    const [value, setValue] = useState(query.get("v") ? query.get("v") : "")
    const [mangas, setMangas] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const [isMobile, setIsMobile] = useState(false);
    const [tabSelected, setTabSelected] = useState("");

    useEffect(() => {
        const enquireHandler = enquireScreen(mobile => {
            if (isMobile !== mobile) {
                setIsMobile(mobile)
            }
        }, "only screen and (min-width: 375px) and (max-width: 767px)")

        return () => unenquireScreen(enquireHandler);
    }, [])

    // init uri
    useEffect(() => {
        if (!path_param) {
            history.push(`/search/manga/?v=${searchState[0]}`)
        }
        else if (path_param) {
            setTabSelected(path_param);
            dispatch(SET_PATH(path_param));
        }
        else if (path_param && value) history.push(`/search/${path_param}/?v=${value}`);

    }, [path_param, value])


    useEffect(() => {
        return () => dispatch(SET_IS_SEARCHED(null));
    }, [])



    useEffect(() => {
        // if user go direct by url >> execute handleSearch()
        if (!searchState[5]) handleSearch();

        if (searchState[0]) setValue(searchState[0]);
        if (searchState[1]) setMangas(searchState[1]);
        if (searchState[2]) setPosts(searchState[2]);
        if (searchState[3]) setUsers(searchState[3]);
    }, [searchState])



    const handleSearch = async () => {
        if (!value) {
            setMangas([]);
            setPosts([]);
            setUsers([]);

            return;
        };


        try {
            await searchManga(value);
            await searchPosts(value);
            await searchUsers(value);
        } catch (err) {
            console.log(err)
        }
    }


    const searchManga = async (val) => {
        const data = {
            "manga_name": val
        }

        try {
            const response = await mangaApi.search(data);

            if (response) {
                if (response.content.err) {
                    setMangas([])
                    return;
                }

                const mangas = response.content.data;
                setMangas(mangas)
                return;
            }
        } catch (err) {
            setMangas([])
            console.log(err)
        }
    }

    const searchPosts = async (val) => {
        const data = {
            "title": val
        }

        try {
            const response = await forumApi.searchPosts(data);

            if (response) {
                if (response.content.err) {
                    setPosts([])
                    return;
                }

                const posts = response.content.posts;
                posts.forEach(post => post.created_at = format.relativeTime(post.created_at))

                setPosts(posts)
                return;
            }
        } catch (err) {
            setPosts([])
            console.log(err)
        }
    }

    const searchUsers = async (val) => {
        const data = {
            value: val,
            key: 2 // search with: 1: email, 2: name
        }

        try {
            const response = await userApi.searchUsers(data);
            if (response.content.err) {
                setUsers([]);
                return;
            }

            const users = response.content.data;

            setUsers(users)
            return;
        } catch (err) {
            setUsers([]);
            console.log(err)
        }
    }



    ///////////////////////// render /////////////////////////
    const renderManga = (item, i) => (
        <div key={i}>
            <NavLink to={redirectURI.mangaPage_uri(item.manga_id, item.manga_name)} className="search-menu-item" >
                <img className="img" src={item.thumbnail} alt="" />

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                    <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500, fontSize: "14px" }} >{item.manga_name}</Typography.Text>
                    <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} >{item.views} views</Typography.Text>
                </div>
            </NavLink>
        </div>
    )

    const renderPost = (item, i) => (
        <div key={i}>
            <NavLink to={redirectURI.postPage_uri(item.post_id)} className="search-menu-item" >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                    <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500, fontSize: "14px" }} >{item.title}</Typography.Text>

                    {item.categoryList.length
                        ? <div style={{ display: "flex", flexWrap: "wrap" }} >
                            {item.categoryList.map((cate, i) => (
                                <MyTag category={cate} key={i} padding={"0px 3px"} />
                            ))}
                        </div>
                        : ""
                    }

                    <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} >{item.created_at}</Typography.Text>
                </div>
            </NavLink>
        </div>
    )

    const renderUser = (item, i) => (
        <div key={i}>
            <NavLink to={redirectURI.userPage_uri(item.user_id)} className="search-menu-item" >
                <div style={{ display: "flex", alignItems: "center" }} >
                    <Avatar
                        src={item.user_avatar}
                        style={{ borderRadius: "50px", width: "38px", height: "38px", marginRight: "5px" }}
                    />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500, fontSize: "14px" }} >{item.user_name}</Typography.Text>
                        <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} >{item.user_email}</Typography.Text>
                    </div>
                </div>
            </NavLink>
        </div>

    )


    return (
        <Row justify="center" className="search-page">
            <Col xs={24} md={20} xl={18} style={{ padding: "15px" }} className="col01">
                <div style={{padding:"10px", margin:"3rem 10px 3rem 10px"}}>
                    <Typography.Title level={3}>Search results</Typography.Title>
                    <Typography.Text>{value}</Typography.Text>

                    <div className="tabs">
                        <Tabs
                            style={{ marginTop: "50px" }}
                            activeKey={tabSelected}
                            tabPosition={isMobile ? "top" : "left"}
                            setTabSelected={setTabSelected}
                            className="contact-tabs"
                            onChange={(key) => {
                                window.history.replaceState(null, null, `/search/${key}/?v=${value}`)
                                setTabSelected(key)
                            }}
                        >
                            <Tabs.TabPane tab="Manga" key="manga">
                                <Typography.Title level={4}>Manga</Typography.Title>
                                {mangas.length
                                    ? mangas.map((item, i) => (
                                        renderManga(item, i)
                                    ))
                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="" />
                                }
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Posts" key="posts">
                                <Typography.Title level={4}>Posts</Typography.Title>
                                {posts.length
                                    ? posts.map((item, i) => (
                                        renderPost(item, i)
                                    ))
                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="" />
                                }
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Users" key="users">
                                <Typography.Title level={4}>Users</Typography.Title>
                                {users.length
                                    ? users.map((item, i) => (
                                        renderUser(item, i)
                                    ))
                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="" />
                                }
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
