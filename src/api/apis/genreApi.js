import axiosClient from '../axiosClient';
 

const genreApi = {
    getAll: () => {
        const url = '/api/genre/getallgenres'
        return axiosClient.get(url)
    }

}

export default genreApi;