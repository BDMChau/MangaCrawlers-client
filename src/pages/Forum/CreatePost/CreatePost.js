import React, { useEffect } from 'react';
import "./CreatePost.css";

import FormCreatePost from "./FormCreatePost";


export default function CreatePost({ createPost }) {
    return (
        <div>
            <FormCreatePost createPost={createPost} />
        </div>
    )
}
