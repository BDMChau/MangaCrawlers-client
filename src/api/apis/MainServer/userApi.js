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
    addCmt: (token, data) => {
        const uri = '/api/user/addcommentchapter';
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
};

export default userApi;