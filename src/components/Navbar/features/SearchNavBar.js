import React, { useEffect, useState, useRef } from 'react'

import { Input, AutoComplete, Typography, Avatar } from 'antd'
import { ReadOutlined, TeamOutlined, ProfileOutlined } from "@ant-design/icons";

import mangaApi from 'api/apis/MainServer/mangaApi';
import userApi from 'api/apis/MainServer/userApi';
import { debounce } from 'lodash';
import forumApi from 'api/apis/MainServer/forumApi';
import { format } from 'helpers/format';
import MyTag from 'pages/Forum/features/MyTag';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';

export default function SearchNavBar() {
    const [isLoading, setIsLoading] = useState(false);

    const [mangas, setMangas] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);




    const debouceToSearch = useRef(debounce(async (val) => {
        if (!val) {
            setMangas([]);
            setPosts([]);
            setUsers([]);

            return;
        };


        try {
            setIsLoading(true);

            await searchManga(val);
            await searchPosts(val);
            await searchUsers(val);

            setIsLoading(false);

        } catch (err) {
            console.log(err)
        }
    }, 200))




    const searchManga = async (val) => {
        const data = {
            "manga_name": val
        }

        try {
            const response = await mangaApi.search(data);

            if (response) {
                if (response.content.err) {
                    setMangas([])
                    setIsLoading(false);
                    return;
                }

                const mangas = response.content.data;
                setMangas(mangas)
                return;
            }
        } catch (err) {
            setMangas([])
            setIsLoading(false);
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
                    setIsLoading(false);
                    return;
                }

                const posts = response.content.posts;
                posts.forEach(post => post.created_at = format.formatDate01(post.created_at))

                setPosts(posts)
                return;
            }
        } catch (err) {
            setPosts([])
            setIsLoading(false);
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
                setIsLoading(false);
                return;
            }

            const users = response.content.data;

            setUsers(users)
            return;
        } catch (err) {
            setUsers([]);
            setIsLoading(false);
            console.log(err)
        }
    }


    const renderManga = (item, i) => ({
        label:
            <div key={i}>
                <NavLink to={redirectURI.mangaPage_uri(item.manga_id, item.manga_name)} className="search-menu-item" >
                    <img className="img" src={item.thumbnail} alt="" />

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                        <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500, fontSize: "14px" }} >{item.manga_name}</Typography.Text>
                        <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} >{item.views} views</Typography.Text>
                    </div>
                </NavLink>
            </div>
    })

    const renderPost = (item, i) => ({
        label:
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
    })

    const renderUser = (item, i) => ({
        label:
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

    })


    const options = [
        {
            label: <div>
                <ReadOutlined style={{ fontSize: "20px", marginTop: "-2px" }} /> Manga
            </div>,
            options: mangas.map((item, i) => {
                return renderManga(item, i)
            }),
        },
        {
            label: <div>
                <ProfileOutlined style={{ fontSize: "20px", marginTop: "-2px" }} /> Posts
            </div>,
            options: posts.map((item, i) => {
                return renderPost(item, i)
            }),
        },
        {
            label: <div>
                <TeamOutlined style={{ fontSize: "20px", marginTop: "-2px" }} /> Users
            </div>,
            options: users.map((item, i) => {
                return renderUser(item, i)
            }),
        },

    ];

    return (
        <AutoComplete
            getPopupContainer={() => document.getElementById('header-nav')}
            className="search-menu-input"
            onChange={(value) => { debouceToSearch.current(value) }}
            defaultActiveFirstOption
            placeholder="Search..."
            allowClear
            options={options}
        >
        </AutoComplete>
    )
}
