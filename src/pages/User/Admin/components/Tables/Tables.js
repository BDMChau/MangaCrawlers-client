import React, { memo, useEffect, useState } from 'react'
import "./Tables.css"

import { Tabs } from 'antd'
import MangaTable from './components/MangaTable'
import TransGrTable from './components/TransGrTable'
import TableUser from './components/UserTable'
import PostTable from './components/PostTable'
import { useHistory, useLocation } from 'react-router'
import { set } from '@antv/util'

function Tables({
    mangas,
    posts,
    users,
    transGrs,


    handleDeprecateUser,
    handleRemoveUser,
    handleRemoveManga,
    handleDeprecatePost,
    handleRemoveTransGroup,
    isLoading,

    isMobile
}) {
    const [selectedKey, setSelectedKey] = useState(null);

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (!query.get("key")) history.push(`/admin?v=tables&key=users`)
    }, [])

    useEffect(() => {
        console.log(query.get("key"))
        if (query.get("key")) setSelectedKey(query.get("key"));
    }, [query.get("key")])


    return (
        <div className="tables">
            <Tabs className="admin-tabs" activeKey={selectedKey}
                onChange={(key) => {
                    setSelectedKey(key);
                    window.history.replaceState(null, null, `/admin?v=tables&key=${key}`)
                }}
            >
                <Tabs.TabPane tab="Users" key="users">
                    <TableUser
                        users={users}

                        handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
                        handleRemoveUser={(userId) => handleRemoveUser(userId)}
                        isLoading={isLoading}

                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Manga Series" key="manga">
                    <MangaTable
                        mangas={mangas}

                        handleRemoveManga={(mangaId) => handleRemoveManga(mangaId)}
                        isLoading={isLoading}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Tranlation Teams" key="teams">
                    <TransGrTable
                        transGrs={transGrs}

                        handleRemoveTransGroup={(transGrId) => handleRemoveTransGroup(transGrId)}
                        isLoading={isLoading}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Posts on Forum" key="posts">
                    <PostTable
                        posts={posts}
                        handleDeprecatePost={handleDeprecatePost}
                        isLoading={isLoading}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default memo(Tables);