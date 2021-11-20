import React, { useEffect, useState } from 'react'
import "../CommentUI.css"
import { Typography } from 'antd'
import CmtBottom from './CmtBottom'


export default function CmtBody({
    comment,
    background,
    deleteCmt,
    editCmt,
    addCmt,
    isAddedCmt,
    setIsAddedCmt,

    recieveEditedCmt,
    recieveDeletedCmt
}) {
 

    return (
        <div className="cmt-body" key={comment.comment_id} style={{ background: background }} >
            <div style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: comment.comment_content }} />
            {/* <div style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: comment.comment_id }} /> */}
            
            {comment.image_url ? <img src={comment.image_url} alt="" style={{ height: "110px", width: "fit-content", borderRadius: "8px", marginTop: "5px" }} /> : ""}

            <CmtBottom
                comment={comment}
                deleteCmt={deleteCmt}
                editCmt={editCmt}

                addCmt={addCmt}
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
                
                recieveEditedCmt={recieveEditedCmt}
                recieveDeletedCmt={recieveDeletedCmt}
            />

            <Typography.Text style={{ color: "#FF4D4F" }}>
                {comment.is_error ? "Error, cannot add this comment!" : ""}
            </Typography.Text>
        </div>
    )
}
