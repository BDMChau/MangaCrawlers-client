import React from 'react'
import { BarsOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Button, Menu, Popconfirm } from 'antd'
import { NavLink } from 'react-router-dom'


const DropOption = ({
    onMenuClick,
    menuOptions = [],
    buttonStyle,
    dropdownProps,
}) => {
    const menu = menuOptions.map((item, i) => (
        item.keyId === "delete"
            ? <Popconfirm
                placement="top"
                title="Do you want to continue?"
                onConfirm={item.funcAction}
                onCancel={"cancel"}
                okText="Confirm"
                cancelText="Cancle"
            >
                <Menu.Item icon={item.icon} key={item.key} style={{ color: "#629EFF", cursor: "pointer", padding: "10px" }} >{item.name}</Menu.Item>
            </Popconfirm>

            : <NavLink to={item.path ? item.path : "#"} key={i}>
                <Menu.Item style={{ color: "#629EFF", cursor: "pointer", padding: "10px" }} key={item.key}>{item.name}</Menu.Item>
            </NavLink>
    ))

    return (
        <Dropdown
            trigger={['click']}
            overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
            {...dropdownProps}
        >
            <Button style={{ border: 'none', ...buttonStyle }}>
                <BarsOutlined style={{ marginRight: 5 }} />
                <DownOutlined />
            </Button>
        </Dropdown>
    )
}


export default DropOption
