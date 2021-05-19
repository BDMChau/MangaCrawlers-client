import axiosClient from '../axiosClient';
 

const mangaApi = {
    getLatest: () => {
        const url = '/api/manga/getlastest'
        return axiosClient.get(url)
    },
    getTop: () => {
        const url = '/api/manga/gettop'
        return axiosClient.get(url)
    },
    getWeekly: () => {
        const url = '/api/manga/getweekly'
        return axiosClient.get(url)
    },

}

export default mangaApi;