import React from 'react';
import "../CommentItems.css";

import CmtTitle from '../components/CmtTitle';
import CmtBody from '../components/CmtBody';
import { NavLink } from 'react-router-dom';
import CmtItem from '../components/CmtItem';



export default function ChildCmts({ comments, addCmt, deleteCmt, editCmt, isAddedCmt, setIsAddedCmt  }) {
    return (
        <div className="child-cmts-cont">
            {comments.map((cmt, i) => (
                <CmtItem
                    key={i}
                    comment={cmt}
                    addCmt={addCmt}
                    deleteCmt={deleteCmt}
                    editCmt={editCmt}

                    isAddedCmt={isAddedCmt}
                    setIsAddedCmt ={setIsAddedCmt }

                    isShowReplyBtn={false}
                />
            ))}
        </div>
    );
}
