import React from 'react';
import "pages/User/Group/UploadManga/UploadManga.css"
import { CloudUploadOutlined } from '@ant-design/icons';
import { Typoraphy, Upload } from 'antd'

const { Dragger } = Upload;

export default function MyDragger({ propsUploader }) {
    return (
        <Dragger {...propsUploader}>
            <div className="upload-drag-icon">
                <CloudUploadOutlined style={{ fontSize: "32px" }} />
            </div>
            <Typography.Title level={5} className="upload-text">Click or drag file here</Typography.Title>
            <Typography.Text className="upload-hint">
                Support for a single or bulk upload.
            </Typography.Text>
        </Dragger>
    )
}
