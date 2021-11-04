import React, { useEffect, useState } from 'react'
import "components/Editor/styles/Editor.css"

import MDEditor from '@uiw/react-md-editor';
import { Button, Input, Typography, Select, Form } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { MySelectTags } from './features/MySelectTags';


export default function FormCreatePost({ createPost }) {
    const forumState = useSelector((state) => state.forumState);
    const [categoriesState, setCategoriesState] = useState(forumState[0]?.length ? forumState[0] : []);

    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [markdown, setMarkdown] = useState("");

    const [isMissing, setIsMissing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const handleCreate = async () => {
        if (!title || !categories.length || !markdown) {
            setIsMissing(true);
            return;
        }
        setIsLoading(true);

        const data = {
            title: title,
            categoriesId: categories,
            content: markdown
        };
        console.log(data)
        const res = await createPost(data);

        localStorage.removeItem("categories_createpost");
        setIsLoading(false);
    }


    return (
        <div className="md-container">
            <div className="title">
                <Typography.Title level={4}>Write your new post</Typography.Title>
                <Typography.Text>We use Markdown to create post. If you haven't known about the format of Markdown before, you can go <a className="link-instructions" href="https://www.markdownguide.org/basic-syntax/" target="_blank" >Here</a> for instructions ^^</Typography.Text>
            </div>

            <div className="md-editor-cont">

                <Form
                    className=""
                    name="basic"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        style={{ marginBottom: "0px" }}
                        name="title"
                        rules={[{ required: true, message: 'Please fill in the title!' }]}
                    >
                        <Input className="input-title" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />

                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: "0px" }}
                        name="categories"
                        rules={[{ required: true, message: 'Please select categories!' }]}
                    >
                        <div className="category-selector">
                            <MySelectTags
                                data={categoriesState}
                                title="categories"
                                handleChange={(arrValue) => setCategories(arrValue)}
                            />
                        </div>
                    </Form.Item>
                </Form>


                <MDEditor
                    className="md-editor"
                    placeholder="acac"
                    height={600}
                    value={markdown}
                    onChange={setMarkdown}
                />

                <MDEditor.Markdown source={markdown} />
            </div>

            {isMissing
                ? <Typography.Text style={{ color: "#f5212d" }}>
                    <UpOutlined /> <UpOutlined /> All fields above are require!!! <UpOutlined /> <UpOutlined />
                </Typography.Text>
                : ""
            }

            <div style={{ marginTop: "10px" }} >
                <Button
                    className="btn-post"
                    type="primary"
                    onClick={handleCreate}
                    loading={isLoading}
                >
                    Create Post
                </Button>
            </div>
        </div>
    )
}
