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
    getManga: (data) => {
        const url = '/api/manga/getmangapage'
        return axiosClient.post(url, data)
    },

}

export default mangaApi;