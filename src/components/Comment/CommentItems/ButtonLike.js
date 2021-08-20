import React, { useState } from 'react'

import { Tooltip } from 'antd'

import { LikeOutlined, LikeFilled } from '@ant-design/icons';


export default function ButtonLike() {
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState("");



    const handleLikeCmt = () => {
        if (action === 'liked') {
            setLikes(likes - 1);
            setAction('dislike');
        } else {
            setLikes(likes + 1);
            setAction('liked');
        }
    };

    return (
        <Tooltip key="btn-like" title={action === 'liked' ? "Dislike" : "Like"}>
            <span
                onClick={() => handleLikeCmt()}
            >
                {action === 'liked'
                    ? <LikeFilled style={{ fontSize: "16px", color: "#1890FF", cursor: "pointer" }} />
                    : <LikeOutlined style={{ fontSize: "16px", color: "#C1C1C1", cursor: "pointer" }} />}
                <span className="comment-likes">{likes}</span>
            </span>
        </Tooltip>
    )
}
