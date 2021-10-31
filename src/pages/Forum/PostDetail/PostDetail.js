import React from 'react'
import "./PostDetail.css"

import MDEditor from '@uiw/react-md-editor';

export default function PostDetail() {

    return (
        <div>
            <MDEditor.Markdown 
            source={""} 
            />
        </div>
    )
}
