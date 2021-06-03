import { Button, Col, Divider, Image, message, Row, Typography } from 'antd'
import React, { useState } from 'react'
import "./UploadManga.css"
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { message_error } from '../../components/notifications/message';

const { Dragger } = Upload;

export default function UploadManga({ handleUploadImgs, isLoading }) {
    const [listFileToUpload, setListFileToUpload] = useState([]);
    const history = useHistory();

    const dropDownChapters = (
        <Menu>
            <Menu.Item key="0">
                <a href="https://www.antgroup.com">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="https://www.aliyun.com">2nd menu item</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );

    const handleSubmit = () => {
        if (!listFileToUpload.length) {
            message_error("Nothing to upload!", 3);
            return;
        }

        handleUploadImgs(listFileToUpload);
        return;
    }



    const propsUploader = {
        name: 'file',
        multiple: true,
        listType: "picture",
        beforeUpload: () => false,
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
                    <Image className="img" src="https://images-na.ssl-images-amazon.com/images/I/81-PkJoiu7L.jpg" alt="" ></Image>
                </div>
                <div className="text">
                    <Typography.Title level={3} >Manga Namedbnfdfgnfjghmghgfmfu,h,</Typography.Title>
                    <Typography.Text >Author: bla bla</Typography.Text>
                    <Typography.Text>Ongoing</Typography.Text>
                    <Typography.Text>100 view(s)</Typography.Text>
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
                        <Typography.Title level={5} style={{ color: "#ff4d4f" }} >Note: Format the name of file(s) before upload!</Typography.Title>
                        <Typography.Text style={{ color: "#ff4d4f" }}>Sort the files in ascending order</Typography.Text>
                        <div className="note-example">
                            <Typography.Text>Example:</Typography.Text>
                            <Typography.Text>01: MangaName_Chapter 01: this is chapter01</Typography.Text>
                            <Typography.Text>02: MangaName_Chapter 02: this is chapter02</Typography.Text>
                            <Typography.Text>*01, 02 is serial number of each image</Typography.Text>
                        </div>
                    </div>
                </div>
                <div className="uploader">
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
