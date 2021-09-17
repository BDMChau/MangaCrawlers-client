import React, { useEffect, useState } from 'react'
import "./Admin.css"
import "./components/Tables/Tables.css"
import "./components/Charts/Chart.css"
import { Row, Typography, Tabs, Layout, Drawer, Breadcrumb, Menu } from 'antd';
import UserTable from './components/Tables/UserTable';
import AdminTable from './components/Tables/AdminTable';
import UserChart from './components/Charts/UserChart';
import MangaTable from './components/Tables/MangaTable';
import MangaChart from './components/Charts/MangaChart';
import TransGrTable from './components/Tables/TransGrTable';
import TransGrChart from './components/Charts/TransGrChart';
import { useHistory } from 'react-router';
import { message_error } from "../../../components/notifications/message";
import { useSelector } from 'react-redux';
import { enquireScreen, unenquireScreen } from 'enquire-js'

const { TabPane } = Tabs;

import { Content } from 'antd/lib/layout/layout';
import SiderMenu from './components/SiderMenu/SiderMenu';


export default function Admin({
    users,
    admins,
    mangas,
    transGrs,

    reportUsers,
    reportManga,
    reportTransGr,

    handleDeprecateUser,
    handleRemoveUser,
    handleRemoveManga,
    handleRemoveTransGroup,
    isLoading,

    tabSelected

}) {
    const userState = useSelector((state) => state.userState);
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


    return (
        <div className="admin-page">
            {isMobile ? (
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
            ) : (
                <Layout>
                    <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} ></SiderMenu>

                    <Layout className="site-layout">
                        <Content className="admin-content">
                            <div style={{ padding: '0 10px' }}>
                                {renderUserStatistic()}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            )}
        </div>
    )
}
