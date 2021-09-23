import { axiosClient } from '../../axiosClients';


const mangaApi = {
    getLatest: () => {
        const uri = '/api/manga/getlastest';
        return axiosClient.get(uri);
    },
    getTop: () => {
        const uri = '/api/manga/gettop';
        return axiosClient.get(uri);
    },
    getWeekly: () => {
        const uri = '/api/manga/getweekly';
        return axiosClient.get(uri);
    },
    getManga: (params) => {
        const uri = `/api/manga/getmangapage?manga_id=${params.manga_id}`;
        return axiosClient.get(uri);
    },
    getChaptersOfManga: (params) => {
        const uri = `/api/manga/getchaptersofmanga?manga_id=${params.manga_id}`;
        return axiosClient.get(uri);
    },
    getMangasFromGenre: (data) => {
        const uri = '/api/manga/findmangafromgenre'; // fix this to get method
        return axiosClient.post(uri, data);
    },
    getTredingDaily: () => {
        const uri = '/api/manga/getdaily';
        return axiosClient.get(uri);
    },
    getSuggestionList: () => {
        const uri = '/api/manga/getsuggestion';
        return axiosClient.get(uri);
    },
    search: (data) => {
        const uri = '/api/manga/searchmangas';
        return axiosClient.post(uri, data);
    },
    getComments: (data) => {
        const uri = '/api/manga/getcommentsmanga';
        return axiosClient.post(uri, data);
    },
    searchMangasByGenres: (data) => {
        const uri = '/api/manga/advancedsearch';
        return axiosClient.post(uri, data);
    },

    ///////////// user part
    getHistoryManga: (token) => {
        const uri = '/api/user/gethistorymanga';
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    getFollowingManga: (token) => {
        const uri = '/api/user/getfollowingmangas';
        return axiosClient.get(uri, {
            headers: {
                Authorization: token
            }
        })
    },
    addToFollowing: (data, token) => {
        const uri = '/api/user/addfollowingmanga';
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
    removeFollowing: (data, token) => {
        const uri = '/api/user/deletefollowingmanga';
        return axiosClient.delete(uri, {
            headers: {
                Authorization: token
            },
            data
        })
    },
    updateReadingHistory: (data, token) => {
        const uri = '/api/user/updatereadinghistory';
        return axiosClient.put(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
    ratingManga: (data, token) => {
        const uri = '/api/user/ratingmanga';
        return axiosClient.put(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },

}

export default mangaApi;