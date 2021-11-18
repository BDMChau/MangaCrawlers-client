import React, {useState, useEffect} from 'react';

import { Button } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";

import mangaApi from 'api/apis/MainServer/mangaApi';


export default function BtnSeeMore({ comment }) {
    const [fromRowsChild, setFromRowsChild] = useState(2);
    const [cmtsChildren, setCmtsChildren] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [isAddedCmt, setIsAddedCmt] = useState(false);




    const getCmtChildren = async () => {
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
    };

    const addCmt = async (dataInput) => {
        if (userState[0]) {
            const formData = new FormData();
            // formData.append("manga_id", mangaId ? mangaId.toString() : "");
            // formData.append("post_id", postId ? postId.toString() : "");
            // formData.append("chapter_id", "");
            if (postId) {
                formData.append("target_title", "post");
                formData.append("target_id", postId.toString());
            } else if (mangaId) {
                formData.append("target_title", "manga");
                formData.append("target_id", mangaId.toString());
            }
            formData.append("manga_comment_content", dataInput.content);
            formData.append("image", dataInput.image);
            formData.append("sticker_url", dataInput.sticker_url ? dataInput.sticker_url : "");
            formData.append("parent_id", dataInput.parent_id);
            formData.append("to_users_id", dataInput.to_users_id);


            try {
                const response = await userApi.addCmt(token, formData);

                return;
            } catch (ex) {
                console.log(ex);
                setIsAddedCmt(true);
            }
        } else {
            message_error("You have to logged in to do this action");
            return;
        }
    }

    const deleteCmt = async (id) => {
        if (!userState[0]) return message_error("You have to logged in to do this action");

        const data = {
            manga_comment_id: id,
            comments: comments
        }

        try {
            const response = await userApi.deleteCmt(token, data);
            if (response.content.err) {
                notification_error("Failed :(");
                return;
            }
            // lấy ra id cmt vừa xóa, filter
            return;
        } catch (err) {
            notification_error("Failed :(")
            console.log(err);
            return;
        }
    }

    const editCmt = async (editObj) => {
        const formData = new FormData();
        formData.append("manga_comment_id", editObj.cmt_id);
        formData.append("manga_comment_content", editObj.content);
        formData.append("to_users_id", editObj.toUsersId);
        formData.append("image", editObj.image);

        try {
            const response = await userApi.updateCmt(token, formData);
            if (response.content.err) {
                notification_error("Failed :(")
                return;
            }
            const comment = response.content.comment_info;

            const data = {
                comments: comments,
                manga_comment_id: comment.manga_comment_id,
                key: 2
            };

            const response02 = await userApi.filterCmts(token, data);
            if (response02.content.err) {
                notification_error("Failed :(")
                return;
            }
            const restCmts = response02.content.comments ? response02.content.comments : [];

            setTimeout(() => setCmtsChildren(restCmts), 200)
        } catch (err) {
            notification_error("Failed :(")
            console.log(err)
        }
    }


    return (
        <div className="btn-more-cont">
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
                    onClick={() => getCmtChildren()}
                >
                    <CaretDownOutlined style={{ fontSize: "13px" }} />
                    View replies
                </Button>
            }

            <CmtChildren
                comments={cmtsChildren}

                addCmt={addCmt}
                deleteCmt={deleteCmt}
                editCmt={editCmt}
            />
        </div>
    )
}
