import React, { useState, useEffect } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';
import InputForm from '../features/InputForm';
import mangaApi from 'api/apis/MainServer/mangaApi';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error, notification_success } from 'components/alerts/notification';
import { message_error } from 'components/alerts/message';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';



export default function CommentContainter({ mangaId, chapterId }) {
    const userState = useSelector((state) => state.userState);

    const [comments, setComments] = useState([])
    const [isAddedCmt, setIsAddedCmt] = useState(false);
    const [fromRow, setFromRow] = useState(0);
    const [isEndCmts, setIsEndCmts] = useState(false);
    const [isErrorCmt, setIsErrorCmt] = useState(false);
    const [timeWhenAddedCmt, setTimeWhenAddedCmt] = useState();

    const cookies = new Cookies();
    const token = cookies.get("token");

    
    // check error when add cmt
    useEffect(() => {
        if (isErrorCmt === true) {
            for (const comment of comments) {
                if (comment.chaptercmt_time === timeWhenAddedCmt) {
                    comment.is_error = true;
                    break;
                }
            }

            setComments(comments);
        }
    }, [isErrorCmt])


    // get comments
    useEffect(() => {
        setIsEndCmts(false);
        setComments([]);
        setFromRow(0);

        // if fromRow is 0, run getCmtsManga() below
        if (fromRow === 0) {
            getCmts();
        }
    }, [mangaId, chapterId])


    useEffect(() => {
        // if fromRow is 0, this effect won't be invoked
        if (fromRow) getCmts()
    }, [fromRow])


    const addCmt = async (cmtContent) => {
        console.log(cmtContent)
        if (userState[0]) {
            const newObjComment = {
                // "chapter_id": chapterid,
                // "chaptercmt_content": cmtContent,
                // "chaptercmt_time": format.formatDate02(Date.now()),
                // "chapter_name": chapterInfo.chapter_name,
                "manga_id": mangaId,
                "chapter_id": null,
                "manga_comment_content": cmtContent ? cmtContent.trim() : "",
                "image_url": null,
                "level": 0,
                "parent_id": null,
                "user_avatar": userState[0].user_avatar,
                "user_email": userState[0].user_email,
                "user_id": userState[0].user_id,
                "user_name": userState[0].user_name,
                "is_error": false
            }

            setTimeWhenAddedCmt(format.formatDate02(Date.now()));
            setComments(prevCmts => [newObjComment, ...prevCmts])
            setIsAddedCmt(true)


            const data = {
                manga_id: mangaId.toString(),
                chapter_id: "",
                manga_comment_content: cmtContent ? cmtContent.trim() : "",
                image: img ? img : "",
                level: 0,
                parent_id: ""
            }

            try {
                const response = await userApi.addCmt(token, data);
                if (response.content.comment_info) {
                    // added
                } else {
                    setIsErrorCmt(true);
                }
            } catch (ex) {
                console.log(ex);
            }
            return;

        } else {
            message_error("You have to login first!");
            return;
        }
    }

    const deleteCmt = async (id) => {
        // if (!userState[0]) return message_error("You have to sign in first!");

        // const data = mangaId ? { manga_comment_id: id } : { chapter_comment_id: id }

        // try {
        //     const response = await userApi.deleteCmt(token, data);
        //     if (response.content.err) {
        //         notification_error("Something wrong, please try again :(")
        //         return;
        //     }

        //     // notification_success("")
        // } catch (err) {
        //     console.log(err)
        // }
    }


    const getCmts = async () => {
        if (mangaId || chapterId) {
            const data = {
                manga_id: mangaId ? mangaId : null,
                chapter_id: chapterId ? chapterId : null,
                from: fromRow,
                amount: 100
            }

            try {
                const response = await mangaApi.getCommentsManga(data);

                if (JSON.parse(localStorage.getItem("code_400"))) {
                    // message_error("No manga to present!")
                    localStorage.removeItem("code_400")
                    return;
                }
                else if (response.content.msg === "No comments found!") {
                    setIsEndCmts(true);
                    return;
                }


                if (response.content.comments.length) {
                    const comments = response.content.comments;

                    setComments(comments)
                    setFromRow(fromRow + 11)
                }

                return;
            } catch (ex) {
                console.log(ex)
            }
        }
    }



    return (
        <div className="comments-form">
            <InputForm
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
                addCmt={(content) => addCmt(content)}
            />

            {/* render cmts */}
            <CommentItems
                comments={comments}
                getCmts={() => getCmts()}
                isEndCmts={isEndCmts}

                mangaId={mangaId}

                deleteCmt={deleteCmt}
            />
        </div>
    )
}
