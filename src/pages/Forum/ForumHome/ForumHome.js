import { Col, Row } from 'antd'
import React, { useState } from 'react'
import Post from './features/Post'
import "./ForumHome.css"


export default function ForumHome() {
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
            title: "title post title post title post title post title post ",
            shortContent: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly usedn meaningful content. "
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
        <Row justify="center">
            <Col className="left" xs={24} md={14} xl={8}>
                {posts.length
                    ? posts.map((post, i) => (
                        <Post post={post} key={i} />
                    ))
                    : ""
                }
            </Col>

            <Col className="right" span={16} md={10} xl={7} xxl={7}>
                right
            </Col>
        </Row>
    )
}
