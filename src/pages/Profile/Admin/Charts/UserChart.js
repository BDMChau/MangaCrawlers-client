import React, { useRef } from 'react';
import "../Tables/Tables.css"
import "./Chart.css"
import "../Admin.css"
import { Line } from '@ant-design/charts';
import { Button } from 'antd';


export default function UserChart() {
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
    const ref = useRef();

    // export image
    const downloadImage = () => {
        ref.current?.downloadImage();
    };

    return (
        <div>
            <Button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
                Export image
            </Button>
            <Line {...config} chartRef={ref} />
        </div>
    );

}
