import React from 'react'
import "../../../Admin.css"
import "../Tables.css"
import "../../../components/Charts/Chart.css"
import { DeleteOutlined } from '@ant-design/icons';

import { Table, Space, Col, Typography, Popconfirm, Button } from 'antd';
import DropOption from 'components/DropOption/DropOption';

export default function TransGrTable({ transGrs, handleRemoveTransGroup, isLoading }) {
    const columns = [
        {
            title: 'Team Name',
            dataIndex: 'transgroup_name',
            key: 'transgroup_name',
            fixed: 'left',
            width: "6%",
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
                dataSource={transGrs}
                pagination={{
                    showTotal: () => `Total ${users.length} Translation Teams`,
                }}
                rowKey={transgr => transgr.transgroup_id}
            />
        </Col>
    )
}
