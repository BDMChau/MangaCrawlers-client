import { axiosClient } from '../../axiosClients';


const chapterApi = {
    getChapterImgs: (data) => {
        const uri = '/api/chapter/getimgschapter' // fix this to get method
        return axiosClient.post(uri, data)
    },
    getTotalChapters: (data) => {
        const uri = `/api/chapter/get_total_chapters?manga_id=${data.manga_id}` // fix this to get method
        return axiosClient.get(uri)
    },
}

export default chapterApi;