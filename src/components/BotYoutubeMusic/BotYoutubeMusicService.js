import React, { useState, useEffect } from 'react'
import botMusicApi from '../../api/apis/botMusicApi';
import BotYoutubeMusic from './BotYoutubeMusic'

export default function BotYoutubeMusicService() {
    const [messages, setMessages] = useState([
      
    ]);
    const [apiKey, setApiKey] = useState("");
    const [itemId, setItemId] = useState(null);

    const urls = [
    ];

    const url = "AAAA";

    useEffect(() => {
        getApiKey();
    }, [])


    const handleSendInput = (inputVal) => {
        if (inputVal) {
            // const strList = inputVal.split("?v=");
            // const value = inputVal;
            // const videoId = strList[1];

            // if (!videoId) { // if inputVal is to search, videoId will be undefined
            //     getListFromYoutubeApi(value);
            // } else { // if inputVal is a URL, videoId after ?v= will be persent
            //     console.log("url")
            // }

            if(inputVal === "/hello"){
                const arr = [
                    "Hello ^^, I'm a bot created to play music with youtube",
                    <p>You can type <b>/help</b> to display a full list of commands available!</p>,
                ]

                setMessages(arr)
            }
        }
    }

    const getListFromYoutubeApi = async (inputVal) => {
        try {
            const data = {
                apiKey: apiKey,
                keyword: inputVal
            }

            const response = await botMusicApi.getListFromYoutubeApi(data);

            const items = response.items;
            const firstItemId = items[0].id.videoId

            setItemId(firstItemId);
        } catch (e) {
            console.log(e)
        }
    }


    const getApiKey = async () => {
        try {
            const response = await botMusicApi.getApikey();

            if (response.content) {
                setApiKey(response.content.api_key)
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <BotYoutubeMusic
            messages={messages}
            handleSendInput={(inputVal) => handleSendInput(inputVal)}

            itemId={itemId}
        />
    )
}
