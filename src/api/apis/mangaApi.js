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
    getManga: (params) => {
        const url = `/api/manga/getmangapage?manga_id=${params.manga_id}`
        return axiosClient.get(url);
    },
    getMangasFromGenre: (data) => {
        const url = '/api/manga/findmangafromgenre' // fix this to get method
        return axiosClient.post(url, data)
    },
    search: (data) => {
        const url = '/api/manga/searchmangas'
        return axiosClient.post(url, data)
    },

    ///////////// user part
    getHistoryManga: (token) => {
        const url = '/api/user/gethistorymanga'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    getFollowingManga: (token) => {
        const url = '/api/user/getfollowingmangas'
        return axiosClient.get(url, {
            headers: {
                Authorization: token
            }
        })
    },
    addToFollowing: (data, token) => {
        const url = '/api/user/addfollowingmangas'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    updateReadingHistory: (data, token) => {
        const url = '/api/user/updatereadinghistory'
        return axiosClient.put(url, data, {
            headers: {
                Authorization: token
            }
        })
    },

}

export default mangaApi;