import React from 'react'
import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
    TableOutlined,
    DashboardOutlined
} from '@ant-design/icons';


const { Sider } = Layout;


export default function SiderMenu({ collapsed, setCollapsed }) {
    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(val) => setCollapsed(val)}>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<DashboardOutlined style={{ fontSize: "20px" }} />}>
                    Dashboard
                </Menu.Item>

                <Menu.Item key="2" icon={<TableOutlined style={{ fontSize: "20px" }} />}>
                    Tables
                </Menu.Item>

                <Menu.Item key="3" icon={<PieChartOutlined style={{ fontSize: "20px" }} />}>
                    Charts
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
