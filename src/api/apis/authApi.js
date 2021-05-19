import axiosClient from '../axiosClient';
 

const authApi = {
    postDataSignIn: (data) => {
        const url = '/api/auth/signin'
        return axiosClient.post(url, data)
    },

    postDataSignUp: (data) => {
        const url = '/api/auth/signup'
        return axiosClient.post(url, data)
    },

    signOut: (data) => {
        const url = '/api/auth/signout'
        return axiosClient.post(url, data)
    },

    changePassword: (data) => {
        const url = '/api/auth/changepass'
        return axiosClient.put(url, data)
    },

    requestchangepassword: (data) => {
        const url = '/api/auth/requestchangepass'
        return axiosClient.post(url, data)
    }
}

export default authApi;