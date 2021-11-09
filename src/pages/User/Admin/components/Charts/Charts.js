import React, { memo, useEffect, useState } from 'react'
import "./Chart.css"

import { Tabs } from 'antd'

import TransGrChart from './components/TransGrChart'
import MangaChart from './components/MangaChart'
import UserChart from './components/UserChart'
import PostsChart from './components/PostsChart'

function Charts({
    reportUsers,
    reportManga,
    reportPosts,
    reportTransGr,

    allReports,

    isMobile
}) {
    const [selectedKey, setSelectedKey] = useState(null);


    const handleChangeKey = (key) => {
        setSelectedKey(key);
    }


    return (
        <div className="charts">
            <Tabs className="admin-tabs" defaultActiveKey={selectedKey} onChange={(e) => handleChangeKey(e)}>
                <Tabs.TabPane tab="Users" key="1">
                    <UserChart
                        reportUsers={reportUsers}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Manga Series" key="2">
                    <MangaChart
                        reportManga={reportManga}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Tranlation Teams" key="3">
                    <TransGrChart
                        reportTransGr={reportTransGr}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Posts on Forum" key="4">
                    <PostsChart reportPosts={reportPosts} />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default memo(Charts);