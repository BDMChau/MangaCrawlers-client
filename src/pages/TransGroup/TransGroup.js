import React from 'react'
import "./TransGroup.css"
import { Row, Typography, Tabs, Table, Col } from 'antd';
import FormCreateProject from '../../components/Form/FormCreateProject/FormCreateProject';
import ListVersion02 from '../../components/List/ListVersion02/ListVersion02';
import columns from './ColumnsTableMembers';


const { TabPane } = Tabs;

export default function TransGroup({
    transGrInfo,
    mangas,
    users,
    genres,
    handleCreateNewProject,
    isLoading,
    isLogin
}) {

    const renderProjects = () => (
        <Row justify={"center"} className="projects">
            <ListVersion02 mangas={mangas} />
        </Row>
    )

    return (
        <Row justify={"center"} className="transgrouppage-row1">
            <div key={transGrInfo.transgroup_id} className="trans-group-title">
                {
                    isLogin
                        ? <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px" }} >
                            <Typography.Text style={{ color: "#FF4D4F", }} >Maybe you haven't created your own team</Typography.Text>
                            <Typography.Text style={{ color: "#FF4D4F" }} >Or if you already have a team, please login again before visit this page!</Typography.Text>
                        </div>
                        : ""
                }
                <Typography.Title style={{ marginBottom: "0" }} level={4} >{transGrInfo.transgroup_name}</Typography.Title>
                <Typography.Text >{transGrInfo.transgroup_email}</Typography.Text>
                <Typography.Text >{transGrInfo.transgroup_desc}</Typography.Text>
            </div>

            <Tabs defaultActiveKey="projects" className="transgrouppage-tabs">
                <TabPane tab="Your Projects" key="projects">
                    {renderProjects()}
                    <Col xs={24} sm={20} md={20} xxl={14} className="table-members">
                        <Typography.Title level={4} >Members</Typography.Title>
                        <Table
                            className="members-table"
                            columns={columns}
                            dataSource={users}
                            pagination={true}
                        />
                    </Col>
                </TabPane>

                <TabPane tab="New Project" key="newproject">
                    <Row justify={"center"}>
                        <FormCreateProject genres={genres} handleCreateNewProject={(fieldsData, img) => handleCreateNewProject(fieldsData, img)} isLoading={isLoading} />
                    </Row>
                </TabPane>
            </Tabs>

        </Row>
    )
}
