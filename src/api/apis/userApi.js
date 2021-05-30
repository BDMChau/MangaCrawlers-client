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
}

export default userApi;