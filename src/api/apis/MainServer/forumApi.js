import { axiosClient } from '../../axiosClients';


const forumApi = {
    getListCategory: () => {
        const uri = '/api/post-category/getall';
        return axiosClient.get(uri);
    },


}

export default forumApi;