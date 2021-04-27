import axios from 'axios';
import queryString from 'query-string';
import endPoint from '../config/endPoint';
import { errCodeResCheking } from '../helpers/ErrResCheking';

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