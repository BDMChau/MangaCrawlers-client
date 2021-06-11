import axiosClient from '../axiosClient';


const userApi = {
    updateAvatar: (token, formData) => {
        const url = '/api/user/updateavatar'
        return axiosClient.put(url, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        })
    },
    removeAvatar: (token) => {
        const url = '/api/user/removeavatar'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            }
        })
    },
    addCmtChapter: (token, data) => {
        const url = '/api/user/addcommentchapter'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    ////////////////// translation group
    registerTranslationGroup: (token, data) => {
        const url = '/api/user/signuptransgroup'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    getTransGroupInfo: (token, data) => {
        const url = '/api/user/gettransgroupinfo'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    addNewProjectFields: (token, data) => {
        const url = '/api/user/addnewprojectmangafields'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    addNewProjectThumbnail: (token, formData) => {
        const url = '/api/user/addnewprojectmangathumbnail'
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        })
    },
    uploadImagesChapter: (token, formData) => {
        const url = '/api/user/uploadchapterimgs'
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        })
    },
    getMangaInfo: (token, data) => {
        const url = '/api/user/getmangainfo'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    getMangaInfo: (token, data) => {
        const url = '/api/user/getmangainfo'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    removeManga: (token, data) => {
        const url = '/api/user/deletemanga'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            },
            data
        })
    },
}

export default userApi;