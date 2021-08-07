import React, { useState, useEffect } from 'react'
import botMusicApi from '../../api/apis/botMusicApi';
import BotYoutubeMusic from './BotYoutubeMusic'

export default function BotYoutubeMusicService() {
    const [messages, setMessages] = useState([]);

    const [userInput, setUserInput] = useState("");

    const [isLoading, setIsLoading] = useState("");

    const [apiKey, setApiKey] = useState("");
    const [itemId, setItemId] = useState(null);

    const defaultUrl = "https://www.youtube.com/watch"


    useEffect(() => {
        getApiKey();
    }, [])



    const handleSendInput = (inputVal) => {
        if (inputVal) {
            setIsLoading(true);
            setUserInput(inputVal)

            const userMessages = {
                title: "user",
                content: [inputVal]
            }
            setMessages(prevMess => [...prevMess, userMessages])


            // setTimeout(() => {
            //     const strList = inputVal.split("?v=");
            //     const value = inputVal;
            //     const videoId = strList[1];

            //     if (!videoId) { // if inputVal is to search, videoId will be undefined
            //         getListVideosFromYoutubeApi(value);

            //     } else { // if inputVal is a URL, videoId after ?v= will be persent
            //         if (strList[0] !== defaultUrl) {
            //             console.log("invalid Url!")
            //             return;
            //         }

            //         getVideoFromYoutubeApi(videoId);
            //     }

            //     setIsLoading(false)
            // }, 500)
        }
    }


    /////////////// reply when have message from user ////////////////
    useEffect(() => {
        if (messages[messages.length - 1]) {
            // confirm the last message is from user
            if (messages[messages.length - 1].title === 'user') {
                handleReplyUser()
            }
        }
    }, [messages])

    const handleReplyUser = () => {
        if (userInput === "/hello ") {
            const arr = [
                "Hello ^^, I'm a bot created to play music with youtube",
                "<p>You can type <b>/help</b> to display a full list of commands available!</p>",
                "<img src='https://static.wikia.nocookie.net/nier/images/b/b1/Replicant_Ver_1.2_Art.jpg/revision/latest/scale-to-width-down/670?cb=20210503085821' alt='' />",
            ]


            const botMessages = {
                title: "bot",
                content: arr
            }
            setMessages(prevMess => [...prevMess, botMessages])
        }
    }




    //////////////////////////// apis //////////////////////////

    /**
    * @param {String} value - The value value to search on youtube
    */
    const getListVideosFromYoutubeApi = async (value) => {
        try {
            const data = {
                apiKey: apiKey,
                keyword: value
            }

            const response = await botMusicApi.getListVideosFromYoutubeApi(data);

            const items = response.items;
            console.log(items[0])
            const firstItemId = items[0].id.videoId

            setItemId(firstItemId);
        } catch (e) {
            console.log(e)
        }
    }


    const getVideoFromYoutubeApi = async (videoId) => {
        try {
            const data = {
                apiKey: apiKey,
                videoId: videoId
            }

            const response = await botMusicApi.getVideoFromYoutubeApi(data);

            const videoIdRes = response.items[0].id

            setItemId(videoIdRes);
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
            isLoading={isLoading}

            handleSendInput={(inputVal) => handleSendInput(inputVal)}

            itemId={itemId}
        />
    )
}
