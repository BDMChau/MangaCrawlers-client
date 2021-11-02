import { axiosClient } from '../../axiosClients';


const chapterApi = {
    getChapterImgs: (data) => {
        const uri = '/api/chapter/getimgschapter' // fix this to get method
        return axiosClient.post(uri, data)
    },
}

export default chapterApi;