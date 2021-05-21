import React, { useRef } from 'react'
import "../Tables/Tables.css"
import "./Chart.css"
import "../Admin.css"
import { Line } from '@ant-design/charts';
import { Button, Col, Dropdown, Menu } from 'antd';

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
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    2019
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    2020
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    2021
            </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Col xxl={14} xs={23} sm={20} className="user-chart">
            <Button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
                Export image
            </Button>
            <Line className="chart" {...config} chartRef={chartRef} />

            <Dropdown overlay={menuDropDown} trigger={['click']}>
                <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    2021
                </Button>
            </Dropdown>
        </Col>
    );

}
