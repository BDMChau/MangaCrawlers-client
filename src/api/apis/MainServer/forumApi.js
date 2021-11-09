import { axiosClient } from '../../axiosClients';


const forumApi = {
    ////////////// unauth part
    getListCategory: () => {
        const uri = '/api/forum_unauth/category/getall';
        return axiosClient.get(uri);
    },
    getAllPost: (data) => {
        const uri = `/api/forum_unauth/post/getposts?from=${data.from}&amount=${data.amount}`
        return axiosClient.get(uri);
    },
    getPost: (data) => {
        const uri = `/api/forum_unauth/post/getpost?post_id=${data.post_id}`
        return axiosClient.get(uri);
    },
    getPostsWithCategory: (data) => {
        const uri = `/api/forum_unauth/post/getposts_bycategory?category_id=${data.category_id}`
        return axiosClient.get(uri);
    },
    searchPosts: (data) => {
        const uri = `/api/forum_unauth/post/search?value=${data.title}`
        return axiosClient.get(uri)
    },

    ////////////// auth
    createPost: (token, data) => {
        const uri = `/api/forum/post/create`
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
    likePost: (token, data) => {
        const uri = `/api/forum/post/add_like`
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
    unlikePost: (token, data) => {
        const uri = `/api/forum/post/unlike`
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
    checkIsLiked: (token, data) => {
        const uri = `/api/forum/post/check_user_like`
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
}

export default forumApi;