import { Tag } from 'antd'
import React from 'react'


export default function MyTag({ category, i }) {

    return (
        <Tag
            className="category-tag"
            style={{ border: `1px solid ${category.color}` }}
            color={category.color === "none" ? "" : category.color}
            title={category.name}
            key={i}
        >
            {category.name}
        </Tag>
    )
}
