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


function CommentItems({
    comments,
    setComments,

    getCmts,

    isEndCmts,

    mangaId,

    deleteCmt,

    addCmt,
    isAddedCmt,
    setIsAddedCmt,

    editCmt
}) {
    const userState = useSelector((state) => state.userState);

    const [isEndCmtsChildId, setIsEndCmtsChildId] = useState([]);
    const [count, setCount] = useState(0);

    const [isScrollBottom, setIsScrollBottom] = useState(false)

    const history = useHistory();

    useEffect(() => {
        if (isScrollBottom === true) {
            getCmts();

            const timer = setTimeout(() => setIsScrollBottom(false), 300)
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



    ////////////////////////////// components //////////////////////////////
    const CmtTitle = ({ comment }) => (
        <NavLink to={redirectURI.userPage_uri(comment.user_id)} >
            <Typography.Text
                style={{ cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
            >
                {comment.user_name}
            </Typography.Text>
        </NavLink>
    )



    const CmtBody = ({ comment, background }) => (
        <div className="cmt-body" key={comment.manga_comment_id} style={{ background: background }} >
            <div style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: comment.manga_comment_content }} />
            {comment.image_url ? <img src={comment.image_url} alt="" style={{ height: "110px", width: "fit-content", borderRadius: "8px", marginTop: "5px" }} /> : ""}

            <CmtBottom comment={comment} />

            <Typography.Text style={{ color: "#FF4D4F" }}>
                {comment.is_error ? "Error, cannot add this comment!" : ""}
            </Typography.Text>
        </div>
    )


    const CmtBottom = ({ comment }) => (
        <div className="cmt-bottom">
            <Typography.Text style={{ color: comment.is_error ? "#D7D8DB" : "#848587" }}>
                {format.formatDate02(comment.manga_comment_time)}
            </Typography.Text>

            {userState[0]
                ? <div className="interact">
                    <InteractionForm
                        comment={comment}
                        cmtId={comment.manga_comment_id}
                        userId={userState[0].user_id}

                        deleteCmt={deleteCmt}

                        addCmt={(dataInput) => addCmt(dataInput)}
                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}

                        editCmt={editCmt}
                    />
                </div>
                : ""
            }


            <NavLink to={mangaId ? `/chapter/${mangaId}/${comment.chapter_id}` : "#"}>
                <Tooltip title={comment.chapter_name}>
                    <Typography.Text
                        className="chapter-name"
                        style={{
                            color: comment.is_error ? "#D7D8DB" : "#848587",
                        }}
                    >
                        {comment.chapter_name}
                    </Typography.Text>
                </Tooltip>
            </NavLink>
        </div>
    )


    ////////////////////////////// handle children //////////////////////////////
    const BtnSeeMore = ({ comment, setComments }) => {
        const [fromRowsChild, setFromRowsChild] = useState(2);
        const [cmtsChildren, setCmtsChildren] = useState([]);
        const [isEnd, setIsEnd] = useState(false);

        const getCmtsChildBtnSeeMore = async () => {
            if (isEndCmtsChildId.includes(comment.parent_id)) return;

            const data = {
                manga_comment_id: comment.parent_id,
                from: fromRowsChild,
                amount: 4,
                level: comment.level,
                comments: comments
            }


            try {
                const response = await mangaApi.getCommentsChild(data);
                const commentsRes = response.content.comments ? response.content.comments : [];
                const nextFromRow = response.content.from;

                if (response.content.is_end) setIsEnd(true);


                setFromRowsChild(nextFromRow);
                setTimeout(() => setCmtsChildren(commentsRes), 200)
            } catch (ex) {
                console.log(ex)
            }
        }

        return (
            <div className="children-cmts">
                {isEnd
                    ? ""
                    : <Button
                        type="text"
                        style={{
                            padding: "2px",
                            margin: "3px 0 0 0",
                            borderRadius: "10px",
                            fontSize: "13px",
                            color: "#40A9FF",
                            fontWeight: 500
                        }}
                        onClick={() => getCmtsChildBtnSeeMore()}
                    >
                        <CaretDownOutlined style={{ fontSize: "13px" }} />
                        View replies
                    </Button>
                }

                <CmtsChildren comments={cmtsChildren} />
            </div>
        )
    }

    const CmtsChildren = ({ comments }) => {
        return (
            comments.map((cmt, i) => (
                <Comment
                    className="comment-item"
                    key={cmt.manga_comment_id}
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
                            <CmtBody comment={cmt} background={"white"} />

                        </div>
                    }
                >
                    {/* {children} */}
                </Comment>
            ))
        );
    }



    return (
        <div className="comment-items" onScroll={(e) => handleScroll(e)} >
            {comments.length
                ? comments.map((cmt) => (
                    <Comment
                        className="comment-item"
                        key={cmt.manga_comment_id}
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
                                <CmtBody comment={cmt} background={"white"} />

                                <BtnSeeMore comment={cmt} />
                            </div>
                        }
                    >
                        {/* {children} */}
                    </Comment>
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