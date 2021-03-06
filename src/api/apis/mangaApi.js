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
    getTredingDaily: () => {
        const url = '/api/manga/getdaily'
        return axiosClient.get(url)
    },
    getSuggestionList: () => {
        const url = '/api/manga/getsuggestion'
        return axiosClient.get(url)
    },
    search: (data) => {
        const url = '/api/manga/searchmangas'
        return axiosClient.post(url, data)
    },
    getComments: (data) => {
        const url = '/api/manga/getcommentsmanga'
        return axiosClient.post(url, data)
    },
    searchMangasByGenres: (data) => {
        const url = '/api/manga/advancedsearch'
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
        const url = '/api/user/addfollowingmanga'
        return axiosClient.post(url, data, {
            headers: {
                Authorization: token
            }
        })
    },
    removeFollowing: (data, token) => {
        const url = '/api/user/deletefollowingmanga'
        return axiosClient.delete(url, {
            headers: {
                Authorization: token
            },
            data
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
    ratingManga: (data, token) => {
        const url = '/api/user/ratingmanga'
        return axiosClient.put(url, data, {
            headers: {
                Authorization: token
            }
        })
    },

}

export default mangaApi;