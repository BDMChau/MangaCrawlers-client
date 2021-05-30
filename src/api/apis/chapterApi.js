import axiosClient from '../axiosClient';
 

const chapterApi = {
    getChapterImgs: (data) => {
        const url = '/api/chapter/getimgschapter' // fix this to get method
        return axiosClient.post(url, data)
    },
    getComments: (data) => {
        const url = '/api/chapter/getcommentschapter'
        return axiosClient.post(url, data)
    },

}

export default chapterApi;