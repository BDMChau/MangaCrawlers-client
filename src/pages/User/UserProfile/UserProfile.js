import React, { useEffect, useState } from 'react';
import "./UserProfile.css"
import { Button, Drawer, Dropdown, Input, Menu, Typography, Upload, Tooltip } from 'antd';
import { SettingOutlined, UserOutlined, HistoryOutlined, MoreOutlined, UnorderedListOutlined, CopyOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { message_success } from '../../../components/toast/message';
import SignUpTransGroupService from "../../Auth/SignUpTransGroup/SignUpTransGroup";
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';

import updateIcon from "assets/img/updated.png"
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';

export default function UserProfile({
    visible,
    closeProfileDrawer,
    removeAvatar,
    updateAvatar,
    isLoading,
    userDesc,
    setUserDesc,
    updateDesc
}) {
    const userState = useSelector((state) => state.userState);
    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
    const [adminEmail] = useState("mangacrawlers123@gmail.com");
    const [profile, setProfile] = useState({});
    const [file, setFile] = useState(null);
    const [openFormSignUpTransTeam, setOpenFormSignUpTransTeam] = useState("");

    const history = useHistory();

    const listFileTypesAllowed = ["image/png", "image/jpeg", "image/jpg"]

    const cookies = new Cookies();
    const token = cookies.get("token");


    useEffect(() => {
        if (visible === true) {
            setIsVisibleDrawer(visible)
        }
    }, [visible])


    useEffect(() => {
        if (userState[0]) {
            setProfile(userState[0]);

            getNumberOfFriends(userState[0]);
            setUserDesc(userState[0].user_desc)
        }
    }, [userState[0]])


    useEffect(() => {
        if (file) {
            updateAvatar(file)
            setFile(null)
        }
    }, [file])


    const getNumberOfFriends = async (userInfo) => {
        try {
            const res = await userApi.getTotalFriends(token);
            if (res.content.err) {
                setProfile({ ...userInfo, total_friends: 0 });
                return;
            }

            setProfile({ ...userInfo, total_friends: res.content.total_friends });
        } catch (err) {
            setProfile({ ...userInfo, total_friends: 0 });
            console.log(err)
        }
    }


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
        <div className="title" onClick={() => history.push(redirectURI.userPage_uri(profile.user_id))} title="Go to profile page" >
            <span><UserOutlined /></span>
            <span>Profile</span>
        </div>
    )


    const propsUpload = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            if (!listFileTypesAllowed.includes(file.type)) {
                message_error("Please select jpeg, png files!")
            }

            const fileSz = file.size / 1024 / 1024;
            if (fileSz > 5) {
                message_error("An image must smaller than 5MB!")
            }

            const condition = listFileTypesAllowed.includes(file.type) && fileSz <= 5
            return condition ? false : Upload.LIST_IGNORE
        },
        onChange: (info) => setFile(info.file)
    };


    const dropdownSettingsAva = (
        <Menu style={{ width: "100%" }}>
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
                    <Input addonBefore="Nick Name" title="Nick Name" defaultValue={profile.user_name ? profile.user_name : "Anonymous"} readOnly />
                </div>

                <div className="email">
                    <Input addonBefore={"Email"} title="Email" defaultValue={profile.user_email ? profile.user_email : ""} readOnly />
                </div>

                <div className="is-admin">
                    <Input addonBefore="Role" title="Role" defaultValue={profile.user_isAdmin ? "Admin" : "Regular User"} readOnly />
                </div>

                <div className="desc">
                    <Input.TextArea
                        placeholder="Write something about yourself..."
                        showCount
                        maxLength={150}
                        addonBefore="Your status"
                        title="Your status"
                        value={userDesc}
                        onChange={(e) => setUserDesc(e.target.value)}
                        defaultValue={userDesc}
                    />

                    <Tooltip title="Update" >
                        <Button
                            className="btn-update"
                            type="text"
                            onClick={() => updateDesc()}
                        >
                            <img src={updateIcon} width="30" style={{ marginLeft: "-4px" }} alt="" />
                        </Button>
                    </Tooltip>
                </div>

                <div className="interact">
                    <Button
                        type="primary"

                    >
                        <NavLink className="history-btn" to="/user?v=history">
                            <HistoryOutlined style={{ fontSize: "18px" }} />
                            &#160;
                            My History
                        </NavLink>
                    </Button>

                    <Button
                        type="primary"
                    >
                        <NavLink className="following-btn" to="/user?v=following">
                            <UnorderedListOutlined style={{ fontSize: "18px" }} />
                            &#160;
                            My Library
                        </NavLink>
                    </Button>

                    {userState[0].user_transgroup_id
                        ? <Button
                            type="primary"
                        >
                            <NavLink className="trans-group-btn" to="/user/projects">
                                <TeamOutlined style={{ fontSize: "19px" }} />
                                &#160;
                                My Organization
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
                                Admin
                            </NavLink>
                        </Button>
                        : ""

                    }
                </div>

                {userState[0].user_transgroup_id
                    ? <div style={{ pointerEvents: "none", opacity: "0.5" }} className="create-trans-group" onClick={() => handleOpenFormSignUpTransTeam()}>
                        <p>Create your own organization?</p>
                    </div>

                    : <div className="create-trans-group" onClick={() => handleOpenFormSignUpTransTeam()}>
                        <p>Create your own organization?</p>
                    </div>
                }

                <div className="more">
                    <p title="More" onClick={() => history.push(redirectURI.userOwnPage_uri(profile.user_id))}>
                        <MoreOutlined style={{ fontSize: "18px" }} />More
                    </p>
                </div>

                <div className="contact-admin">
                    <p>Contact us via email if you have any questions ^^</p>
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
