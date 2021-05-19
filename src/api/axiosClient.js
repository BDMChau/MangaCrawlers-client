import axios from 'axios';
import queryString from 'query-string';
import { message_error } from '../components/notifications/message';
import endPoint from '../config/endPoint';
import { errCodeResCheking, code2xxCheking } from './security/ErrResCheking';

const axiosClient = axios.create({
    baseURL: endPoint.local,
    headers: {
        'Content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use((config) => {
    return config
})

axiosClient.interceptors.response.use((res) => {
    if (res && res.data) {
        code2xxCheking(res.data.http_code, res.data.content.msg)
        return res.data
    }

    return res;
}, (error) => {
    console.log(error.response)
    if (error.response || error.response.status) {
        errCodeResCheking(error.response);
    }
    return;
})

export default axiosClient;