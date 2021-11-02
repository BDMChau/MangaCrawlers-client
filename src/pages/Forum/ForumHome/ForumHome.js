import { Col, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MyTag from './features/MyTag'
import Post from './features/Post'
import "./ForumHome.css"


export default function ForumHome({categories}) {
    const genresState = useSelector(state => state.mangaState[2]);

    const [posts, setPosts] = useState([
        {
            avatar: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
            user_name: "Minh CHouuuuuu",
            categories: [
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "2",
                    cate_name: "recommnend",
                    cate_color: "blue"
                },
                {
                    cate_id: "3",
                    cate_name: "discussing",
                    cate_color: "blue"
                },
            ],
            title: "title post title post title post title post title post title post title post title pos post title post title post title post title post title post title post ",
        },
        {
            avatar: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
            user_name: "Minh CHouuuuuu",
            categories: [
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "2",
                    cate_name: "recommnend",
                    cate_color: "blue"
                },
                {
                    cate_id: "3",
                    cate_name: "discussing",
                    cate_color: "blue"
                },
            ],
            title: "title post title post title post title post title post ",
        },
        {
            avatar: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
            user_name: "Minh CHouuuuuu",
            categories: [
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "2",
                    cate_name: "recommnend",
                    cate_color: "blue"
                },
                {
                    cate_id: "3",
                    cate_name: "discussing",
                    cate_color: "blue"
                },
            ],
            title: "title post title post title post title post title post ",
        },
        {
            avatar: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
            user_name: "Minh CHouuuuuu",
            categories: [
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "2",
                    cate_name: "recommnend",
                    cate_color: "blue"
                },
                {
                    cate_id: "3",
                    cate_name: "discussing",
                    cate_color: "blue"
                },
            ],
            title: "title post title post title post title post title post ",
        },
        {
            avatar: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
            user_name: "Minh CHouuuuuu",
            categories: [
                {
                    cate_id: "1",
                    cate_name: "action",
                    cate_color: "blue"
                },
                {
                    cate_id: "2",
                    cate_name: "recommnend",
                    cate_color: "blue"
                },
                {
                    cate_id: "3",
                    cate_name: "discussing",
                    cate_color: "blue"
                },
            ],
            title: "title post title post title post title post title post ",
        },
    ])


    return (
        <div className="forum-home" >
            <Col span={24} className="banner" >
                <Typography.Title level={3}>MangaCrawlers Community Forums</Typography.Title>
            </Col>

            <Row justify="center" className="forum-home-body">
                <Col className="left" xs={24} md={14} xl={9}>
                    {posts.length
                        ? posts.map((post, i) => (
                            <Post post={post} key={i} />
                        ))
                        : ""
                    }
                </Col>

                <Col className="right" xs={24} md={11} xl={7} xxl={7}>
                    <div>
                        <div className="trending-posts">
                            <Typography.Title level={4}>Trending</Typography.Title>
                            {posts.length
                                ? posts.map((post, i) => (
                                    <Post post={post} key={i} smallSize={true} />
                                ))
                                : ""
                            }
                        </div>

                        <div className="categories-cont">
                            {categories.length
                                ? categories.map((item, i) => (
                                    <MyTag category={item} key={i} />
                                ))
                                : ""

                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
