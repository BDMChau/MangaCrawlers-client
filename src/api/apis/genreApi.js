import {axiosClient} from '../axiosClients';
 

const genreApi = {
    getAll: () => {
        const uri = '/api/genre/getallgenres';
        return axiosClient.get(uri);
    }

};

export default genreApi;