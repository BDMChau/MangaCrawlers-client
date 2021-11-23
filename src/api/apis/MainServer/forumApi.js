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
    getTopPostCmts: (quantity) => {
        const uri = `/api/forum_unauth/post/get_top_post_cmts?quantity=${quantity}`
        return axiosClient.get(uri);
    },
    getTopPostsLike: (quantity) => {
        const uri = `/api/forum_unauth/post/get_top_post_like?quantity=${quantity}`
        return axiosClient.get(uri);
    },
    getTopPostsdDislike: (quantity) => {
        const uri = `/api/forum_unauth/post/get_top_post_dislike?quantity=${quantity}`
        return axiosClient.get(uri);
    },
    getRandomPosts: (quantity) => {
        const uri = `/api/forum_unauth/post/getsuggestion?quantity=${quantity}`
        return axiosClient.get(uri);
    },
    getPostsWithCategory: (data) => {
        const uri = `/api/forum_unauth/post/getposts_bycategory?category_id=${data.category_id}&from=${data.from}&amount=${data.amount}`
        return axiosClient.get(uri);
    },
    searchPosts: (data) => {
        const uri = `/api/forum_unauth/post/search?value=${data.title}`
        return axiosClient.get(uri)
    },
    getCmtsPost: (data) => {
        const uri = `/api/forum_unauth/post/getcommentspost`
        return axiosClient.post(uri, data)
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
    dislikePost: (token, data) => {
        const uri = `/api/forum/post/add_dislike`
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
    unDislikePost: (token, data) => {
        const uri = `/api/forum/post/un_dislike`
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
    deletePost: (token, data) => {
        const uri = `/api/forum/post/remove`
        return axiosClient.post(uri, data, {
            headers: {
                Authorization: token
            }
        })
    },
}

export default forumApi;