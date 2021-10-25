import { Tag } from 'antd'
import React from 'react'


export default function Category({ category, i }) {

    return (
        <Tag
            className="category-tag"
            style={{border:`1px solid ${category.genre_color}`}}
            color={category.genre_color}
            title={category.genre_description}
            key={i}
        >
            {category.genre_name}
        </Tag>
    )
}
