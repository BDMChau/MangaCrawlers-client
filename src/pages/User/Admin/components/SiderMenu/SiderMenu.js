import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    BarChartOutlined,
    TableOutlined,
    DashboardOutlined
} from '@ant-design/icons';


const { Sider } = Layout;


export default function SiderMenu({ collapsed, setCollapsed, tabSelected, setTabSelected }) {
    const [keySelected, setKeySelected] = useState("1");


    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(val) => setCollapsed(val)}>
            <Menu theme="light" mode="inline" selectedKeys={[keySelected]} onClick={(e) => setKeySelected(e.key)} >
                <Menu.Item key="1" icon={<DashboardOutlined style={{ fontSize: "20px" }} />} onClick={() => setTabSelected("dashboard")} >
                    Dashboard
                </Menu.Item>

                <Menu.Item key="2" icon={<TableOutlined style={{ fontSize: "20px" }} />} onClick={() => setTabSelected("tables")} >
                    Tables
                </Menu.Item>

                <Menu.Item key="3" icon={<BarChartOutlined style={{ fontSize: "20px" }} />} onClick={() => setTabSelected("charts")} >
                    Charts
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
