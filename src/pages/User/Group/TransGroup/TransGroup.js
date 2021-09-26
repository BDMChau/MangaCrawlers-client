import React from 'react'
import "./TransGroup.css"
import { Row, Typography, Tabs, Table, Col, Spin, Button, Popconfirm, AutoComplete, Avatar } from 'antd';
import FormCreateProject from '../../../../components/Form/FormCreateProject/FormCreateProject';
import ListVersion02 from '../../../../components/List/ListVersion02/ListVersion02';
import columns from './ColumnsTableMembers';
import { useSelector } from 'react-redux';


const { TabPane } = Tabs;

export default function TransGroup({
    transGrInfo,
    mangas,
    users,
    genres,

    handleCreateNewProject,
    isLoading,
    isLogin,

    deleteGroup,

    handleDeleteManga,
    IsLoadingDelete,

    valToSearch,
    setValToSearch,
    setUsersSearchResult,
    usersSearchResult,

    inviteUser
}) {
    const userState = useSelector((state) => state.userState);

    const renderProjects = () => (
        <Row justify={"center"} className="projects">
            <ListVersion02 mangas={mangas} handleDeleteManga={(mangaId) => handleDeleteManga(mangaId)} IsLoadingDelete={IsLoadingDelete} />
        </Row>
    )

    return (
        <Row justify={"center"} className="transgrouppage-row1">
            {userState[0]?.user_transgroup_id
                ? <>
                    <div key={transGrInfo.transgroup_id} className="trans-group-title">
                        {
                            isLogin
                                ? <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px" }} >
                                    <Typography.Text style={{ color: "#FF4D4F", }} >Did you just created this team, right?</Typography.Text>
                                    <Typography.Text style={{ color: "#FF4D4F" }} >Please login again before visit this page in the first time!</Typography.Text>
                                </div>
                                : ""
                        }
                        <Typography.Title style={{ marginBottom: "0" }} level={4} >{transGrInfo.transgroup_name}</Typography.Title>
                        <Typography.Text >{transGrInfo.transgroup_email}</Typography.Text>
                        <Typography.Text >{transGrInfo.transgroup_desc}</Typography.Text>
                    </div>

                    <Tabs defaultActiveKey="projects" className="transgrouppage-tabs">
                        <TabPane tab="Your Projects" key="projects">
                            <div style={{ textAlign: "center", marginTop: "3px", height: "40px" }}>
                                {IsLoadingDelete
                                    ? <Spin size="large" />
                                    : ""
                                }
                            </div>

                            {renderProjects()}
                            <Col xs={23} sm={23} md={23} xxl={23} className="table-members">
                                <div style={{ display: "flex" }}>
                                    <Typography.Title level={4} >Members</Typography.Title>

                                    {userState[0]?.user_email === transGrInfo.transgroup_email
                                        ? <>
                                            <AutoComplete
                                                className="invite-user"
                                                onSearch={(value) => setValToSearch(value)}
                                                onSelect={(value) => { setUsersSearchResult([]); setValToSearch(value) }}
                                                value={valToSearch}
                                                type="tag"
                                                defaultActiveFirstOption
                                                placeholder="Invite collaborator..."
                                                title="Search by email"
                                            >
                                                {usersSearchResult.length
                                                    ? usersSearchResult.map((user, i) => (
                                                        <AutoComplete.Option key={i} value={user.user_email}>
                                                            <Avatar src={user.user_avatar} style={{ cursor: "default" }} alt="Avatar" />
                                                            <Typography.Text style={{ fontSize: "15px" }}>{user.user_name}</Typography.Text>
                                                            <div>
                                                                <Typography.Text style={{ fontSize: "13px", color: "#646464c9", fontStyle: "italic" }}>{user.user_email}</Typography.Text>

                                                            </div>
                                                        </AutoComplete.Option>
                                                    ))
                                                    : ""
                                                }
                                            </AutoComplete>

                                            <Button
                                                style={{
                                                    marginLeft: "3px",
                                                    opacity: valToSearch ? '1' : '0',
                                                    visibility: valToSearch ? 'visible' : 'hidden',
                                                    transition: "0.3s"
                                                }}
                                                onClick={() => inviteUser(valToSearch)}
                                            >
                                                Invite
                                            </Button>
                                        </>
                                        : ""
                                    }
                                </div>

                                <Table
                                    className="members-table"
                                    columns={columns}
                                    dataSource={users}
                                    pagination={true}
                                />
                            </Col>

                            <Col xs={23} sm={23} md={23} xxl={23} style={{ margin: "25px auto 0 auto" }}>
                                <Popconfirm
                                    title={
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Typography.Text>Are you sure to continue?</Typography.Text>
                                            <Typography.Text>Your organization will be deleted permanently</Typography.Text>
                                        </div>
                                    }
                                    onConfirm={() => deleteGroup(transGrInfo.transgroup_id)}
                                    okType="danger"
                                    okText="Delete"
                                    cancelText="Cancle"
                                >
                                    <Button danger loading={false} >Delete Organization</Button>
                                </Popconfirm>
                            </Col>

                        </TabPane>

                        <TabPane tab="New Project" key="newproject">
                            <Row justify={"center"}>
                                <FormCreateProject genres={genres} handleCreateNewProject={(fieldsData, img) => handleCreateNewProject(fieldsData, img)} isLoading={isLoading} />
                            </Row>
                        </TabPane>
                    </Tabs>

                </>
                : <Typography.Title style={{ padding: "30px 0 0 0", margin: "0 auto" }} level={5}>You haven't joined any team or signed in yet!</Typography.Title>
            }
        </Row>
    )
}
