import React, { useEffect, useState } from 'react'
import "../CommentItems.css"
import { Typography, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import InteractionForm from 'components/Comment02/CommentItems/components/InteractionForm';
import { format } from 'helpers/format';
import { NavLink } from 'react-router-dom';


export default function CmtBottom({ comment, deleteCmt, editCmt, addCmt, isAddedCmt, setIsAddedCmt }) {
    const userState = useSelector(state => state.userState);
    const [cmt, setCmt] = useState({})

    useEffect(() => {
        setCmt(comment);
    }, [comment])

  
    return (
        <div className="cmt-bottom">
            <Typography.Text title={format.formatDate02(cmt.manga_comment_time)} style={{ color: cmt.is_error ? "#D7D8DB" : "#848587" }}>
                {format.relativeTime(cmt.manga_comment_time)}
            </Typography.Text>

            {userState[0]
                ? <div className="interact">
                    <InteractionForm
                        comment={cmt}
                        cmtId={cmt.manga_comment_time}
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

        </div>
    )
}