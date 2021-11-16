import { Tag } from 'antd'
import redirectURI from 'helpers/redirectURI'
import React from 'react'
import { NavLink } from 'react-router-dom'


export default function MyTag({ category, key, padding }) {

    return (
        <NavLink to={redirectURI.postPageWithCate_uri(category.category_id)} >
            <Tag
            style={{ padding: "2px 5px", margin: "2px", fontSize:"13px" }}
            color={category.color === "none" ? "" : category.color}
            title={category.name}
            key={key}
        >
            {category.name}
        </Tag>
        </NavLink>
    )
}
