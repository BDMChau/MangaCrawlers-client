import axiosClient from '../axiosClient';
 

const authApi = {
    postDataSignIn: (data) => {
        const url = '/api/auth/signin'
        return axiosClient.post(url, data)
    },
    oauthGoogle: () => {
        const url = '/api/auth/geturloauthgoogle'
        return axiosClient.get(url)
    },
    getAAA: () => {
        const url = '/api/auth/getdataoauthgoogle'
        return axiosClient.get(url)
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
    },

    verifyAccount: (data) => {
        const url = '/api/auth/confirmverification'
        return axiosClient.post(url, data)
    },
}

export default authApi;