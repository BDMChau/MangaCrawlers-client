import React, { useState } from 'react'
import "./styles/Editor.css"

import MDEditor from '@uiw/react-md-editor';
import { Button, Input, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';


export default function MyMarkdown() {
    const [markdown, setMarkdown] = useState("");

    return (
        <div className="md-container">
            <div className="title">
                <Typography.Title level={4}>Write your new post</Typography.Title>
                <Typography.Text>We use Markdown to create post. If you haven't known about the format of Markdown before, you can go <a className="link-instructions" href="https://www.markdownguide.org/basic-syntax/" target="_blank" >Here</a> for instructions ^^</Typography.Text>
            </div>

            <div className="md-editor-cont">
                <Typography.Text>
                    <DownOutlined /> <DownOutlined /> Title is require!!! <DownOutlined /> <DownOutlined />
                </Typography.Text>
                <Input className="input-title" placeholder="Title..." />

                <MDEditor
                    className="md-editor"
                    placeholder="acac"
                    height={600}
                    value={markdown}
                    onChange={setMarkdown}
                />
            </div>

            <div>
                <Button className="btn-post" type="primary" >Create Post</Button>
            </div>
        </div>
    )
}
