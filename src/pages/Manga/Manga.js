import React, { useEffect, useState } from 'react'
import "./Manga.css"
import starblank from "../../assets/img/starblank.svg"
import starfilled from "../../assets/img/starfilled.svg"
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Image } from 'antd';


export default function Manga() {

    return (
        <>
            <div className="manga-bg">
                <div className="manga-bg-img"
                    style={{ backgroundImage: `url(http://st.nhattruyen.com/data/comics/171/thien-than-ngay-tan-the.jpg)` }}
                >
                </div>
            </div>
            <Container className="manga-body">
                <div className="top">
                    <Image
                        className="manga-thumb"
                        width={260}
                        height={320}
                        src="http://st.nhattruyen.com/data/comics/171/thien-than-ngay-tan-the.jpg"
                        title="Owari No Seraph"
                    >
                    </Image>
                    <div className="manga-info">
                        <div className="manga-details">
                            <span className="name">
                                Owari No Seraph
                        </span>
                            <span className="status">
                                Ongoing
                        </span>
                            <span className="author">
                                Author:
                            <NavLink to="/author/id" className="link">
                                    AuthorName
                            </NavLink>
                            </span>
                            <span className="genres">
                                <NavLink to="/search/genre/id" className="link" style={{ marginLeft: 0 }}>
                                    Genre
                            </NavLink>
                                <NavLink to="/search/genre/id" className="link">
                                    Genre
                            </NavLink>
                                <NavLink to="/search/genre/id" className="link">
                                    Genre
                            </NavLink>
                            </span>
                            <span className="desc">
                                lorLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </span>
                            <span className="interact">
                                <NavLink
                                    className="link-to-read"
                                    to="/chapters/1"
                                >Read Now
                            </NavLink>

                                <NavLink
                                    className="link-add-lib"
                                    to="/chapters/1"
                                >Add to Library
                            </NavLink>
                            </span>
                        </div>
                        <span className="manga-evaluate" style={{ display: "flex" }}>
                            <img src={starfilled} className="star" alt="" />
                            <img src={starfilled} className="star" alt="" />
                            <img src={starfilled} className="star" alt="" />
                            <img src={starblank} className="star" alt="" />
                            <img src={starblank} className="star" alt="" />
                        </span>
                    </div>
                </div>
                <div className="middle">
                    <div className="fields">
                        <div className="manga-chapter-field">
                            <p>CHAPTER</p>
                            <div className="line">
                            </div>

                            <ul className="list">
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink className="link" to="/chapter/1">
                                        Chapter 1: lorLorem Ipsum is simply dummy text of the printing and typesetting industry
                                   </NavLink>
                                </li>

                            </ul>
                        </div>
                        <div className="manga-rank-field">
                            <p>Latest Updates</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
