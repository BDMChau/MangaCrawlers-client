import React, { useEffect, useState } from 'react';
import "./UserProfile.css"
import { Button, Drawer, Input } from 'antd';
import { UserOutlined, HistoryOutlined, UnorderedListOutlined, CopyOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { message_success } from '../../../components/notifications/message';
import SignUpTransGroupService from "../../SignUpTransGroup/SignUpTransGroup";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function UserProfile({ visible, closeProfileDrawer }) {
    const userState = useSelector((state) => state.userState);

    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
    const [adminEmail] = useState("bdmchau10005@gmail.com");
    const [profile, setProfile] = useState({});
    const [openFormSignUpTransTeam, setOpenFormSignUpTransTeam] = useState("");
    const history = useHistory();


    useEffect(() => {
        if (visible === true) {
            setIsVisibleDrawer(visible)
        }
    }, [visible])

    useEffect(() => {
        if (userState) {
            console.log(userState[0])
            setProfile(userState[0])
        }
    }, [userState])



    const handleOpenFormSignUpTransTeam = () => {
        setOpenFormSignUpTransTeam(!openFormSignUpTransTeam)
    }

    const onClose = () => {
        setIsVisibleDrawer(false);

        setTimeout(() => {
            closeProfileDrawer(false);
        }, 300)
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(adminEmail)
        message_success("Copied!", 2);
        return;
    }


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
                        title="Avatar"
                        size={{ xs: 80, md: 140, lg: 150, xl: 150, xxl: 150 }}
                        src={profile.user_avatar ? profile.user_avatar : ""}
                    />,
                </div>

                <div className="name">
                    <Input addonBefore="Nick Name" title="Nick Name" defaultValue={profile.user_name ? profile.user_name : "Anonymous"} />
                </div>

                <div className="email">
                    <Input addonBefore={"Email"} title="Email" defaultValue={profile.user_email ? profile.user_email : ""} readOnly />
                </div>

                <div className="is-admin">
                    <Input addonBefore="Role" title="Role" defaultValue={profile.user_isAdmin ? "Admin" : "Regular User"} readOnly />
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
                        onClick={() => history.push("/user")}
                    >
                        <UnorderedListOutlined style={{ fontSize: "18px" }} />
                        Following Manga
                    </Button>

                    <Button
                        className="trans-group-btn"
                        type="primary"
                    >
                        <TeamOutlined style={{ fontSize: "19px" }} />
                        My Translation Team
                    </Button>

                    <Button
                        className="admin-btn"
                        type="primary"
                        onClick={() => history.push("/admin")}
                    >
                        <ProfileOutlined style={{ fontSize: "19px" }} />
                        Admin Page
                    </Button>
                </div>
                <div className="create-trans-group" onClick={() => handleOpenFormSignUpTransTeam()}>
                    <p>Create your own translation group?</p>
                </div>

                <div className="contact-admin">
                    <p>Contact me via email if you have any questions ^^</p>
                    <Input
                        addonBefore={<CopyOutlined
                            style={{ fontSize: "18px", marginTop: "5px", cursor: "pointer" }}
                            onClick={() => copyToClipboard()}
                            title="Copy to clipboard"

                        />}
                        defaultValue={adminEmail}
                        onClick={() => copyToClipboard()}
                        title="Copy to clipboard"
                        readOnly
                    />

                </div>

            </div>
            {openFormSignUpTransTeam
                ? <SignUpTransGroupService />
                : ""
            }
        </Drawer>

    )
}
