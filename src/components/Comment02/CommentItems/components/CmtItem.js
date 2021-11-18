import React, { useState, useEffect } from 'react'
import "../CommentItems.css";

import { Comment, Avatar } from 'antd';
import CmtBody from './CmtBody';
import CmtTitle from './CmtTitle';
import redirectURI from 'helpers/redirectURI';
import { NavLink } from 'react-router-dom';
import BtnSeeMore from '../children/BtnSeeMore';


export default function CmtItem({
    key,
    comment,
    addCmt,
    deleteCmt,
    editCmt,

    isAddedCmt,
    setIsAddedCmt,

    isShowReplyBtn
}) {
    const [cmt, setCmt] = useState({})


    useEffect(() => {
        setCmt(comment);
    }, [comment])

    useEffect(() => {
       console.log("???")
    }, [])


    const recieveEditedCmt = (comment) => {
        setCmt(comment);
    }


    // display: none
    const recieveDeletedCmt = (comment) => {
        setCmt(comment);
    }

    return (
        <Comment
            className={cmt.is_deprecated ? "comment-item deleted" : "comment-item"}
            key={key}
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

                        recieveEditedCmt={recieveEditedCmt}
                        recieveDeletedCmt={recieveDeletedCmt}
                    />

                    {isShowReplyBtn ?  <BtnSeeMore comment={cmt} /> : ""}
                </div>
            }
        />
    )
}
