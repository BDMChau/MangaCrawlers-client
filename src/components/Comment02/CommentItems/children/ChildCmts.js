import React from 'react';
import "../CommentUI.css";


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

                    isChild={true}
                />
            ))}
        </div>
    );
}
