import React, { memo } from 'react'
import { Rate } from 'antd';
import "./Rating.css";

function Rating() {

    
    return (
        <Rate
            className="rating"
            allowHalf={false}
            allowClear={true}
            defaultValue={4}
            count={5}
            onChange={(value) => console.log(value)}
        />
    )
}

export default Rating