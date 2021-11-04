import { axiosClient } from '../../axiosClients';


const forumApi = {
    ////////////// unauth part
    getListCategory: () => {
        const uri = '/api/forum_unauth/category/getall';
        return axiosClient.get(uri);
    },
    getAllPost: (data) => {
        const uri = `/api/forum_unauth/post/getpostsb?from=${data.from}&amount=${data.amount}`
        return axiosClient.get(uri);
    },
    getPost: (data) => {
        const uri = `/api/forum_unauth/post/getpost?post_id=${data.post_id}`
        return axiosClient.get(uri);
    },
    getPostsWithCategory: (data) => {
        const uri = `/api/forum_unauth/post/getposts_bycategory?category_id=${data.category_id}`
        return axiosClient.get(uri);
    }

}

export default forumApi;