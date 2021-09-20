import React, { useRef } from 'react'
import "../../Tables/Tables.css"
import "../Chart.css"
import "../../../Admin.css"
import { Column, Line } from '@ant-design/charts';
import { Button, Col, Dropdown, Menu, Tooltip, Typography } from 'antd';
import { PicLeftOutlined, CalendarOutlined } from '@ant-design/icons';

export default function MangaChart({ reportManga }) {
    const chartRef = useRef();


    const config = {
        data: reportManga,
        height: 300,
        xField: 'month',
        yField: 'Quantity',
        point: {
            size: 5,
            shape: 'circle',
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
        <Col xxl={16} xs={23} sm={20} className="user-chart">
            <Button type="button" onClick={downloadImage} style={{ marginRight: 24, marginBottom: 30 }}>
                Export image
            </Button>

            <div className="text01">
                <Tooltip title="Manga Series">
                    <PicLeftOutlined style={{ fontSize: "22px", color: "#635f5fdb" }} />
                </Tooltip>
            </div>

            <Column className="chart" {...config} chartRef={chartRef} />
            <div style={{ height: "80px" }} ></div>
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
