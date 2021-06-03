import React, { useState } from 'react'
import "./TransGroup.css"
import { Row, Typography, Tabs } from 'antd';
import FormCreateProject from '../../components/Form/FormCreateProject/FormCreateProject';
import ListVersion02 from '../../components/List/ListVersion02/ListVersion02';


const { TabPane } = Tabs;

export default function TransGroup({ transGrInfo, mangas, genres, handleCreateNewProject, isLoading }) {

    const renderProjects = () => (
        <Row justify={"center"} className="projects">
            <ListVersion02 mangas={mangas} />
        </Row>
    )

    return (
        <Row justify={"center"} className="transgrouppage-row1">
            <div key={transGrInfo.transgroup_id} className="trans-group-title">
                <Typography.Title style={{ marginBottom: "0" }} level={4} >{transGrInfo.transgroup_name}</Typography.Title>
                <Typography.Text >{transGrInfo.transgroup_email}</Typography.Text>
                <Typography.Text >{transGrInfo.transgroup_desc}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu</Typography.Text>
            </div>

            <Tabs defaultActiveKey="projects" className="transgrouppage-tabs">
                <TabPane tab="Your Projects" key="projects">
                    {renderProjects()}
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
