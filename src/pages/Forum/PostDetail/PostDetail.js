import React from 'react'
import "./PostDetail.css"

import MDEditor from '@uiw/react-md-editor';
import CommentContainter from 'components/Comment/CommentContainter/CommentContainter';
import { Button, Col, Divider, Row } from 'antd';
import { LeftOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';

export default function PostDetail({ postInfo }) {
    const history = useHistory();

    return (
        <div className="post-detail-page">
            <Row justify={"center"} className="row" >
                <Col xs={23} md={23} xl={23} >
                    <Divider orientation="left" style={{ borderTopColor: "#a2a2a2", marginBottom: 0 }}>
                        <Button title="Back to forum page" className="btn-back" onClick={() => history.push("/forum")}>
                            <LeftOutlined style={{ fontSize: "20px", margin: "4px 0px 0px -6px" }} />
                        </Button>
                    </Divider>
                </Col>

                <Col className="post-detail" xs={22} md={22} xl={22} >
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
