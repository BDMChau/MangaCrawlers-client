import axiosClient from '../axiosClient';
 

const chapterApi = {
    getChapterImgs: (data) => {
        const url = '/api/chapter/getimgchapter' // fix this to get method
        return axiosClient.post(url, data)
    },

}

export default chapterApi;