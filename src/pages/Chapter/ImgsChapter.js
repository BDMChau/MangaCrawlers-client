import React, { memo } from 'react'
import "./Chapter.css"
import LazyLoad from 'react-lazyload';
import { Col, Image } from 'antd';

function ImgsChapter({ imgs }) {
    return (
        <Col span={23} xxl={15} className="chapter-pages">
            {imgs.map((img) => (
                // <LazyLoad
                //     key={img.img_id}
                //     placeholder={<Spinner />}
                //     height={500}
                // >
                <div className="page" id={`page_${img.img_id}`}>
                    <Image className="img" id={img.img_id} src={img.img_url} alt="" />
                </div>

                // </LazyLoad>
            ))}
        </Col>

    )
}

export default memo(ImgsChapter);
