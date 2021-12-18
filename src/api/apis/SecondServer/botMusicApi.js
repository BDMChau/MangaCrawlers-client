import { secondAxiosClient, axiosClient } from '../../axiosClients';


const botMusicApi = {
    getApikey: () => {
        const uri = '/api/auth/youtubeapikey';
        return axiosClient.get(uri);
    },
    getListVideosFromYoutubeApi: (data, quantity) => {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${quantity}&q=${data.keyword}&type=video&key=${data.apiKey}`;
        return secondAxiosClient.get(url);
    },
    getVideoFromYoutubeApi: (data) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${data.videoId}&key=${data.apiKey}`;
        return secondAxiosClient.get(url);
    },

    /////////////// server nodejs
    postMessage: (data) => {
        const uri = `/api/bot/postMessage`;
        return secondAxiosClient.post(uri, data);
    },
    getHistoryMessages: (data) => {
        const uri = `/api/bot/gethistorymessages`;
        return secondAxiosClient.post(uri, data);
    },
    addToQueue: (data) => {
        const uri = `/api/bot/addtoqueue`;
        return secondAxiosClient.put(uri, data);
    },
    modifyWhenVideoError: (data) => {
        const uri = `/api/bot/modifyerrorvideo`;
        return secondAxiosClient.put(uri, data);
    },
    getQueue: (data) => {
        const uri = `/api/bot/getqueue`;
        return secondAxiosClient.post(uri, data);
    },
    removeQueue: (data) => {
        const uri = `/api/bot/removequeue`;
        return secondAxiosClient.delete(uri, {
            data
        });
    },
};

export default botMusicApi;