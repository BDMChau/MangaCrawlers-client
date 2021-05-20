import axiosClient from '../axiosClient';
 

const chapterApi = {
    getChapterImgs: (data) => {
        const url = '/api/chapter/getimgchapter'
        return axiosClient.post(url, data)
    },

}

export default chapterApi;