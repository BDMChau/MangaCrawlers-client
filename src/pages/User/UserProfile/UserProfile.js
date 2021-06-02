import React, { useEffect, useState } from 'react';
import "./UserProfile.css"
import { Button, Drawer, Dropdown, Input, Menu, Typography, Upload } from 'antd';
import { SettingOutlined, UserOutlined, HistoryOutlined, UnorderedListOutlined, CopyOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { message_error, message_success } from '../../../components/notifications/message';
import SignUpTransGroupService from "../../SignUpTransGroup/SignUpTransGroup";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function UserProfile({ visible, closeProfileDrawer, removeAvatar, updateAvatar, isLoading }) {
    const userState = useSelector((state) => state.userState);
    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
    const [adminEmail] = useState("mangacrawlers123@gmail.com");
    const [profile, setProfile] = useState({});
    const [file, setFile] = useState(null);
    const [openFormSignUpTransTeam, setOpenFormSignUpTransTeam] = useState("");

    const allowFiles = ["image/png", "image/jpg", "image/jpeg"]

    useEffect(() => {
        if (visible === true) {
            setIsVisibleDrawer(visible)
        }
    }, [visible])

    
    useEffect(() => {
        if (userState) {
            setProfile(userState[0])
        }
    }, [userState])


    useEffect(() => {
        if(file){
            updateAvatar(file)
            setFile(null)
        }
     }, [file])


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


    const propsUpload = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        }, 
        beforeUpload: (file) => false,
        onChange: (info) => setFile(info.file)
    };


    const dropdownSettingsAva = (
        <Menu style={{width:"100%"}}>
            <Menu.Item>
                <Upload {...propsUpload} className="btn-upload-avatar">
                    Change Avatar
                   
                </Upload>
            </Menu.Item>

            <Menu.Item onClick={removeAvatar}>
                <Typography.Text >
                    Remove Avatar
            </Typography.Text>
            </Menu.Item>
        </Menu>
    );

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
                    />

                        <Dropdown overlay={dropdownSettingsAva} trigger={['click']} placement="bottomCenter" >
                            <Button className="btn-settings-avatar" loading={isLoading} icon={<SettingOutlined style={{ fontSize: "24px" }} />} />
                        </Dropdown>
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
                        type="primary"

                    >
                        <NavLink className="history-btn" to="/user?v=history">
                            <HistoryOutlined style={{ fontSize: "18px" }} />
                            &#160;
                            Your History
                       </NavLink>
                    </Button>

                    <Button
                        type="primary"
                    >
                        <NavLink className="following-btn" to="/user?v=following">
                            <UnorderedListOutlined style={{ fontSize: "18px" }} />
                            &#160;
                            Following Manga
                        </NavLink>
                    </Button>

                    {userState[0].user_transgroup_id 
                    ? <Button
                        type="primary"
                     >
                        <NavLink className="trans-group-btn"
                         to={{
                             pathname:"/user/projects",
                             state: { transGrId: userState[0].user_transgroup_id }
                         }}
                         >
                            <TeamOutlined style={{ fontSize: "19px" }} />
                            &#160;
                            My Translation Team
                        </NavLink>
                    </Button>
                    : ""

                    }

                    {userState[0].user_isAdmin === true
                    ? <Button
                        type="primary"
                    >
                            <NavLink className="admin-btn" to="/admin">
                                <ProfileOutlined style={{ fontSize: "19px" }} />
                                &#160;
                                Admin Page
                            </NavLink>
                        </Button>
                    :""
                       
                    }
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
