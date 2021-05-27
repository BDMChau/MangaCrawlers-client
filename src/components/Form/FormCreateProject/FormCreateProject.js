import React, { useState } from 'react'
import "./FormCreateProject.css"
import { Form, Input, Button, Select, Popconfirm, Upload, Image } from 'antd';
import { GenresTag } from './GenresTag';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

function getBase64Img(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload Thumbnails</div>
    </div>
);

export default function FormCreateProject() {
    const [imgUrl, setImgUrl] = useState("")
    const [fieldsData, setFieldsData] = useState({
        rating: 0,
        views: 0,
    })

    const onChange = (info) => {
        console.log(info)
        getBase64Img(info.file.originFileObj, (url) => {
            console.log(url)
            setImgUrl(url)
        });

    }

    const handleSubmit = () => {
        console.log(fieldsData)
        console.log(imgUrl)
    }

    return (
        <div className="form-create-project">
            <div className="upload-thumbnail">
                <Upload
                    showUploadList={false}
                    listType="picture-card"
                    onChange={(info) => onChange(info)}
                    disabled={imgUrl ? true : false}
                >
                    {imgUrl
                        ? <div>
                            <Button title="clear" className="btn-clear-img" icon={<CloseOutlined style={{ fontSize: "16px" }} />} onClick={() => setImgUrl("")} />
                            <Image src={imgUrl} alt="manga-thumnails" style={{ height: '100%' }} />
                        </div>
                        : uploadButton
                    }

                </Upload>
            </div>

            <Form
                className="form-new-project"
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="Manga Name"
                    rules={[{ required: true, message: 'Please fill the name of manga!' }]}
                >
                    <Input placeholder="Manga Name" allowClear onChange={(e) => setFieldsData({ ...fieldsData, mangaName: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="author"
                    rules={[{ required: true, message: 'Please fill author field!' }]}
                >
                    <Input placeholder="Author" allowClear onChange={(e) => setFieldsData({ ...fieldsData, author: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="genres"
                    rules={[{ required: true, message: 'Please fill genres field!' }]}
                >
                    <GenresTag
                        handleChange={(arrValue) => setFieldsData({ ...fieldsData, genres: arrValue })}
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    rules={[{ required: true, message: 'Please fill status field!' }]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select Status"
                        allowClear
                        onChange={(value) => setFieldsData({ ...fieldsData, status: value })}
                    >
                        <Option value="Ongoing">Ongoing</Option>
                        <Option value="Completed">Completed</Option>

                    </Select>
                </Form.Item>

                <Form.Item
                    name="year release"
                >
                    <Input placeholder="Year release" type="number" onChange={(e) => setFieldsData({ ...fieldsData, publicationYear: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="description"
                >
                    <TextArea
                        placeholder="Description..."
                        onChange={(e) => setFieldsData({ ...fieldsData, description: e.target.value })}
                        style={{ resize: "none", height: "90px" }}
                    />
                </Form.Item>

                <Form.Item
                    name="rating"
                >
                    <Input placeholder="Rating default is 0" disabled={true} />
                </Form.Item>

                <Form.Item
                    name="views"
                >
                    <Input placeholder="Views default is 0" disabled={true} />
                </Form.Item>


                <Form.Item className="item-submit">
                    <Popconfirm
                        title="Add this project?"
                        onConfirm={() => handleSubmit()}
                        onCancel={"cancel"}
                        okText="Create"
                        cancelText="Cancle"
                    >
                        <Button type="primary" htmlType="submit">
                            Create New Project
                        </Button>
                    </Popconfirm>
                </Form.Item>


            </Form>
        </div>
    )
}
