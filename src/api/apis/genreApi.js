import {axiosClient} from '../axiosClients';
 

const genreApi = {
    getAll: () => {
        const url = '/api/genre/getallgenres'
        return axiosClient.get(url)
    }

}

export default genreApi;