import React, { useEffect, useState } from 'react'
import "../CommentItems.css"
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
}) {
    const [cmt, setCmt] = useState({})


    useEffect(() => {
        setCmt(comment);
    }, [comment])

    return (
        <div className="cmt-body" key={cmt.manga_comment_id} style={{ background: background }} >
            <div style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: cmt.manga_comment_content }} />
            
            {cmt.image_url ? <img src={cmt.image_url} alt="" style={{ height: "110px", width: "fit-content", borderRadius: "8px", marginTop: "5px" }} /> : ""}

            <CmtBottom
                comment={cmt}
                deleteCmt={deleteCmt}
                editCmt={editCmt}

                addCmt={(dataInput) => addCmt(dataInput)}
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
            />

            <Typography.Text style={{ color: "#FF4D4F" }}>
                {comment.is_error ? "Error, cannot add this comment!" : ""}
            </Typography.Text>
        </div>
    )
}
