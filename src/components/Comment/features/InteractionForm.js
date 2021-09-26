import React, { useState } from 'react'
import "../CommentItems/CommentItems.css"

import { Typography } from 'antd'

import InputForm from './InputForm'

export default function InteractionForm() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Typography.Text className="reply" >
                Reply
            </Typography.Text>

            <Typography.Text className="btn-remove">
                Delete
            </Typography.Text>

            {visible
                ? <div style={{ width: "100%" }} > <InputForm /> </div>
                : ""
            }

        </>
    )
}
