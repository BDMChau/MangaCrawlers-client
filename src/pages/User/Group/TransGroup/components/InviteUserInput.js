import React, {useState, useEffect} from 'react';
import "../TransGroup.css";

import { AutoComplete, Button, Typography, Avatar } from 'antd';
import userApi from 'api/apis/MainServer/userApi';
import { socketActions } from 'socket/socketClient';
import { useSelector } from 'react-redux';

export default function InviteUserInput({transGrInfo }) {
    const userState = useSelector((state) => state.userState);

    const [valToSearch, setValToSearch] = useState("");
    const [usersSearchResult, setUsersSearchResult] = useState([]);


    useEffect(() => {
        if (valToSearch) searchUsers()
        else setUsersSearchResult([]);
    }, [valToSearch])


    const searchUsers = async () => {
        const data = {
            value: valToSearch,
            key: 1
        }

        try {
            const response = await userApi.searchUsers(data);
            if (response.content.err) {
                setUsersSearchResult([]);
                return;
            }

            setUsersSearchResult(response.content.data);
            return;
        } catch (error) {
            console.log(error);
        }
    }


    const inviteUser = (val, transGr) => {
        const user_email = val;

        const data = {
            type: 1,
            message: `Want to join our team <b>${transGrInfo.transgroup_name}</b>`,
            image_url: "",
            user_id: userState[0].user_id,
            list_to: user_email ? [user_email] : [],
            obj_data: {
                target_id: transGr.transgroup_id.toString(),
                target_title: "transgroup"
            }
        }

        socketActions.sendMessageToServer(data);
        setValToSearch("");
    }


    return (
        <>
            <AutoComplete
                className="invite-user"
                onSearch={(value) => setValToSearch(value)}
                onSelect={(value) => { setUsersSearchResult([]); setValToSearch(value) }}
                value={valToSearch}
                type="tag"
                defaultActiveFirstOption
                placeholder="Invite a collaborator..."
                title="Search by email"
            >
                {usersSearchResult.length
                    ? usersSearchResult.map((user, i) => (
                        <AutoComplete.Option key={user.user_email}>
                            <Avatar src={user.user_avatar} style={{ cursor: "default" }} alt="Avatar" />
                            <Typography.Text style={{ fontSize: "15px" }}>{user.user_name}</Typography.Text>
                            <div>
                                <Typography.Text style={{ fontSize: "13px", color: "#646464c9", fontStyle: "italic" }}>{user.user_email}</Typography.Text>
                            </div>
                        </AutoComplete.Option>
                    ))
                    : ""
                }
            </AutoComplete>

            <Button
                style={{
                    marginLeft: "3px",
                    opacity: valToSearch ? '1' : '0',
                    visibility: valToSearch ? 'visible' : 'hidden',
                    transition: "0.3s"
                }}
                onClick={() => { inviteUser(valToSearch, transGrInfo); }}
            >
                Invite
            </Button>
        </>
    )
}
