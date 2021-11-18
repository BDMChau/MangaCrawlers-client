import React, { useEffect, memo, useState } from 'react'
import "./CommentItems.css"
import { NavLink, useHistory } from 'react-router-dom';

import { Comment, Avatar, Empty, Typography, Tooltip, Button } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";
import ButtonLike from '../../Comment/features/ButtonLike';
import SkeletonCustom from '../../SkeletonCustom/SkeletonCustom';
import InteractionForm from '../../Comment/features/InteractionForm';
import { format } from 'helpers/format';
import { useSelector } from 'react-redux';
import redirectURI from 'helpers/redirectURI';
import mangaApi from 'api/apis/MainServer/mangaApi';
import CmtBody from './components/CmtBody';
import CmtTitle from './components/CmtTitle';
import BtnSeeMore from './children/BtnSeeMore';
import CmtItem from './components/CmtItem';


function CommentItems({
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
            getCmts();

            const timer = setTimeout(() => setIsScrollBottom(false), 200)
            return () => clearTimeout(timer);
        }
    }, [isScrollBottom])


    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;

        if (isEndCmts === false) {
            if (scrollHeight - (scrollTop + clientHeight) <= 50) {
                setIsScrollBottom(true);
            }
        }
    }




    return (
        <div className="comment-items" onScroll={(e) => handleScroll(e)} >
            {comments.length
                ? comments.map((cmt, i) => (
                    <CmtItem
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