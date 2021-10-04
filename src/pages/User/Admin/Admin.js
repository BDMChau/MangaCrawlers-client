import React, { useEffect, useState } from 'react'
import "./Admin.css"
import "./components/Tables/Tables.css"
import "./components/Charts/Chart.css"
import { Layout, Drawer, Spin } from 'antd';

import { useHistory } from 'react-router';
import { message_error } from "../../../components/alerts/message";
import { useSelector } from 'react-redux';
import { enquireScreen, unenquireScreen } from 'enquire-js'

import { Content } from 'antd/lib/layout/layout';
import SiderMenu from './components/SiderMenu/SiderMenu';
import Dashboard from './components/Dashboard/Dashboard';
import Tables from './components/Tables/Tables';
import Charts from './components/Charts/Charts';

function Admin({
    users,
    admins,
    mangas,
    transGrs,

    reportUsers,
    reportManga,
    reportTransGr,

    allReports,

    weatherStatus,

    handleDeprecateUser,
    handleRemoveUser,
    handleRemoveManga,
    handleRemoveTransGroup,
    isLoading,

    tabSelected,
    setTabSelected

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
        }, "only screen and (min-width: 375px) and (max-width: 767px)")

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


    const renderBodySiteLayout = (isMobile) => (
        tabSelected === "dashboard"
            ? <div style={{ padding: '0 10px' }}>
                <Dashboard
                    mangas={mangas}
                    users={users}
                    admins={admins}
                    transGrs={transGrs}

                    allReports={allReports}

                    weatherStatus={weatherStatus}

                    isMobile={isMobile}
                />
            </div>
            : tabSelected === "tables"
                ? <div>
                    <Tables
                        mangas={mangas}
                        users={users}
                        transGrs={transGrs}


                        handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
                        handleRemoveUser={(userId) => handleRemoveUser(userId)}
                        handleRemoveManga={(mangaId) => handleRemoveManga(mangaId)}
                        handleRemoveTransGroup={(transGrId) => handleRemoveTransGroup(transGrId)}
                        isLoading={isLoading}

                        isMobile={isMobile}
                    />
                </div>

                : tabSelected === "charts"
                    ? <div>
                        <Charts
                           reportUsers={reportUsers}
                           reportManga={reportManga}
                           reportTransGr={reportTransGr}

                            allReports={allReports}

                            isMobile={isMobile}
                        />
                    </div>
                    : ""
    )

    const SiteLayout = ({ isMobile }) => (
        <Layout className="site-layout">
            <Content className="admin-content">
                {renderBodySiteLayout(isMobile)}
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
                    <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} tabSelected={tabSelected} setTabSelected={setTabSelected} ></SiderMenu>

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

export default Admin;