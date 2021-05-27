import { Button, Col, Divider, Image, Row, Typography } from 'antd'
import React from 'react'
import "./UploadManga.css"
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

export default function UploadManga() {
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

    const propsUploader = {
        name: 'file',
        multiple: true,
        listType: "picture",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
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
                </div>
            </Col>

        </Row>
    )
}
