import { axiosClient } from '../axiosClients';


const adminApi = {
    getAllUsers: (token) => {
        const uri = '/api/admin/getallusers'
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    getAllMangas: (token) => {
        const uri = '/api/admin/getallmangas'
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    getAllTransGroups: (token) => {
        const uri = '/api/admin/getalltransgroup'
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    deprecateUser: (token, data) => {
        const uri = '/api/admin/deprecateuser'
        return axiosClient.put(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
    removeUser: (token, data) => {
        const uri = '/api/admin/deleteuser'
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        })
    },
    removeManga: (token, data) => {
        const uri = '/api/admin/deletemanga'
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        })
    },
    removeTransGroup: (token, data) => {
        const uri = '/api/admin/deletetransgroup'
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        })
    },
    getReportUser: (token) => {
        const uri = '/api/admin/reportuser'
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    getReportManga: (token) => {
        const uri = '/api/admin/reportmanga'
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    getReportTransGr: (token) => {
        const uri = '/api/admin/reporttransgroup'
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
}


export default adminApi;