import axiosClient from '../axiosClient';


const adminApi = {
    getAllUsers: (token) => {
        const url = '/api/admin/getallusers'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    getAllMangas: (token) => {
        const url = '/api/admin/getallmangas'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    deprecateUser: (token, data) => {
        const url = '/api/admin/deprecateuser'
        return axiosClient.put(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    removeUser: (token, data) => {
        const url = '/api/admin/deleteuser'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            },
            data
        })
    },
}

export default adminApi;