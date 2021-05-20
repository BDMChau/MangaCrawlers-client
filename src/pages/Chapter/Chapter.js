import { Button, Col, Dropdown, Image, Input, Menu, Row, Tooltip, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import "./Chapter.css"
import CommentForm from '../../components/CommentForm/CommentForm';
import { LeftOutlined, RightOutlined, HomeOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';
import { NavLink } from 'react-router-dom';
import ImgsChapter from './ImgsChapter';


export default function Chapter({ imgs, chapters, chapterInfo }) {
    const mangaState = useSelector(state => state.mangaState);
    const mangaId = mangaState[0];
    const [chapterName, setChapterName] = useState("");

    const Spinner = () => (
        <div className="spinner-lazyloading">
            <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="none"
                    strokeWidth="0"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(275.845 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type=""
                        calcMode="linear"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );

    useEffect(() => {
        smoothscroll.polyfill();
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [])




    const dropDownItems = (
        <Menu>
            {
                chapters
                    ? chapters.map((chapter, id) => (
                        <Menu.Item key={id} className="dropdown-item-chapter-page">
                            <NavLink className="dropdown-item-title" to={`/chapter/${mangaId}/${chapter.chapter_id}`} onClick={() => setChapterName(chapter.chapter_name)}>
                                <Typography.Text className="title-name">{chapter.chapter_name}</Typography.Text>
                                <Typography.Text className="title-time">{chapter.chapter_createdAT}</Typography.Text>
                            </NavLink>
                        </Menu.Item>
                    ))
                    : ""
            }
        </Menu>
    );


    return (
        <Row justify={"center"} className="chapter">
            <Col span={23} sm={13} md={20} xxl={10} className="dropdown-chapter">
                <Tooltip title="Go back to manga page">
                    <Button className="btn-home">
                        <NavLink to={`/manga/${mangaId}`}>
                            <HomeOutlined style={{ fontSize: "22px" }} />
                        </NavLink>
                    </Button>
                </Tooltip>

                <Tooltip title="Previous Chap">
                    <Button className="btn-next">
                        <LeftOutlined style={{ fontSize: "22px" }} />
                    </Button>
                </Tooltip>

                <Tooltip title="Chapters">
                    <Dropdown className="dropdown-items" overlay={dropDownItems} trigger={['click']}>
                        <a title="" onClick={e => e.preventDefault()}>
                            {chapterName ? chapterName : chapterInfo.chapter_name}
                        </a>
                    </Dropdown>
                </Tooltip>

                <Tooltip title="Next Chap">
                    <Button className="btn-prev">
                        <RightOutlined style={{ fontSize: "22px" }} />
                    </Button>
                </Tooltip>

                <Tooltip title="Add to Favorite">
                    <Button className="btn-add-favor">
                        <AppstoreAddOutlined style={{ fontSize: "22px" }} />
                    </Button>
                </Tooltip>
            </Col>

            <ImgsChapter imgs={imgs} />

            <Col span={23} xxl={14} className="chapter-comment">
                <CommentForm />
            </Col>
            {/* <Col span={23} xxl={14} className="chapter-footer">
                <FooterContainter/>
            </Col> */}
        </Row >
    )
}
