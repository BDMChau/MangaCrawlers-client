import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink, useHistory } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip, Button } from 'antd';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import { useSelector } from 'react-redux';
import CmtItem from './components/CmtItem';


function CommentItems({
    targetId,
    targetTitle,

    comments,
    setComments,

    getCmts,

    isEndCmts,


    deleteCmt,

    addCmt,
    isAddedCmt,
    setIsAddedCmt,

    editCmt
}) {
    const userState = useSelector((state) => state.userState);

    const [isScrollBottom, setIsScrollBottom] = useState(false)


    useEffect(() => {
        if (isScrollBottom === true) {
            async function getMoreCmts() {
                await getCmts();
            }
            getMoreCmts()

            const timer = setTimeout(() => setIsScrollBottom(false), 100)
            return () => clearTimeout(timer);
        }
    }, [isScrollBottom])


    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;

        if (isEndCmts === false) {
            if (scrollHeight - (scrollTop + clientHeight) <= 100) {
                setIsScrollBottom(true);
            }
        }
    }




    return (
        <div className="comment-items" onScroll={(e) => handleScroll(e)} >
            {comments.length
                ? comments.map((cmt, i) => (
                    <CmtItem
                        targetId={targetId}
                        targetTitle={targetTitle}

                        key={i}
                        comment={cmt}
                        addCmt={addCmt}
                        deleteCmt={deleteCmt}
                        editCmt={editCmt}

                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}

                        isShowReplyBtn={true}
                    />
                ))

                : <div style={{ height: "unset" }} >
                    <Empty
                        style={{ marginTop: "40px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No comments to present :("
                    />
                </div>}

            {isScrollBottom
                ? <div className="loading-more" >
                    <SkeletonCustom paragraphRows={4} avatarShape={"circle"} />
                </div>
                : ""
            }
        </div>
    )
}

export default memo(CommentItems)