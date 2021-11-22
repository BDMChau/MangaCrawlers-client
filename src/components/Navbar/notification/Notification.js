import React, { memo, useEffect, useState } from 'react'
import "../Navbar.css"

import { Typography, Button, Avatar } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import { format } from 'helpers/format';
import mangaApi from 'api/apis/MainServer/mangaApi';
import { checkedListCommand } from '@uiw/react-md-editor';
import forumApi from 'api/apis/MainServer/forumApi';
import userApi from 'api/apis/MainServer/userApi';
import Cookies from 'universal-cookie';


const imgDefault = 'https://res.cloudinary.com/mangacrawlers/image/upload/v1632847306/notification_imgs/default/notification.svg';

function Notification({
    item,
    key,

    updateInteracted,
    handleUpdateViewed,

    handleAcceptInvitation,
    handleAcceptFriendReq,

}) {
    const cookies = new Cookies();
    const token = cookies.get("token")


    /**
     * @param: 1: delete 
     * @param: 2: confirm_toJoinTeam 
     * @param: 3: accept_friend 
     */
    const listTypes = {
        1: "delete",
        2: "confirm_toJoinTeam",
        3: "accept_friend"
    }

    const [notification, setNotification] = useState({});


    useEffect(() => {
        setNotification(item);
    }, [item])

    const handleViewed = async (id) => {
        const res = await handleUpdateViewed(id);

        if (res) setNotification({ ...notification, is_viewed: true });
    }


    const handleInteract = async (type) => {
        let response;

        switch (type) {
            case listTypes[1]:
                await updateInteracted(notification.notification_id, 1);
                setNotification({ ...notification, is_interacted: true, is_viewed: true });

                break;
            case listTypes[2]:
                response = await handleAcceptInvitation(notification.notification_id, notification.target_id, notification.target_title);
                if (response) {
                    setNotification({ ...notification, is_interacted: true, is_viewed: true });
                }
                break;
            case listTypes[3]:
                response = await handleAcceptFriendReq(notification.notification_id, notification.sender_id, notification.target_title);
                if (response) {
                    setNotification({ ...notification, is_interacted: true, is_viewed: true });
                }
                break;

            default:
                break;
        }


    }


    const handleRender = () => {
        switch (notification.notification_type) {
            case 1:
                return <Invitation />
            case 2:
                return <FriendRequest />
            case 3:
                return <NewPost />
            case 4:
                return <CommentTagged />
            default:
                break;
        }
    }


    /////////////////////////// components ///////////////////////////
    const Invitation = () => (
        <div style={{ display: 'flex' }}>
            <div>
                <Avatar className='image' src={notification.image_url} style={{ borderRadius: notification.image_url === imgDefault ? "0px" : "50px" }} alt="" />
            </div>

            <div className='content'>
                <Typography.Text>
                    <b>{notification.sender_name}</b> invited you: "<div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>"
                </Typography.Text>


                <div className="interact" style={{ display: notification.is_interacted || !notification.target_id ? 'none' : 'unset', }}>
                    <Button
                        type='primary'
                        onClick={() => handleInteract(listTypes[2])}
                    >
                        Confirm
                    </Button>

                    <Button
                        onClick={() => handleInteract(listTypes[1])}
                        style={{ marginLeft: "5px" }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div >
    )


    const FriendRequest = ({ }) => (
        <div style={{ display: 'flex' }}>
            <NavLink to={redirectURI.userPage_uri(notification.sender_id)} title="View profile" >
                <Avatar className='image' src={notification.image_url} style={{ borderRadius: notification.image_url === imgDefault ? "0px" : "50px" }} alt="" />
            </NavLink>

            <div className='content'>
                <Typography.Text >
                    <b>{notification.sender_name}</b> sent you a request: "<div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>"
                </Typography.Text>


                <div className="interact" style={{ display: notification.is_interacted || !notification.target_id ? 'none' : 'unset', }}>
                    <Button
                        type='primary'
                        onClick={() => handleInteract(listTypes[3])}
                    >
                        Accept
                    </Button>

                    <Button
                        onClick={() => handleInteract(listTypes[1])}
                        style={{ marginLeft: "5px" }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div >
    )


    const NewPost = ({ }) => (
        <NavLink to={redirectURI.postPage_uri(notification.target_id)} style={{ display: 'flex' }} onClick={() => handleViewed(notification.notification_id)}>
            <div>
                <Avatar className='image' src={notification.image_url} style={{ borderRadius: notification.image_url === imgDefault ? "0px" : "50px" }} alt="" />
            </div>

            <div className='content'>
                <Typography.Text>
                    <div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>
                </Typography.Text>
            </div>
        </NavLink >
    )

    const CommentTagged = () => {
        const [uri, setUri] = useState("");

        const targetTitle = notification.target_title;


        useEffect(() => handleUri(), [])

        // target_id là comment_id
        const handleUri = async () => {
            const cmt = await getCommentById(notification.target_id);
            if (!cmt) return;

            if (targetTitle === "comment_post") {
                const post = await getPostById(cmt.post_id);

                if (post) setUri(redirectURI.postPage_uri(post.post_id));

            } else if (targetTitle === "comment_manga") {
                const manga = await getMangaById(cmt.manga_id);

                if (manga) setUri(redirectURI.mangaPage_uri(manga.manga_id, manga.manga_name));
            }
        }

        const getCommentById = async (id) => {
            const data = { comment_id: id }

            try {
                const res = await userApi.getComment(data);
                if (res.content.err) return false;

                return res.content.comment;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        const getMangaById = async (id) => {
            if (!id) return;

            const params = {
                manga_id: id,
            }

            try {
                const res = await mangaApi.getManga(params);
                if (res.content.err) return false;

                return res.content.manga;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        const getPostById = async (id) => {
            if (!id) return;

            const data = {
                post_id: id,
            }

            try {
                const res = await forumApi.getPost(data);
                if (res.content.err) return false;

                return res.content.post;
            } catch (err) {
                console.log(err);
                return false;
            }
        }


        return (
            <NavLink to={uri ? uri : "#"} style={{ display: 'flex' }} onClick={() => handleViewed(notification.notification_id)}>
                <div>
                    <Avatar className='image' src={notification.image_url} style={{ borderRadius: notification.image_url === imgDefault ? "0px" : "50px" }} alt="" />
                </div>

                <div className='content'>
                    <Typography.Text>
                        <div title={notification.notification_content} style={{ display: 'unset' }} dangerouslySetInnerHTML={{ __html: notification.notification_content }}></div>
                    </Typography.Text>
                </div>
            </NavLink >
        )
    }




    return (
        <div className="notification-item" key={key} style={{ background: notification.is_viewed || notification.is_interacted ? '#fff' : '#daf1f985', cursor: "default" }} >
            {handleRender()}

            <div
                style={{ color: "#8f8f8f", fontSize: '13px', marginTop: "5px" }}
                title={format.formatDate02(notification.created_at)}
            >
                {format.relativeTime(notification.created_at)}
            </div>
        </div>
    )
}

export default memo(Notification);
