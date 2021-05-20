import React, { memo } from 'react'
import { Rate } from 'antd';
import "./Rating.css";

function Rating({ stars }) {


    return (
        <Rate
            className="rating"
            allowHalf={false}
            allowClear={true}
            defaultValue={stars}
            count={5}
            onChange={(value) => console.log(value)}
        />
    )
}

export default Rating