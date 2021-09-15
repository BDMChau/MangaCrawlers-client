import React from 'react'
import "../Admin.css"
import "./Tables.css"
import "../Charts/Chart.css"

import { Table, Space, Col, Typography, Popconfirm, Button } from 'antd';
import DropOption from 'components/DropOption/DropOption';

export default function TransGrTable({ transGrs, handleRemoveTransGroup, isLoading }) {
    const columns = [
        {
            title: 'Team Name',
            dataIndex: 'transgroup_name',
            key: 'transgroup_name',
            className: "name-col",
            render: text => <p>{text}</p>,
        },
        {
            title: 'Team Email',
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
            title: 'Operation',
            key: 'operation',
            render: (transgroup) => (
                <DropOption
                    menuOptions={[
                        { key: '2', name: `Delete`, keyId: "delete", funcAction: () => handleRemoveTransGroup(transgroup.transgroup_id) },
                    ]}
                />
            ),
        },
    ];

    return (
        <Col xxl={14} xs={23} sm={20} className="table-trans-gr">
            <div style={{ display: "flex" }}>
                <Typography.Title level={3}>Translation Team</Typography.Title>
                {
                    isLoading
                        ? <Button className="table-btn-loading" loading={isLoading}></Button>
                        : ""
                }
            </div>

            <Table
                className="trans-gr-table"
                columns={columns}
                dataSource={transGrs}
                pagination={true}
            />
        </Col>
    )
}
