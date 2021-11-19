import React, { useState, useEffect, memo } from 'react'
import "../CommentUI.css";

import { Comment, Avatar } from 'antd';
import CmtBody from './CmtBody';
import CmtTitle from './CmtTitle';
import redirectURI from 'helpers/redirectURI';
import { NavLink } from 'react-router-dom';
import BtnSeeMore from '../children/BtnSeeMore';


function CmtItem({
    targetId,
    targetTitle,

    key,
    comment,
    addCmt,
    deleteCmt,
    editCmt,

    isAddedCmt,
    setIsAddedCmt,

    isChild
}) {
    const [cmt, setCmt] = useState({})


    useEffect(() => {
       setCmt(comment);
    }, [comment])


    const recieveEditedCmt = (comment) => {
        setCmt(comment);
    }


    // display: none
    const recieveDeletedCmt = (comment) => {
        setCmt({});
    }

    return (
        Object.keys(cmt).length
            ? <Comment
                className={cmt?.is_deprecated ? "comment-item deleted" : "comment-item"}
                key={key}
                author={<CmtTitle comment={cmt} />}
                avatar={
                    <NavLink to={redirectURI.userPage_uri(cmt?.user_id)}>
                        <Avatar
                            className="cmt-avatar"
                            title={cmt?.user_name}
                            style={{ cursor: "pointer" }}
                            src={cmt?.user_avatar}
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

                            addCmt={addCmt}
                            isAddedCmt={isAddedCmt}
                            setIsAddedCmt={setIsAddedCmt}

                            recieveEditedCmt={recieveEditedCmt}
                            recieveDeletedCmt={recieveDeletedCmt}
                        />

                        <BtnSeeMore
                            comment={cmt}
                            targetId={targetId}
                            targetTitle={targetTitle}

                            isChild={isChild}
                        />
                    </div>
                }
            />
            : ""
    )
}

export default memo(CmtItem);