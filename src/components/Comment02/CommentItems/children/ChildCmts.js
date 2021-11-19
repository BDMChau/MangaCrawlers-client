import React, { memo } from 'react';
import "../CommentUI.css";


import CmtItem from '../components/CmtItem';



function ChildCmts({
    comments,
    cmtId,

    addCmt,
    deleteCmt,
    editCmt,

    isAddedCmt,
    setIsAddedCmt 
}) {
    return (
        <div className="child-cmts-cont">
            {comments.map((cmt, i) => (
                cmt.parent_id === cmtId
                    ? <CmtItem
                        key={i}
                        comment={cmt}
                        addCmt={addCmt}
                        deleteCmt={deleteCmt}
                        editCmt={editCmt}

                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}

                        isChild={true}
                    />
                    : ""
            ))}
        </div>
    );
}

export default ChildCmts;