import React, { memo, useEffect, useState } from 'react'
import "./Tables.css"

import { Tabs } from 'antd'
import MangaTable from './components/MangaTable'
import TransGrTable from './components/TransGrTable'
import TableUser from './components/UserTable'
import PostTable from './components/PostTable'

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


    const handleChangeKey = (key) => {
        setSelectedKey(key);
    }



    return (
        <div className="tables">
            <Tabs className="admin-tabs" defaultActiveKey={selectedKey} onChange={(e) => handleChangeKey(e)}>
                <Tabs.TabPane tab="Users" key="1">
                    <TableUser
                        users={users}

                        handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
                        handleRemoveUser={(userId) => handleRemoveUser(userId)}
                        isLoading={isLoading}

                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Manga Series" key="2">
                    <MangaTable
                        mangas={mangas}
         
                        handleRemoveManga={(mangaId) => handleRemoveManga(mangaId)}
                        isLoading={isLoading}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Tranlation Teams" key="3">
                    <TransGrTable
                        transGrs={transGrs}

                        handleRemoveTransGroup={(transGrId) => handleRemoveTransGroup(transGrId)}
                        isLoading={isLoading}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Posts on Forum" key="4">
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