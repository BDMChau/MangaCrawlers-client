import React from 'react';
import "../CommentItems.css";

import { Comment, Avatar, Empty, Typography, Tooltip, Button } from 'antd';
import CmtTitle from '../components/CmtTitle';
import CmtBody from '../components/CmtBody';
import { NavLink } from 'react-router-dom';



export default function ChildCmts({ comments, addCmt, deleteCmt, editCmt }) {
    return (
        <div className="child-cmts-cont">
            {comments.map((cmt, i) => (
                <Comment
                    className="comment-item"
                    key={i}
                    author={<CmtTitle comment={cmt} />}
                    avatar={
                        <NavLink to={redirectURI.userPage_uri(cmt.user_id)}>
                            <Avatar
                                className="cmt-avatar"
                                title={cmt.user_name}
                                style={{ cursor: "pointer" }}
                                src={cmt.user_avatar}
                                alt="Avatar"
                            />
                        </NavLink>
                    }
                    content={
                        <div className="comment">
                            <CmtBody
                                comment={cmt}
                                background={"white"}

                                deleteCmt={deleteCmt}
                                editCmt={editCmt}

                                addCmt={(dataInput) => addCmt(dataInput)}
                                isAddedCmt={isAddedCmt}
                                setIsAddedCmt={setIsAddedCmt}
                            />
                        </div>
                    }
                >
                    {/* {children} */}
                </Comment>
            ))}
        </div>
    );
}
