import React, { useEffect, useState } from 'react'
import "../CommentUI.css"
import { Typography, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import InteractionForm from 'components/Comment02/CommentItems/components/InteractionForm';
import { format } from 'helpers/format';
import { NavLink } from 'react-router-dom';


export default function CmtBottom({
    comment,

    deleteCmt,
    editCmt,
    addCmt,

    isAddedCmt,
    setIsAddedCmt,

    recieveEditedCmt,
    recieveDeletedCmt
}) {
    const userState = useSelector(state => state.userState);

    return (
        <div className="cmt-bottom">
            {userState[0]
                ? <div className="interact">
                    <InteractionForm
                        comment={comment}

                        userId={userState[0].user_id}

                        deleteCmt={deleteCmt}

                        addCmt={(dataInput) => addCmt(dataInput)}
                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}

                        editCmt={editCmt}

                        recieveEditedCmt={recieveEditedCmt}
                        recieveDeletedCmt={recieveDeletedCmt}
                    />
                </div>
                : ""
            }

        </div>
    )
}