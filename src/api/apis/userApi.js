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
    AddNewProjectFields: (token, data) => {
        const url = '/api/user/addnewprojectmangafields'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    AddNewProjectThumbnail: (token, formData) => {
        const url = '/api/user/addnewprojectmangathumbnail'
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: token
            }
        })
    },
}

export default userApi;