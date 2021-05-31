import axiosClient from '../axiosClient';


const adminApi = {
    getAllUsers: (token) => {
        const url = '/api/user/getallusers'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    getAllMangas: (token) => {
        const url = '/api/user/getallmangas'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    deprecateUser: (token, data) => {
        const url = '/api/user/deprecateuser'
        return axiosClient.put(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    removeUser: (token, data) => {
        const url = '/api/user/deleteuser'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            },
            data
        })
    },
}

export default adminApi;