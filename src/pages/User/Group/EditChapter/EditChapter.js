import React, { useEffect, useState } from 'react'
import { arrayMoveImmutable } from 'array-move';

import "./EditChapter.css"
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button, Col, Divider, Dropdown, Empty, Input, Menu, Row, Spin, Typography } from 'antd';
import { CheckOutlined, ArrowLeftOutlined, ZoomInOutlined, ZoomOutOutlined, CloseOutlined, EllipsisOutlined } from "@ant-design/icons"
import MyDragger from 'components/input/MyDragger';
import UploadForm01 from 'components/input/UploadForm/UploadForm01';


export default function EditChapter({
    isLoading,
    imgs,
    setImgs,

    chapterInfo,
    setChapterInfo,

    manga,

    handleEdit,
    loadingEdit,

    handleRemoveImg,

    handleUploadImgs,
    isLoadingUpload
}) {
    const [width, setWidth] = useState(100);
    const [listFileToUpload, setListFileToUpload] = useState([]);

    const listFileTypesAllowed = ["image/png", "image/jpeg", "image/jpg"];


    useEffect(() => {
        if (width <= 100) setWidth(100);
        else if (width >= 600) setWidth(600);
    }, [width])


    const handleSubmitChange = () => {
        handleEdit(chapterInfo, manga, imgs);
    }

    const handleSubmitUpload = async () => {
        if (!listFileToUpload.length) {
            message_error("Nothing to upload!", 3);
            return;
        }

        const sttUpload = await handleUploadImgs(listFileToUpload);
        if(sttUpload === true) {}
    }

    ////////////////////// render //////////////////////
    const SortableItem = SortableElement(({ img }) => (
        <div style={{ display: "flex", flexDirection: "column" }} className="item-img">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5px" }}>
                <b>ID: {img.img_id}</b>

                <Dropdown overlay={
                    <Menu>
                        <Button
                            style={{ border: "none", background: "transparent" }}
                            icon={<CloseOutlined />}
                            onClick={() => handleRemoveImg(img.img_id)}
                        >
                            Remove
                        </Button>
                    </Menu>
                }>
                    <Button
                        style={{ border: "none", borderRadius: "50%", background: "transparent" }}
                        icon={<EllipsisOutlined />}
                    />
                </Dropdown>

            </div>

            <img src={img.img_url} style={{ width: width, padding: "5px", borderRadius: "5px" }} />
        </div>
    ));


    const SortableList = SortableContainer(({ imgs }) => (
        <div className='list-imgs'>
            {isLoading
                ? <Spin style={{ margin: "20px auto" }} />
                : imgs.length
                    ? imgs.map((img, i) => (
                        <SortableItem key={img.img_id} index={i} img={img} disabled={loadingEdit} />
                    ))
                    : <Empty description="No images" style={{ margin: "20px auto" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>

    ));

    const onSortEnd = ({ newIndex, oldIndex }) => {
        setImgs(arrayMoveImmutable(imgs, oldIndex, newIndex));
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
        },
    };


    return (
        <Row justify="center" className="editchapter-cont">
            <Col md={20} xl={20} xs={23} >
                <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0, width: "100%" }}>
                    <Button title="Back" style={{ border: "none", padding: "0" }} onClick={() => history.back()}>
                        <ArrowLeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                    </Button>
                </Divider>
            </Col>

            <Col md={20} xl={20} xs={23} className='manga-info'>
                {Object.keys(manga).length
                    ? <>
                        <img src={manga.thumbnail} style={{ width: "180px" }} />

                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                            <Typography.Title level={3} >{manga.manga_name}</Typography.Title>
                            <Typography.Title level={5}>Author: {manga.manga_authorName}</Typography.Title>
                            <Typography.Title level={5}>{manga.status}</Typography.Title>
                        </div>
                    </>
                    : <Typography.Text>No manga found!</Typography.Text>
                }
            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "20px 0" }} >
                <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", margin: 0 }}></Divider>
            </Col>

            <Col md={20} xl={20} xs={23} className='chapter-info' style={{ margin: "20px 0 0 0" }}>
                <Input
                    addonBefore={"Chapter Name"}
                    title="Chapter Name"
                    value={chapterInfo ? chapterInfo.chapter_name : ""}
                    onChange={(e) => setChapterInfo({ ...chapterInfo, chapter_name: e.target.value })}
                />
            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "10px 0 0 0" }}>
                <SortableList imgs={imgs} onSortEnd={onSortEnd} axis="xy" />
            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "10px 0 0 0" }} >
                <Button
                    type='primary'
                    icon={<CheckOutlined style={{ fontSize: "17px" }} />}
                    onClick={handleSubmitChange}
                    disabled={!Object.keys(chapterInfo).length || !imgs.length}
                    loading={loadingEdit}
                >
                    Submit Change
                </Button>
            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "20px 0" }} >
                <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", margin: 0 }}></Divider>
            </Col>

            <Col md={20} xl={20} xs={23} style={{ margin: "20px 0 0 0" }} >
                <UploadForm01 propsUploader={propsUploader} />

                <Button
                    style={{ margin: "10px 0 0 0" }}
                    type='primary'
                    icon={<CheckOutlined style={{ fontSize: "17px" }} />}
                    onClick={handleSubmitUpload}
                    disabled={!listFileToUpload.length}
                    loading={isLoadingUpload}
                >
                    Upload
                </Button>
            </Col>


            <div className='btn-zoom'>
                <Button
                    className="btn-zoom-in"
                    icon={<ZoomInOutlined style={{ fontSize: "22px", marginTop: "3px" }} />}
                    onClick={() => setWidth(width + 100)}
                />

                <Button
                    className="btn-zoom-out"
                    icon={<ZoomOutOutlined style={{ fontSize: "22px", marginTop: "3px" }} />}
                    onClick={() => setWidth(width - 100)}
                />
            </div>
        </Row >
    )
}
