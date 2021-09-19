import React, { useState, useEffect, memo } from 'react';
import { Area } from '@ant-design/charts';
import { Button, Dropdown, Typography, Menu, Tooltip } from 'antd';
import { PicLeftOutlined, CalendarOutlined } from '@ant-design/icons';


const DashboardChart01 = ({ allReports }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(allReports)
    }, []);


    const menuDropDown = (
        <Menu>
            <Menu.Item>
                <Typography.Text>
                    2021
                </Typography.Text>
            </Menu.Item>
        </Menu>
    );

    const config = {
        data: data,
        xField: 'month',
        yField: 'values',
        seriesField: 'name',
        color: ['#569D6F', '#A35DA2', '#698BBF', "#8BBDC2"],
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
        slider: {
            start: 0,
            end: 12,
            height: 23
        },
        legend: { position: 'top' },
    };

    return (
        <div className="dashbroadchart01">
            <div style={{ margin: "6px 0px 0px 3px", zIndex:"999", position:"absolute" }}>
                <Tooltip title="Quantity">
                    <PicLeftOutlined style={{ fontSize: "20px", color: "#635f5fdb" }} />
                </Tooltip>
            </div>

            <Area style={{ padding: "5px"}} {...config} />

            <div style={{ margin: "-38px 0px 0px -4px", zIndex:"999", position:"absolute" }}>
                <Tooltip title="Month">
                    <CalendarOutlined style={{ fontSize: "20px", color: "#635f5fdb" }} />
                </Tooltip>
            </div>

            <Dropdown overlay={menuDropDown} trigger={['click']}>
                <Button title="Year" style={{ marginLeft: "10px",  marginTop: "5px"  }}>
                    2021
                </Button>
            </Dropdown>
        </div>
    );
};

export default memo(DashboardChart01);
