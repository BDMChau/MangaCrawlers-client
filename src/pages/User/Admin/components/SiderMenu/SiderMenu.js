import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    BarChartOutlined,
    TableOutlined,
    DashboardOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router';


const { Sider } = Layout;


export default function SiderMenu({ collapsed, setCollapsed, tabSelected, setTabSelected }) {
    const [keySelected, setKeySelected] = useState(null);
    const history = useHistory();


    useEffect(() => {
        if (tabSelected === "charts") setKeySelected("3");
        else if (tabSelected === "tables") setKeySelected("2");
        else setKeySelected("1");
    }, [tabSelected])


    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(val) => setCollapsed(val)}>
            <Menu theme="light" mode="inline" selectedKeys={[keySelected]} onClick={(e) => setKeySelected(e.key)} >
                <Menu.Item key="1" icon={<DashboardOutlined style={{ fontSize: "20px" }} />} onClick={() => history.push("admin?v=dashboard")} >
                    Dashboard
                </Menu.Item>

                <Menu.Item key="2" icon={<TableOutlined style={{ fontSize: "20px" }} />} onClick={() => history.push("admin?v=tables")} >
                    Tables
                </Menu.Item>

                <Menu.Item key="3" icon={<BarChartOutlined style={{ fontSize: "20px" }} />} onClick={() => history.push("admin?v=charts")} >
                    Charts
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
