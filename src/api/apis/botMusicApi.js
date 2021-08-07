import { axiosClient } from '../axiosClients';


const botMusicApi = {
    getApikey: () => {
        const url = '/api/auth/youtubeapikey'
        return axiosClient.get(url)
    },
    getListVideosFromYoutubeApi: (data) => {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${data.keyword}&type=video&key=AIzaSyCGm9ZCH1xcHpEkzTNgw-lZQgKzlvCTq0Q`
        return axiosClient.get(url)
    },
    getVideoFromYoutubeApi: (data) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${data.videoId}&key=AIzaSyCGm9ZCH1xcHpEkzTNgw-lZQgKzlvCTq0Q`
        return axiosClient.get(url)
    }
}

export default botMusicApi;