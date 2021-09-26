import React, { useState, useEffect } from 'react';
import "./CommentContainter.css";

import CommentItems from '../CommentItems/CommentItems';
import InputForm from '../features/InputForm';



export default function CommentContainter({
    mangaId,

    addCmt,
    setIsAddedCmt,
    isAddedCmt,
    isAdding,
    isEndCmts,

    getCmtsManga,
    comments
}) {
    // const [comments, setComments] = useState([
    //     {
    //         manga: "...",
    //         content: "cmt 01",
    //         children: [
    //             {
    //                 content: " cmt child 011_0111",
    //                 children: [
    //                     {
    //                         content: " cmt child 011_0111_01111111",
    //                     },
    //                     {
    //                         content: " cmt child 011_0111_02222222",
    //                     },
    //                 ]
    //             },

    //             {
    //                 content: " cmt child 011_0222"
    //             },
    //         ]
    //     },
    //     {
    //         manga: "...",
    //         content: "cmt 02",
    //         children: [
    //             {
    //                 content: " cmt child 022_0111"
    //             },

    //             {
    //                 content: " cmt child 022_0222",
    //                 children: [
    //                     {
    //                         content: " cmt child 022_0222_01111111",
    //                     },
    //                     {
    //                         content: " cmt child 022_0222_02222222",
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         manga: "...",
    //         content: "cmt 04",
    //         children: []
    //     },
    //     {
    //         manga: "...",
    //         content: "cmt 03",
    //         children: [
    //             {
    //                 content: " cmt child 033_0111"
    //             },

    //             {
    //                 content: " cmt child 033_0222"
    //             },
    //             {
    //                 content: " cmt child 033_0333"
    //             },
    //             {
    //                 content: " cmt child 033_0444"
    //             },
    //         ]
    //     },
    // ])


 

    return (
        <div className="comments-form">
            <InputForm    
                isAddedCmt={isAddedCmt}
                setIsAddedCmt={setIsAddedCmt}
                addCmt={(content) => addCmt(content)}
            />

            {/* render cmts */}
            <CommentItems
                comments={comments}
                getCmtsManga={() => getCmtsChapter()}
                isEndCmts={isEndCmts}

                mangaId={mangaId}
            />
        </div>
    )
}
