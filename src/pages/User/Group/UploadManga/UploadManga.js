import { Button, Col, Divider, Empty, Image, Input, message, Row, Skeleton, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import "./UploadManga.css"
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { message_error } from '../../../../components/notifications/message';
import Rating from '../../../../components/Rating/Rating';

const { Dragger } = Upload;

export default function UploadManga({ handleUploadImgs, isLoading, manga, chapters }) {
    const [listFileToUpload, setListFileToUpload] = useState([]);
    const [chapterName, setChapterName] = useState("");
    const history = useHistory();

    const listFileTypesAllowed = ["image/png", "image/jpeg", "image/jpg"]

    const dropDownChapters = (
        chapters.length
            ? <Menu>
                {
                    chapters.map((chapter, i) => (
                        <Menu.Item key={i} className="chapter-item-upload-page">
                            <Typography.Text className="name">{chapter.chapter_name}</Typography.Text>
                            <Typography.Text className="time">{chapter.createdAt}</Typography.Text>
                        </Menu.Item>
                    ))
                }
            </Menu>
            : <Empty
                description=""
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ padding: "20px 0", textAlign: "center" }}
            />

    );

    const handleSubmit = () => {
        if (!listFileToUpload.length) {
            message_error("Nothing to upload!", 3);
            return;
        } else if (!chapterName) {
            message_error("Chapter's name is missing!", 3);
            return;
        }

        handleUploadImgs(listFileToUpload, chapterName);
        return;
    }



    const propsUploader = {
        name: 'file',
        multiple: true,
        listType: "picture",
        beforeUpload: (file) => {
            if (!listFileTypesAllowed.includes(file.type)) {
                message_error("Please select jpeg, png files!")
            }

            return listFileTypesAllowed.includes(file.type) ? false : Upload.LIST_IGNORE
        },
        onChange(info) {
            setListFileToUpload(info.fileList);
        }
    };


    return (
        <Row justify={"center"}>
            <Col sm={24} md={21} xl={21} xxl={21} className="divider-upload-page" >
                <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0, width: "100%" }}>
                    <Button title="Back to projects page" className="btn-back-to-projects" onClick={() => history.push("/user/projects")}>
                        <LeftOutlined style={{ fontSize: "18px", margin: "4px 0px 0px -5px" }} />
                    </Button>
                </Divider>
            </Col>

            <Col sm={23} md={21} xl={21} xxl={21} className="title-upload-page" >
                <div className="thumb-img">
                    <Image className="img" src={manga ? manga.thumbnail : ""} alt="" ></Image>
                </div>

                <div className="text">
                    <Typography.Title level={3} >{manga ? manga.manga_name : ""}</Typography.Title>
                    <Typography.Text >Author: {manga ? manga.manga_authorName : ""}</Typography.Text>
                    <Typography.Text>{manga ? manga.status : ""}</Typography.Text>
                    <Typography.Text>{manga ? manga.views : ""} view(s)</Typography.Text>
                    <div style={{ pointerEvents: "none" }} >
                        <Rating stars={manga ? manga.stars : ""} />
                    </div>
                </div>
            </Col>

            <Col sm={23} md={21} xl={21} xxl={21} className="upload-form" >
                <div className="chapter-dropdown">
                    <Dropdown overlay={dropDownChapters} trigger={['click']}>
                        <Button onClick={e => e.preventDefault()}>
                            Chapters Uploaded <DownOutlined />
                        </Button>
                    </Dropdown>

                    <div className="uploader-note">
                        <Typography.Title level={5} style={{ color: "#ff4d4f" }} >Notice*: Sort the file(s) in your folder in ascending order before upload!</Typography.Title>
                        {/* <Typography.Text style={{ color: "#ff4d4f" }}>Sort the files in ascending order</Typography.Text> */}
                        {/* <div className="note-example">
                            <Typography.Text>Example:</Typography.Text>
                            <Typography.Text>01: MangaName_Chapter 01: This is chapter01</Typography.Text>
                            <Typography.Text>02: MangaName_Chapter 01: This is chapter01</Typography.Text>
                            <Typography.Text>*01, 02 is serial number of each image</Typography.Text>
                        </div> */}
                    </div>
                </div>
                <div className="uploader">
                    <div className="input-chapter-name">
                        <Tooltip title="Chapter's name" >
                            <Input
                                type="text"
                                minLength={1}
                                placeholder="Chapter's name"
                                onChange={(e) => setChapterName(e.target.value)}
                            />
                        </Tooltip>
                    </div>

                    <Dragger {...propsUploader}>
                        <div className="upload-drag-icon">
                            <CloudUploadOutlined style={{ fontSize: "32px" }} />
                        </div>
                        <Typography.Title level={5} className="upload-text">Click or drag file here</Typography.Title>
                        <Typography.Text className="upload-hint">
                            Support for a single or bulk upload.
                        </Typography.Text>
                    </Dragger>

                    <div className="uploader-submit">
                        <Button onClick={() => handleSubmit()} loading={isLoading} >Submit Upload</Button>
                    </div>
                </div>
            </Col>

        </Row>
    )
}
