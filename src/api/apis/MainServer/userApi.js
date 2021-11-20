import { axiosClient } from '../../axiosClients';


const userApi = {
    updateAvatar: (token, formData) => {
        const uri = '/api/user/updateavatar';
        return axiosClient.put(uri, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    removeAvatar: (token) => {
        const uri = '/api/user/removeavatar';
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            }
        });
    },
    updateDescription: (token, data) => {
        const uri = '/api/user/update_description';
        return axiosClient.put(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    getFriendRequest: (token, data) => {
        const uri = `/api/user/get_friend_requests?from=${data.from}&amount=${data.amount}`;
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        });
    },
    getFriends: (token, data) => {
        const uri = `/api/user/get_list_friends?from=${data.from}&amount=${data.amount}`;
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        });
    },
    getTotalFriends: (token) => {
        const uri = `/api/user/get_total_friend`;
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        });
    },
    checkReqStatus: (token, data) => {
        const uri = `/api/user/check_status`;
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    getCommentsManga: (data) => {
        const { target_title, target_id, from, amount, user_id } = data;

        const uri = `/api/user_unauth/get_comments?target_title=${target_title}&target_id=${target_id}&from=${from}&amount=${amount}&user_id=${user_id}`;
        return axiosClient.get(uri);
    },
    getCommentsChild: (data) => {
        const {comment_id, from, amount, user_id} = data;

        const uri = `/api/user_unauth/get_comments_child?comment_id=${comment_id}&from=${from}&amount=${amount}&user_id=${user_id}`;
        return axiosClient.get(uri);
    },
    addCmt: (token, data) => {
        const uri = '/api/user/add_comment';
        return axiosClient.post(uri, data, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    filterCmts: (token, data) => {
        const uri = '/api/user/filter_comments';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    deleteCmt: (token, data) => {
        const uri = '/api/user/delete_comment';
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        });
    },
    updateCmt: (token, data) => {
        const uri = '/api/user/update_comment';
        return axiosClient.put(uri, data, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    checkIsLiked: (token, data) => {
        const uri = '/api/user/check_user_like';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    likeCmt: (token, data) => {
        const uri = '/api/user/add_like';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    unlikeCmt: (token, data) => {
        const uri = '/api/user/unlike';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    ////////////////// translation group
    registerTranslationGroup: (token, data) => {
        const uri = '/api/user/signuptransgroup';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    deleteGroup: (token, data) => {
        const uri = '/api/user/deletetransgroup';
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        });
    },
    getTransGroupInfo: (token, data) => {
        const uri = '/api/user/gettransgroupinfo';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    addNewProjectFields: (token, data) => {
        const uri = '/api/user/addnewprojectmangafields';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    addNewProjectThumbnail: (token, formData) => {
        const uri = '/api/user/addnewprojectmangathumbnail';
        return axiosClient.post(uri, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    uploadImagesChapter: (token, formData) => {
        const uri = '/api/user/uploadchapterimgs';
        return axiosClient.post(uri, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    getMangaInfo: (token, data) => {
        const uri = '/api/user/getmangainfo';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    removeManga: (token, data) => {
        const uri = '/api/user/deletemanga';
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        });
    },
    removeMember: (token, data) => {
        const uri = '/api/user/remove_member';
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        });
    },
    getNotifications: (token, data) => {
        const uri = '/api/notification/get_list_notification';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    updateViewedNotifications: (token) => {
        const uri = '/api/notification/update_viewed';
        return axiosClient.post(uri, {}, {
            headers: {
                Authorization: token
            }
        });
    },
    updateInteractedNotification: (token, data) => {
        const uri = '/api/notification/update_interacted';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    updateDeletedNotification: (token, data) => {
        const uri = '/api/notification/update_deleted';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    updateNotificationFrReq: (token, data) => {
        const uri = '/api/notification/update_notification_friend_req';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    acceptInvitationToJoinTem: (token, data) => {
        const uri = '/api/user/accept_to_join_team';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    acceptFriendReq: (token, data) => {
        const uri = '/api/user/add_friend';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    unfriend: (token, data) => {
        const uri = '/api/user/unfriend';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    updateStatusFriendToFalse: (token, data) => {
        const uri = '/api/friend_request/update_to_false';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    getMutualFriends: (token, data) => {
        const uri = `/api/user/get_mutual_friends?to_user_id=${data.user_id}`;
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        });
    },

    ////////////////// unauth parts //////////////////
    getTotalLikes: (data) => {
        const uri = '/api/user_unauth/get_total_like';
        return axiosClient.post(uri, data);
    },
    searchUsers: (data) => {
        const uri = '/api/user_unauth/searchusers';
        return axiosClient.post(uri, data);
    },
    getUserInfo: (data) => {
        const uri = `/api/user_unauth/get_userinfo?user_id=${data.user_id}`;
        return axiosClient.get(uri);
    },
    getPostsOfUser: (data) => {
        const uri = `/api/user_unauth/get_posts_of_user?user_id=${data.user_id}&from=${data.from}&amount=${data.amount}`;
        return axiosClient.get(uri);
    },
    getFriendsOfUser: (data) => {
        const uri = `/api/user_unauth/get_friends_of_user?user_id=${data.user_id}&from=${data.from}&amount=${data.amount}`;
        return axiosClient.get(uri);
    },
    getComment: (data) => {
        const uri = `/api/user_unauth/get_comment?comment_id=${data.comment_id}`;
        return axiosClient.get(uri);
    },
};

export default userApi;