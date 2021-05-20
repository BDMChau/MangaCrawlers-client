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
    getMangasFromGenre: (data) => {
        const url = '/api/manga/findmangafromgenre'
        return axiosClient.post(url, data)
    },
    search: (data) => {
        const url = '/api/manga/searchmangas'
        return axiosClient.post(url, data)
    },

}

export default mangaApi;