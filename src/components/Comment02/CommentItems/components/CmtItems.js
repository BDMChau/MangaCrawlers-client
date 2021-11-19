import { Empty } from 'antd'
import React, { memo } from 'react'
import CmtItem from './CmtItem'

function CmtItems({
    targetId,
    targetTitle,

    comments,

    deleteCmt,
    editCmt,
    addCmt,

    isAddedCmt,
    setIsAddedCmt,
}) {

    return (
        <>
            {comments.length
                ? comments.map((cmt, i) => (
                    <CmtItem
                        targetId={targetId}
                        targetTitle={targetTitle}

                        key={i}
                        comment={cmt}
                        addCmt={addCmt}
                        deleteCmt={deleteCmt}
                        editCmt={editCmt}

                        isAddedCmt={isAddedCmt}
                        setIsAddedCmt={setIsAddedCmt}

                        isChild={false }
                    />
                ))

                : <div style={{ height: "unset" }} >
                    <Empty
                        style={{ marginTop: "40px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No comments to present :("
                    />
                </div>}
        </>
    )
}

export default memo(CmtItems);
