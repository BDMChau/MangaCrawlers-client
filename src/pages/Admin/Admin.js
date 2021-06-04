import React, { useEffect } from 'react'
import "./Admin.css"
import "./Tables/Tables.css"
import "./Charts/Chart.css"
import { Row, Typography, Tabs } from 'antd';
import UserTable from './Tables/UserTable';
import AdminTable from './Tables/AdminTable';
import UserChart from './Charts/UserChart';
import MangaTable from './Tables/MangaTable';
import MangaChart from './Charts/MangaChart';
import TransGrTable from './Tables/TransGrTable';
import TransGrChart from './Charts/TransGrChart';
import { useHistory } from 'react-router';
import { message_error } from "../../components/notifications/message";
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

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
    isLoading,

}) {
    const userState = useSelector((state) => state.userState);
    const history = useHistory();

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
    }, [userState[0].user_id])


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
            />

            <MangaChart reportManga={reportManga} />
        </div>
    )

    const renderTransGrStatistic = () => (
        <div>
            <TransGrTable transGrs={transGrs} />
            <TransGrChart reportTransGr={reportTransGr} />
        </div>
    )


    return (
        <div className="admin-page">
            <Row justify={"center"} className="admin-row1">

                <Typography.Title level={3} className="admin-title">Administrator Page</Typography.Title>
                <Tabs defaultActiveKey="1" className="admin-tabs">
                    <TabPane tab="User Statistics" key="1">
                        {renderUserStatistic()}
                    </TabPane>
                    <TabPane tab="Manga Statistics" key="2">
                        {renderMangaStatistic()}
                    </TabPane>
                    <TabPane tab="Translation Group Statistics" key="3">
                        {renderTransGrStatistic()}
                    </TabPane>
                </Tabs>

                <AdminTable admins={admins} />
            </Row>
        </div>
    )
}
