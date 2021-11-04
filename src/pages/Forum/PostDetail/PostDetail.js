import React from 'react'
import "./PostDetail.css"

import MDEditor from '@uiw/react-md-editor';
import CommentContainter from 'components/Comment/CommentContainter/CommentContainter';
import { Avatar, Button, Col, Divider, Row, Typography } from 'antd';
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';

export default function PostDetail({ postInfo }) {
    const history = useHistory();
    // post: {post_id: 7, title: "title of post 01",…}
    // categoryList: [{category_id: 1, name: "cate 1↵", description: "aaa", color: "yellow"},…]
    // 0: {category_id: 1, name: "cate 1↵", description: "aaa", color: "yellow"}
    // category_id: 1
    // color: "yellow"
    // description: "aaa"
    // name: "cate 1\n"
    // 1: {category_id: 3, name: "cate 3", description: "ccc", color: "red"}
    // content: "\n[![OpenStore](https://open-store.io/badges/en_US.png)](https://open-store.io/app/me.lduboeuf.stellarium)\n\n[Stellarium](https://stellarium.org) on Mobile.\n\nThis is an adaptation of Cheng Xinlun's Stellarium app for Android/Ios : https://github.com/chengxinlun/Stellarium-android ,\n\nRe-used compressed assets from initial work: https://noctua-software.com/stellarium-mobile 1.29 version\n\n## Build for Ubuntu Touch\n\n`clickable -c ubuntu_touch/clickable.json`\n\n\n## Translate\nhttps://hosted.weblate.org/projects/stellarium-mobile/app/ for stellarium core translations\n\nSky cultures translation is not available there due to the one \"pot\" file limitation, see `po/stellarium-skycultures` and `mobileData/skycultures`\n\n\n### Update translation\n\n- Translations `.pot` files are updated with command `make translate_core` and `make translate_skyculture` ( project need to be build first with qmake)\n- To merge `po` files in `qm` files use the script `translation_generator.sh`\n\n\n\n\n## Copyrights:\n    Original Stellarium dev team\n    Noctua-Software"
    // created_at: 1636011970638
    // post_id: 7
    // title: "title of post 01"
    // user_avatar: "https://res.cloudinary.com/mangacrawlers/image/upload/v1635050756/users_avatar/file_gkyiph.png"
    // user_email: "bdmchau105@gmail.com"
    // user_id: 9
    // user_isAdmin: true
    // user_name: "Chou"
    return (
        <div className="post-detail-page">
            <Row justify={"center"} className="row" >
                <Col xs={23} md={23} xl={23} >
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                        <Button title="Back" className="btn-back" onClick={() => history.goBack()}>
                            <LeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                        </Button>
                    </Divider>
                </Col>

                <Col className="post-detail" xs={22} md={22} xl={22}>                    
                    <div className="post-owner">
                        <Avatar className="avatar" src={postInfo.user_avatar} title="Avatar" alt="" />

                        <div className="owner-info">
                            <Typography.Title level={5} title={postInfo.user_name}>{postInfo.user_name}</Typography.Title>
                            <Typography.Text className="date-created" >{postInfo.created_at}</Typography.Text>
                        </div>

                    </div>
                    
                    <Typography.Title level={4}>{postInfo.title}</Typography.Title>
                    <Divider orientation="left" style={{ margin: 0, marginBottom:"30px" }} />

                    <MDEditor.Markdown
                        source={postInfo.content}
                    />
                </Col>

                <Col className="cmt-post-detail" xs={22} md={22} xl={22}>
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: "30px" }} />

                    <CommentContainter />
                </Col>
            </Row>
        </div>
    )
}
