import { Tag } from 'antd'
import { unset } from 'lodash'
import React from 'react'


export default function MyTag({ category, key, padding }) {

    return (
        <Tag
            style={{ padding: padding ? padding : unset, border: "none", fontSize:"13px" }}
            color={category.color === "none" ? "" : category.color}
            title={category.name}
            key={key}
        >
            {category.name}
        </Tag>
    )
}
