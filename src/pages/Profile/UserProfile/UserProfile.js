import React, { useEffect, useState } from 'react';
import "./UserProfile.css"
import { Button, Drawer, Input } from 'antd';
import { UserOutlined, HistoryOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';

export default function UserProfile({ visible, closeProfileDrawer }) {
    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

    useEffect(() => {
        if (visible === true) {
            setIsVisibleDrawer(visible)
        }
    }, [visible])



    const onClose = () => {
        setIsVisibleDrawer(false);

        setTimeout(() => {
            closeProfileDrawer(false);
        }, 300)
    };

    const renderTitle = () => (
        <div className="title">
            <span><UserOutlined /></span>
            <span>Profile</span>
        </div>
    )

    return (
        <Drawer
            className="user-drawer"
            title={renderTitle()}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={isVisibleDrawer}
        >
            <div className="user">
                <div className="avatar">
                    <Avatar
                        size={{ xs: 80, md: 140, lg: 150, xl: 150, xxl: 150 }}
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/181828860_190655002882277_7218559945996826011_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=58c789&_nc_ohc=L2ZLwEfnu3wAX_9_JdK&_nc_ht=scontent.xx&oh=dd3fa26784cd6f7e44141d03fd9be798&oe=60B90FFE"
                    />,
                </div>

                <div className="name">
                    <Input addonBefore="Nick Name" defaultValue="Ha Phuong" />
                </div>

                <div className="email">
                    <Input addonBefore="Email" defaultValue="haphuong1234@gmail.com" disabled />
                </div>

                <div className="is-admin">
                    <Input addonBefore="Role" defaultValue="Trong Nhan's ex" disabled />
                </div>

                <div className="interact">
                    <Button
                        className="history-btn"
                        type="primary"
                    >
                        <HistoryOutlined style={{ fontSize: "18px" }} />
                        Your History
                    </Button>

                    <Button
                        className="following-btn"
                        type="primary"
                    >
                        <UnorderedListOutlined style={{ fontSize: "18px" }} />
                        Following Manga
                        </Button>
                </div>

            </div>
        </Drawer>
    )
}
