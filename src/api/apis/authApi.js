import { axiosClient } from '../axiosClients';


const authApi = {
    postDataSignIn: (data) => {
        const uri = '/api/auth/signin'
        return axiosClient.post(uri, data)
    },
    oauthGoogle: () => {
        const uri = '/api/auth/geturioauthgoogle'
        return axiosClient.get(uri)
    },
    getAAA: () => {
        const uri = '/api/auth/getdataoauthgoogle'
        return axiosClient.get(uri)
    },

    postDataSignUp: (data) => {
        const uri = '/api/auth/signup'
        return axiosClient.post(uri, data)
    },

    signOut: (data) => {
        const uri = '/api/auth/signout'
        return axiosClient.post(uri, data)
    },

    changePassword: (data) => {
        const uri = '/api/auth/changepass'
        return axiosClient.put(uri, data)
    },

    requestchangepassword: (data) => {
        const uri = '/api/auth/requestchangepass'
        return axiosClient.post(uri, data)
    },

    verifyAccount: (data) => {
        const uri = '/api/auth/confirmverification'
        return axiosClient.post(uri, data)
    },
}

export default authApi;