import axios from 'axios';
import queryString from 'query-string';
import endPoint from '../config/endPoint';
import { errCodeResCheking, code2xxCheking } from './security/ErrResCheking';


// Main server >> spring boot
const axiosClient = axios.create({
    baseURL: endPoint.product,
    headers: {
    },
    paramsSerializer: params => {
        queryString.stringify(params)
    }
});

axiosClient.interceptors.request.use((config) => {
    return config
})

axiosClient.interceptors.response.use((res) => {
    if (res || res.data) {
        if (res.data.http_code) {
            code2xxCheking(res.data.http_code, res.data.content.msg)
        } else if (res.status) {
            code2xxCheking(res.status, res.config.url)
        }
        return res.data
    }

    return res;
}, (error) => {
    console.log(error)
    if (error.response || error.response.status) {
        errCodeResCheking(error.response);
        return;
    }
    return;
})

///////////////////////////

// second server >> nodejs
const secondAxiosClient = axios.create({
    baseURL: endPoint.local02,
    headers: {
    },
    paramsSerializer: params => {
        queryString.stringify(params)
    }
});

secondAxiosClient.interceptors.request.use((config) => {
    return config
})

secondAxiosClient.interceptors.response.use((res) => {
    if (res || res.data) {
        if (res.data.http_code) {
            code2xxCheking(res.data.http_code, res.data.content.msg)
        } else if (res.status) {
            code2xxCheking(res.status, res.config.url)
        }
        return res.data
    }

    return res;
}, (error) => {
    console.log(error)
    if (error.response || error.response.status) {
        errCodeResCheking(error.response);
        return;
    }
    return;
})

export  {axiosClient, secondAxiosClient};