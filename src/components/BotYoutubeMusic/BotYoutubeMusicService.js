import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import botMusicApi from '../../api/apis/botMusicApi';
import { message_error } from '../notifications/message';
import BotYoutubeMusic from './BotYoutubeMusic'
import { commandsList } from './features/commandsList';

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
        if (userState[0]) {
            setUserName(userState[0].user_name)
        }
    }, [userState[0]])



    const handleSendInput = (inputVal) => {
        if (inputVal) {
            setIsLoading(true);
            setUserInput(inputVal)

            const strList = inputVal.split(" ");
            const cmd = strList[0] + " ";

            const userMessages = {
                title: "user",
                cmd: cmd,
                content: inputVal
            }
            const newContent = userMessages.content.replace(cmd, "");
            userMessages.content = newContent

            setMessages(prevMess => [...prevMess, userMessages])

            if (cmd === "/play ") {
                handlePlaySong(inputVal);
            }
        }
    }

    const handlePlaySong = (inputVal) => {
        if (inputVal) {
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
        console.log("???")
        if (itemId && Object.keys(itemInfo).length !== 0) {
            if (messages[messages.length - 1]) {
                // confirm the last message is from user
                if (messages[messages.length - 1].title === 'user') {
                    handleReplyUser()
                }
            }
        }
    }, [itemId, itemInfo])

    const handleReplyUser = () => {
        const strList = userInput.split(" ");
        const cmd = strList[0] + " ";

        if (cmd === "/play ") {
            const arr = [
                `Queued <a href=${defaultUrl}?v=${itemId} target="blank_" >${itemInfo.title}</a> <p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`,
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

            if (response) {
                const items = response.items;

                const firstItemId = items[0].id.videoId
                const firstItemSnippet = response.items[0].snippet

                setItemId(firstItemId);
                setItemInfo(firstItemSnippet);
            } else {
                message_error("Having an error when play your song :(")
            }

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

            if (response) {
                const itemIdRes = response.items[0].id
                const itemSnippet = response.items[0].snippet

                setItemId(itemIdRes);
                setItemInfo(itemSnippet);
            } else {
                message_error("Having an error when play your song :(")
            }
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
