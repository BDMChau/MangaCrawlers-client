import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import botMusicApi from '../../api/apis/botMusicApi';

import BotYoutubeMusic from './BotYoutubeMusic'
import botMessagesPreset from './features/botMessagesPreset'

import playicon from '../../assets/img/playicon.svg'
import pauseicon from '../../assets/img/pause.svg'

import { message_error } from '../notifications/message';


export default function BotYoutubeMusicService() {
    const userState = useSelector((state) => state.userState);

    const [userName, setUserName] = useState("Anonymous");

    const [messages, setMessages] = useState([]);

    const [userInput, setUserInput] = useState("");
    const [userCommand, setUserCommand] = useState("");

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



    const handleSendInput = async (inputVal) => {
        if (inputVal) {
            setIsLoading(true);
            setUserInput(inputVal)

            const strList = inputVal.split(" ");
            const value = strList[1];
            const cmd = strList[0] + " ";

            const userMessages = {
                title: "user",
                cmd: cmd,
                content: inputVal
            }
            const newContent = userMessages.content.replace(cmd, "");
            userMessages.content = newContent

            setMessages(prevMess => [...prevMess, userMessages])



            handleUserCmd(cmd, value)

        }
    }


    const handleUserCmd = (command, value) => {
        if (command === "/play ") {
            setItemId("")
            playSong(value);
            setUserCommand(command)

        } else if (command === "/stop ") {
            if (itemId) {
                const botMessages = {
                    title: "bot",
                    content: botMessagesPreset.stop(defaultUrl, itemId, itemInfo.title, userName)
                }
                
                setItemId("");
                setItemInfo({});
                setMessages(prevMess => [...prevMess, botMessages])
                setUserCommand(command)
            }

            setIsLoading(false)

        } else if (command === "/pause ") {
            if (itemId) {
                const botMessages = {
                    title: "bot",
                    content: botMessagesPreset.pause(playicon)
                }

                setMessages(prevMess => [...prevMess, botMessages])
                setUserCommand(command)
            }

            setIsLoading(false)

        } else if (command === "/unpause ") {
            if (itemId) {
                const botMessages = {
                    title: "bot",
                    content: botMessagesPreset.unpause(pauseicon)
                }

                setMessages(prevMess => [...prevMess, botMessages])
                setUserCommand(command)
            }

            setIsLoading(false)

        } else if (command === "/clear ") {
            if (itemId) {
                const botMessages = {
                    title: "bot",
                    content: botMessagesPreset.clear()
                }

                setMessages(prevMess => [...prevMess, botMessages])
            }

            setIsLoading(false)

        } else if (command === "/queue ") {
            if (itemId) {
                const botMessages = {
                    title: "bot",
                    content: botMessagesPreset.queue()
                }

                setMessages(prevMess => [...prevMess, botMessages])
                setUserCommand(command)
            }

            setIsLoading(false)

        } else if (command === "/jump ") {
            if (itemId) {
                const botMessages = {
                    title: "bot",
                    content: botMessagesPreset.jump(defaultUrl, itemId, itemInfo.title, userName)
                }

                setMessages(prevMess => [...prevMess, botMessages])
                setUserCommand(command)
            }

            setIsLoading(false)

        } else if (command === "/hello ") {


        } else if (command === "/help ") {


        }
    }




    //////////// play video /////////////
    const playSong = async (value) => {
        if (value) {
            const strList = value.split("?v=");
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

        }
    }

    // reply for /play command 
    useEffect(() => {
        console.log(userCommand)
        if (userCommand === "/play ") {
            const botMessages = {
                title: "bot",
                content: botMessagesPreset.play(defaultUrl, itemId, itemInfo.title, userName)
            }

            setMessages(prevMess => [...prevMess, botMessages])
            setIsLoading(false)
        }
    }, [itemId, itemInfo])





    //////////////////////////// apis //////////////////////////
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
                return true;
            } else {
                const botMessages = {
                    title: "bot",
                    content: ["Sorry, there seems to be an error. Try another :("]
                }

                setMessages(prevMess => [...prevMess, botMessages])
                setIsLoading(false)
                message_error("Having an error when play your song :(");
                setItemId("");
                setItemInfo({});
                return false;
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
                return true;
            } else {
                const botMessages = {
                    title: "bot",
                    content: ["Sorry, there seems to be an error. Try another :("]
                }

                setMessages(prevMess => [...prevMess, botMessages])
                setIsLoading(false)
                message_error("Having an error when play your song :(")
                setItemId("");
                setItemInfo({});
                return false;
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

            userCommand={userCommand}
        />
    )
}
