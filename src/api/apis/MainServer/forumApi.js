import { axiosClient } from '../../axiosClients';


const forumApi = {
    ////////////// unauth part
    getListCategory: () => {
        const uri = '/api/forum_unauth/category/getall';
        return axiosClient.get(uri);
    },
    getPost: (data) => {
        const uri = `/api/forum_unauth/post/getpost?post_id=${data.post_id}`
        return axiosClient.get(uri);
    }

}

export default forumApi;