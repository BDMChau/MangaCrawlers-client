import { secondAxiosClient } from '../axiosClients';


const botMusicApi = {
    getApikey: () => {
        const uri = '/api/auth/youtubeapikey'
        return secondAxiosClient.get(uri)
    },
    getListVideosFromYoutubeApi: (data) => {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${data.keyword}&type=video&key=AIzaSyCGm9ZCH1xcHpEkzTNgw-lZQgKzlvCTq0Q`
        return secondAxiosClient.get(url)
    },
    getVideoFromYoutubeApi: (data) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${data.videoId}&key=AIzaSyCGm9ZCH1xcHpEkzTNgw-lZQgKzlvCTq0Q`
        return secondAxiosClient.get(url)
    },

    /////////////// server nodejs
    getBotMessagesByCommand: (data) => {
        const uri = `/api/bot/getbotmessage`
        return secondAxiosClient.post(uri, data)
    }
}

export default botMusicApi;