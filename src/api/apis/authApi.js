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

    resetPassword: (data) => {
        const url = '/api/auth/resetpass'
        return axiosClient.post(url, data)
    },

    sendEmail: (data) => {
        const url = '/api/auth/sendemail'
        return axiosClient.post(url, data)
    }
}

export default authApi;