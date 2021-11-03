import React from 'react'
import "./PostDetail.css"

import MDEditor from '@uiw/react-md-editor';
import CommentContainter from 'components/Comment/CommentContainter/CommentContainter';

export default function PostDetail() {

    return (
        <div>
            <MDEditor.Markdown 
            source={""} 
            />

            <CommentContainter />
        </div>
    )
}
