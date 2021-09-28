import React, { useState, useEffect } from 'react'
import "../../../Admin.css"
import "../Tables.css"
import "../../../components/Charts/Chart.css"
import { DeleteOutlined } from '@ant-design/icons';

import { Table, Col, Button, Input } from 'antd';
import DropOption from 'components/DropOption/DropOption';

export default function TransGrTable({ transGrs, handleRemoveTransGroup, isLoading }) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (transGrs.length) setData(transGrs);
    }, [transGrs])

    const onSearch = (val) => {
        setTimeout(() => {
            if (val) {
                const result = transGrs.filter(item => item.transgroup_name.toLowerCase().includes(val.toLowerCase()))

                setData(result)
            } else {
                setData(transGrs)
            }
        }, 300);
    }

    const columns = [
        {
            title: 'TEAM NAME',
            dataIndex: 'transgroup_name',
            key: 'transgroup_name',
            fixed: 'left',
            width: "6%",
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            width:"8%",
            title: 'TEAM EMAIL',
            dataIndex: 'transgroup_email',
            key: 'transgroup_email',
            render: text => <p>{text}</p>,
        },
        // {
        //     title: 'Members',
        //     key: 'members',
        //     dataIndex: 'members',
        //     render: text => <a>{text} member(s)</a>
        // },
        {
            title: 'OPERATION',
            key: 'operation',
            fixed: 'right',
            width: '8%',
            render: (transgroup) => (
                <DropOption
                    menuOptions={[
                        { key: '2', name: `Delete`, icon: <DeleteOutlined style={{ fontSize: "20px" }} />, keyId: "delete", funcAction: () => handleRemoveTransGroup(transgroup.transgroup_id) },
                    ]}
                />
            ),
        },
    ];

    return (
        <Col xxl={14} xs={23} sm={20} className="table-trans-gr">
            <Input placeholder="Search..." onChange={(e) => onSearch(e.target.value)} style={{ width: 200, margin: '5px 11px' }} />
            <div style={{ display: "flex" }}>
                {
                    isLoading
                        ? <Button className="table-btn-loading" loading={isLoading}></Button>
                        : ""
                }
            </div>

            <Table
                className="trans-gr-table"
                columns={columns}
                bordered
                simple
                dataSource={data}
                pagination={{
                    showTotal: () => `Total ${transGrs.length} Translation Teams`,
                }}
                rowKey={transgr => transgr.transgroup_id}
            />
        </Col>
    )
}
