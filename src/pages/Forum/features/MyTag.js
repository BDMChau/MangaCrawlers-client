import { Tag } from 'antd'
import { unset } from 'lodash'
import React from 'react'


export default function MyTag({ category, key, padding }) {

    return (
        <Tag
            className="category-tag"
            style={{ padding: padding ? padding : unset }}
            color={category.color === "none" ? "" : category.color}
            title={category.name}
            key={key}
        >
            {category.name}
        </Tag>
    )
}
