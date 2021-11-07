import React, { useEffect, useState, useRef } from 'react'

import { Input, AutoComplete, Typography } from 'antd'
import { SearchOutlined } from "@ant-design/icons";
import mangaApi from 'api/apis/MainServer/mangaApi';
import { debounce } from 'lodash';
import { useLocation, useParams } from 'react-router';
import forumApi from 'api/apis/MainServer/forumApi';
import { format } from 'helpers/format';
import MyTag from 'pages/Forum/features/MyTag';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';

export default function SearchNavBar() {
    const [inputVal, setInputVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const [isInForum, setIsInForum] = useState(false);

    const pathName = useLocation().pathname;

    useEffect(() => {
        if (pathName.includes("forum")) setIsInForum(true);
        else setIsInForum(false);
    }, [pathName])


    useEffect(() => {
        if (inputVal) {
            if (isInForum) debouceToSearchPosts.current(inputVal);
            else debouceToSearchManga.current(inputVal);
        }
        else setSearchResults([]);
    }, [inputVal])


    const debouceToSearchPosts = useRef(debounce(async (val) => {
        try {
            setIsLoading(true);

            await searchPosts(val);

            setIsLoading(false);

        } catch (err) {
            console.log(err)
        }
    }, 200))

    const debouceToSearchManga = useRef(debounce(async (val) => {
        try {
            setIsLoading(true);

            await searchManga(val);

            setIsLoading(false);

        } catch (err) {
            console.log(err)
        }
    }, 200))


    const searchManga = async (val) => {
        const data = {
            "manga_name": val
        }
        const response = await mangaApi.search(data);

        if (response) {
            if (response.content.err) {
                setSearchResults([])
                setIsLoading(false);
                return;
            }

            const mangas = response.content.data;
            setSearchResults(mangas)
            return;
        }
    }

    const searchPosts = async (val) => {
        const data = {
            "title": val
        }
        const response = await forumApi.searchPosts(data);

        if (response) {
            if (response.content.err) {
                setSearchResults([])
                setIsLoading(false);
                return;
            }

            const posts = response.content.posts;
            posts.forEach(post => post.created_at = format.formatDate01(post.created_at))

            setSearchResults(posts)
            return;
        }
    }


    return (
        <AutoComplete
            getPopupContainer={() => document.getElementById('header-nav')}
            className="search-menu-input"
            onSearch={(value) => setInputVal(value)}
            onSelect={(val) => setInputVal("")}
            value={inputVal}
            suffixIcon={<SearchOutlined />}
            defaultActiveFirstOption
            placeholder="Search..."
        >
            {isInForum
                ? searchResults.map((item, i) => (
                    <AutoComplete.Option key={i} value={item.title}>
                        <NavLink to={redirectURI.postPage_uri(item.post_id)} className="search-menu-item" >
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                                <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500, fontSize: "16px" }} >{item.title}</Typography.Text>

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
                    </AutoComplete.Option>
                ))
                : searchResults.map((item, i) => (
                    <AutoComplete.Option key={i} value={item.manga_name}>
                        <NavLink to={redirectURI.mangaPage_uri(item.manga_id, item.manga_name)} className="search-menu-item" >
                            <img className="img" src={item.thumbnail} alt="" />

                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                                <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500 }} >{item.manga_name}</Typography.Text>
                                <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} >{item.views} views</Typography.Text>
                            </div>
                        </NavLink>
                    </AutoComplete.Option>
                ))
            }



        </AutoComplete>
    )
}
