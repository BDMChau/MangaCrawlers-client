import React from 'react';
import "./UploadForm01.css";

import { Button, Upload } from 'antd'
import { UploadOutlined } from "@ant-design/icons"

export default function UploadForm01({ propsUploader }) {
    return (
        <Upload {...propsUploader}>
            <Button icon={<UploadOutlined />}>Upload more images</Button>
        </Upload>
    )
}
