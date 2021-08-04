import axiosClient from '../axiosClient';


const botMusicApi = {
    getApikey: () => {
        const url = '/api/auth/youtubeapikey'
        return axiosClient.get(url)
    },
    getListFromYoutubeApi: (data) => {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${data.keyword}&type=video&key=${data.apiKey}`
        return axiosClient.get(url)
    }
}

export default botMusicApi;