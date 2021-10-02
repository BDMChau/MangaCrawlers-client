import React from 'react'

import { Menu, Badge, Popover } from 'antd'
import { BellOutlined } from "@ant-design/icons";
import NotificationsService from './NotificationsService';
import { useSelector } from 'react-redux';

export default function NotificationMain() {
    const badgeCount = useSelector((state) => state.stuffsState[1]);

    const [visible, setVisible] = useState(false);


    return (
        <Popover
            overlayClassName="popover-notification"
            style={{ background: "red" }}
            trigger="click"
            visible={visible}
            onVisibleChange={(e) => setVisible(e)}
            content={<NotificationsService  />}
        >
            <Menu.Item key="notification">
                <Badge count={badgeCount} >
                    <BellOutlined style={{ fontSize: "20px" }} />
                </Badge>
            </Menu.Item>
        </Popover>
    )
}
