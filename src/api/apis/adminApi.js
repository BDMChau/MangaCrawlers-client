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
    getAllTransGroups: (token) => {
        const url = '/api/admin/getalltransgroup'
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
    removeManga: (token, data) => {
        const url = '/api/admin/deletemanga'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            },
            data
        })
    },
    removeTransGroup: (token, data) => {
        const url = '/api/admin/deletetransgroup'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            },
            data
        })
    },
    getReportUser: (token) => {
        const url = '/api/admin/reportuser'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    }, 
    getReportManga: (token) => {
        const url = '/api/admin/reportmanga'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    getReportTransGr: (token) => {
        const url = '/api/admin/reporttransgroup'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
}


export default adminApi;