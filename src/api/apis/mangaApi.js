import axiosClient from '../axiosClient';
 

const mangaApi = {
    getAll: () => {
        const url = '/api/manga/getall'
        return axiosClient.get(url)
    },

}

export default mangaApi;