import { Button, Col, Divider, Empty, Image, Input, message, Row, Select, Skeleton, Tooltip, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import "./UploadManga.css"
import { LeftOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { message_error } from '../../../../components/toast/message';
import Rating from '../../../../components/Rating/Rating';
import MyDragger from 'components/input/MyDragger'
import handleFile from 'helpers/handleFile'
import cloudinaryApi from 'api/apis/Cloudinary/cloudinaryApi'


export default function UploadManga({ handleUploadImgs, isLoading, manga, setManga, chapters, editMangaInfo }) {
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

            const fileSz = file.size / 1024 / 1024;
            if (fileSz > 10) {
                message_error("An image must smaller than 10MB!")
            }

            const condition = listFileTypesAllowed.includes(file.type) && fileSz <= 10
            return condition ? false : Upload.LIST_IGNORE
        },
        onChange(info) {
            setListFileToUpload(info.fileList);
        }
    };


    const propsUpload = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        maxCount: 1,
        beforeUpload: (file) => false,
        onChange: (info) => onChangeFile(info)
    };

    const onChangeFile = async (info) => {
        const file = info.file;

        const res = await cloudinaryApi.uploadFile(file, "manga_thumbnails/updated");
        const url = res.data.secure_url;

        setManga({...manga, thumbnail: url})
    }

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
                    <Upload {...propsUpload} >
                        <Button icon={<UploadOutlined />} title="Upload new thumbnail" style={{ width: "150px" }}></Button>
                    </Upload>
                </div>

                <div className="text">
                    <Input
                        addonBefore={"Manga Name"}
                        title="Name"
                        value={manga ? manga.manga_name : ""}
                        onChange={(e) => setManga({ ...manga, manga_name: e.target.value })}

                    />

                    <Input
                        addonBefore={"Author"}
                        title="Author"
                        value={manga ? manga.manga_authorName : ""}
                        onChange={(e) => setManga({ ...manga, manga_authorName: e.target.value })}
                    />

                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select Status"
                        allowClear
                        value={manga ? manga.status : ""}
                        onChange={(value) => setManga({ ...manga, status: value })}
                    >
                        <Select.Option value="Ongoing">Ongoing</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                    </Select>


                    <Input.TextArea
                        style={{ margin: "5px 0", height: "100px" }}
                        title="Author"
                        placeholder='Description'
                        value={manga ? manga.description : ""}
                        onChange={(e) => setManga({ ...manga, description: e.target.value })}
                    />

                    <Typography.Text>{manga ? manga.views : ""} view(s)</Typography.Text>
                    <div style={{ pointerEvents: "none" }} >
                        <Rating stars={manga ? manga.stars : ""} />
                    </div>

                    <Button
                        type='primary'
                        icon={<EditOutlined style={{ fontSize: "18px" }} />}
                        style={{ borderRadius: "3px" }}
                        onClick={() => editMangaInfo(manga)}
                    >
                        Submit Change
                    </Button>
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

                    <MyDragger propsUploader={propsUploader} />

                    <div className="uploader-submit">
                        <Button type="primary" onClick={() => handleSubmit()} loading={isLoading} >Upload Images</Button>
                    </div>
                </div>
            </Col>

        </Row>
    )
}
