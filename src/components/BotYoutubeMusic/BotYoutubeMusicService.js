import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import botMusicApi from '../../api/apis/botMusicApi';
import BotYoutubeMusic from './BotYoutubeMusic'
import pauseicon from "../../assets/img/pause.svg";

export default function BotYoutubeMusicService() {
    const userState = useSelector((state) => state.userState);

    const [userName, setUserName] = useState("Anonymous");

    const [messages, setMessages] = useState([]);

    const [userInput, setUserInput] = useState("");

    const [isLoading, setIsLoading] = useState("");

    const [apiKey, setApiKey] = useState("");

    const [itemId, setItemId] = useState("");
    const [itemInfo, setItemInfo] = useState({});

    const defaultUrl = "https://www.youtube.com/watch"


    useEffect(() => {
        getApiKey();
    }, [])


    useEffect(() => {
        if(userState[0]){
            setUserName(userState[0].user_name)
        }
    }, [userState[0]])



    const handleSendInput = (inputVal) => {
        if (inputVal) {
            setIsLoading(true);
            setUserInput(inputVal)

            const userMessages = {
                title: "user",
                content: [inputVal]
            }
            setMessages(prevMess => [...prevMess, userMessages])


            setTimeout(() => {
                const strList = inputVal.split("?v=");
                const value = inputVal;
                const videoId = strList[1];

                if (!videoId) { // if inputVal is to search, videoId will be undefined
                    getListVideosFromYoutubeApi(value);

                } else { // if inputVal is a URL, videoId after ?v= will be persent
                    if (strList[0] !== defaultUrl) {
                        console.log("invalid Url!")
                        return;
                    }

                    getVideoFromYoutubeApi(videoId);
                }

                setIsLoading(false)
            }, 400)
        }
    }


    /////////////// reply when have message from user ////////////////
    useEffect(() => {
        if (itemId && Object.keys(itemInfo).length !==0) {
            if (messages[messages.length - 1]) {
                // confirm the last message is from user
                if (messages[messages.length - 1].title === 'user') {
                    handleReplyUser()
                }
            }
        }
    }, [itemId, itemInfo])

    const handleReplyUser = () => {
        if (userInput === "/hello ") {
            const arr = [
                `<img style="width: 25px; height: 25px;" src=${pauseicon} alt="" /> Paused the player`,
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

            const firstItemId = items[0].id.videoId
            const firstItemSnippet = response.items[0].snippet

            setItemId(firstItemId);
            setItemInfo(firstItemSnippet);
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

            const itemIdRes = response.items[0].id
            const itemSnippet = response.items[0].snippet

            setItemId(itemIdRes);
            setItemInfo(itemSnippet);
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
