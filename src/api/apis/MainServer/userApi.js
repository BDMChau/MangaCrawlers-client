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
    getFriendRequest: (token) => {
        const uri = `/api/user/get_friend_requests`;
        return axiosClient.get(uri,{
            headers:{
                Authorization: token
            }
        });
    },
    getFriends: (token, data) => {
        const uri = `/api/user/get_list_friends?from=${data.from}&amount=${data.amount}`;
        return axiosClient.get(uri,{
            headers:{
                Authorization: token
            }
        });
    },
    addCmt: (token, data) => {
        const uri = '/api/user/addcommentmanga';
        return axiosClient.post(uri, data, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    filter: (token, data) => {
        const uri = '/api/user/filter_comments';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    deleteCmt: (token, data) => {
        const uri = '/api/user/deletecomment';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },
    updateCmt: (token, data) => {
        const uri = '/api/user/updatecomment';
        return axiosClient.post(uri, data, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        });
    },
    searchUsers: (token, data) => {
        const uri = '/api/user/searchusers';
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
    acceptInvitationToJoinTem: (token, data) => {
        const uri = '/api/user/accept_to_join_team';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        });
    },

    ////////////////// unauth parts //////////////////
    getUserInfo: (data) => {
        const uri = '/api/user_unauth/get_userinfo';
        return axiosClient.post(uri, data);
    }
};

export default userApi;