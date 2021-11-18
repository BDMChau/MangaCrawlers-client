import React, { useEffect, memo, useState } from 'react'
import "./CommentUI.css"
import { NavLink, useHistory } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip, Button } from 'antd';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import { useSelector } from 'react-redux';
import CmtItem from './components/CmtItem';
import CmtItems from './components/CmtItems';


function CommentUI({
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

            const timer = setTimeout(() => setIsScrollBottom(false), 200)
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
            <CmtItems
                targetId={targetId}
                targetTitle={targetTitle}

                comments={comments}
                addCmt={addCmt}
                deleteCmt={deleteCmt}
                editCmt={editCmt}

                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}

                isShowReplyBtn={true}
            />

            {isScrollBottom
                ? <div className="loading-more" >
                    <SkeletonCustom paragraphRows={4} avatarShape={"circle"} />
                </div>
                : ""
            }
        </div>
    )
}

export default memo(CommentUI)