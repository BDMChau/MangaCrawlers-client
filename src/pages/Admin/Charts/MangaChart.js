import React, { useRef } from 'react'
import "../Tables/Tables.css"
import "./Chart.css"
import "../Admin.css"
import { Line } from '@ant-design/charts';
import { Button, Col, Dropdown, Menu, Tooltip, Typography } from 'antd';
import { PicLeftOutlined, CalendarOutlined } from '@ant-design/icons';

export default function MangaChart() {
    const chartRef = useRef();
    const data = [
        {
            month: '01',
            value: 3,
        },
        {
            month: '02',
            value: 4,
        },
        {
            month: '03',
            value: 3.5,
        },
        {
            month: '04',
            value: 5,
        },
        {
            month: '05',
            value: 4.,
        },
        {
            month: '6',
            value: 4.9,
        },
        {
            month: '7',
            value: 3,
        },
        {
            month: '8',
            value: 4.5,
        },
    ];

    const config = {
        data,
        height: 300,
        xField: 'month',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#2593fc',
                lineWidth: 2,
            },
        },
    };

    // export image
    const downloadImage = () => {
        chartRef.current?.downloadImage();
    };

    const menuDropDown = (
        <Menu>
            <Menu.Item>
            <Typography.Text>
                    2021
            </Typography.Text>
            </Menu.Item>
        </Menu>
    );

    return (
        <Col xxl={14} xs={23} sm={20} className="user-chart">
            <Button type="button" onClick={downloadImage} style={{ marginRight: 24, marginBottom: 30 }}>
                Export image
            </Button>

            <div className="text01">
                <Tooltip title="Number of Manga Series">
                    <PicLeftOutlined style={{ fontSize: "22px", color: "#635f5fdb" }} />
                </Tooltip>
            </div>
            <Line className="chart" {...config} chartRef={chartRef} />


            <div className="chart-action">
                <div className="text02">
                    <Tooltip title="Month">
                        <CalendarOutlined style={{ fontSize: "22px", color: "#635f5fdb" }} />
                    </Tooltip>
                </div>
                <Dropdown overlay={menuDropDown} trigger={['click']}>
                    <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        2021
            </Button>
                </Dropdown>
            </div>
        </Col>
    );

}
