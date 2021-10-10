import React, { useState, useEffect } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';
import InputForm from '../features/InputForm';
import mangaApi from 'api/apis/MainServer/mangaApi';
import userApi from 'api/apis/MainServer/userApi';
import { notification_error } from 'components/alerts/notification';
import { message_error } from 'components/alerts/message';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';



export default function CommentContainter({ mangaId, chapterId, commentsProp, isEndCmts }) {
    const userState = useSelector((state) => state.userState);

    const [comments, setComments] = useState([])
    const [isAddedCmt, setIsAddedCmt] = useState(false);
    
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


    useEffect(() => {
        if(commentsProp.length) setComments(commentsProp);
    }, [commentsProp])

   


    const addCmt = async (cmtContent, img, parentId, toUsers) => {
        console.log(cmtContent)
        if (userState[0]) {
            const formData = new FormData();
            formData.append("manga_id", mangaId ? mangaId : null);
            formData.append("chapter_id", chapterId ? chapterId : null);
            formData.append("manga_comment_content", cmtContent);
            formData.append("img", img);
            formData.append("parent_id", parentId ? parentId : "");
            formData.append("to_user_id", toUsers ? toUsers : []);

            try {
                // const response = await userApi.addCmt(token, formData);
                // if (response.content.comment_info) {
                //     // added
                // } else {
                //     setIsErrorCmt(true);
                // }
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
        if (!userState[0]) return message_error("You have to login first!");

        const data = mangaId
            ? {
                manga_comment_id: id,
                comments: comments
            }
            : {
                chapter_comment_id: id,
                comments: comments
            }

        try {
            const response = await userApi.deleteCmt(token, data);
            if (response.content.err) {
                notification_error("Something wrong, please try again :(")
                return;
            }
            const restCmts = response.content.comments

            console.log(restCmts)
            setTimeout(() => setComments(restCmts), 200)
        } catch (err) {
            notification_error("Something wrong, please try again :(")
            console.log(err)
        }
    }




    return (
        <div className="comments-form">
            <InputForm
                token={token}

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
