import React, { useEffect, useState } from 'react'
import "./Admin.css"
import "./components/Tables/Tables.css"
import "./components/Charts/Chart.css"
import { Row, Typography, Tabs, Layout, Drawer, Breadcrumb, Menu, Spin } from 'antd';
import UserTable from './components/Tables/components/UserTable';
import AdminTable from './components/Tables/components/AdminTable';
import UserChart from './components/Charts/components/UserChart';
import MangaTable from './components/Tables/components/MangaTable';
import MangaChart from './components/Charts/components/MangaChart';
import TransGrTable from './components/Tables/components/TransGrTable';
import TransGrChart from './components/Charts/components/TransGrChart';
import { useHistory } from 'react-router';
import { message_error } from "../../../components/notifications/message";
import { useSelector } from 'react-redux';
import { enquireScreen, unenquireScreen } from 'enquire-js'

const { TabPane } = Tabs;

import { Content } from 'antd/lib/layout/layout';
import SiderMenu from './components/SiderMenu/SiderMenu';
import Dashboard from './components/Dashboard/Dashboard';
import { BellOutlined } from "@ant-design/icons"

export default function Admin({
    users,
    admins,
    mangas,
    transGrs,

    reportUsers,
    reportManga,
    reportTransGr,

    allReports,

    handleDeprecateUser,
    handleRemoveUser,
    handleRemoveManga,
    handleRemoveTransGroup,
    isLoading,

    tabSelected

}) {
    const userState = useSelector((state) => state.userState);
    const [isGetDataDone, setIsGetDataDone] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const history = useHistory();


    useEffect(() => {
        const enquireHandler = enquireScreen(mobile => {
            if (isMobile !== mobile) {
                setIsMobile(mobile)
            }
        })

        return () => unenquireScreen(enquireHandler);
    }, [])

    useEffect(() => {
        if (users.length || mangas.length || transGrs.length) {
            setIsGetDataDone(true)
        }
    }, [users, mangas, transGrs])


    useEffect(() => {
        if (userState[0]) {
            if (!userState[0].user_isAdmin) {
                history.push("/");
                message_error("You aren't allowed to access this resource!")
                return
            }
        } else {
            history.push("/");
        }
    }, [userState[0]])


    const renderUserStatistic = () => (
        <div>
            <UserTable
                users={users}
                handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
                handleRemoveUser={(userId) => handleRemoveUser(userId)}
                isLoading={isLoading}
            />
            <UserChart reportUsers={reportUsers} />
        </div>
    )


    const renderMangaStatistic = () => (
        <div>
            <MangaTable
                mangas={mangas}
                handleRemoveManga={(mangaId) => handleRemoveManga(mangaId)}
                isLoading={isLoading}
            />

            <MangaChart reportManga={reportManga} />
        </div>
    )

    const renderTransGrStatistic = () => (
        <div>
            <TransGrTable
                transGrs={transGrs}
                handleRemoveTransGroup={(transGrId) => handleRemoveTransGroup(transGrId)}
                isLoading={isLoading}
            />

            <TransGrChart reportTransGr={reportTransGr} />
        </div>
    )

    const SiteLayout = ({ isMobile }) => (
        <Layout className="site-layout">
            <Content className="admin-content">
                <div className="admin-header">
                    <BellOutlined />
                </div>

                <div style={{ padding: '0 10px' }}>
                    <Dashboard
                        mangas={mangas}
                        users={users}
                        transGrs={transGrs}

                        allReports={allReports}

                        isMobile={isMobile}
                    />
                </div>
            </Content>
        </Layout>
    )


    return (
        <div className="admin-page">
            {isMobile ? (
                <Layout>
                    <Drawer
                        maskClosable
                        closable={false}
                        // onClose={onCollapseChange.bind(this, !collapsed)}
                        visible={!collapsed}
                        placement="left"
                        width={200}
                        style={{
                            padding: 0,
                            height: '100vh',
                        }}
                    >
                        <div>notthing</div>
                    </Drawer>

                    {isGetDataDone
                        ? <SiteLayout isMobile={isMobile} />
                        : <div style={{ textAlign: "center", paddingTop: "220px", height: "100vw", width: "100vw" }}>
                            <Spin size={"large"} />
                        </div>
                    }
                </Layout>
            ) : (
                <Layout>
                    <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} ></SiderMenu>

                    {isGetDataDone
                        ? <SiteLayout isMobile={isMobile} />
                        : <div style={{ textAlign: "center", paddingTop: "220px", height: "100vw", width: "100vw" }}>
                            <Spin size={"large"} />
                        </div>
                    }
                </Layout>
            )}
        </div>
    )
}
