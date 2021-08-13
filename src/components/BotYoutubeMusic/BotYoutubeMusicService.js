import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import botMusicApi from '../../api/apis/botMusicApi';

import BotYoutubeMusic from './BotYoutubeMusic';
import botMessagesPreset from './features/botMessagesPreset';

import playIcon from '../../assets/img/playicon.svg';
import pauseIcon from '../../assets/img/pause.svg';
import kannapalm from '../../assets/img/kannafacepalm.png';
import kannabored from '../../assets/img/kannabored.gif';
import kannaconfuse from '../../assets/img/kannawhat.png';
import kannaaddok from '../../assets/img/Kannaaddokgif.gif';
import kanndsleep from '../../assets/img/kannasleep.png';

import { message_error } from '../notifications/message';


export default function BotYoutubeMusicService() {
    const userState = useSelector((state) => state.userState);

    const [userName, setUserName] = useState("Anonymous");
    const [userId, setUserId] = useState("");

    const [messages, setMessages] = useState([]);
    const [isHaveNewMessage, setIsHaveNewMessage] = useState(false);

    const [userInput, setUserInput] = useState("");
    const [userCommand, setUserCommand] = useState("");

    const [isLoading, setIsLoading] = useState(Boolean);
    const [isEndConversation, setIsEndConversation] = useState(Boolean);

    const [apiKey, setApiKey] = useState("");

    const [itemId, setItemId] = useState("");
    const [itemInfo, setItemInfo] = useState({});

    const [offset, setOffset] = useState(0);
    const [sttScroll, setSttScroll] = useState(false);


    const defaultUrl = "https://www.youtube.com/watch";


    useEffect(() => {
        getApiKey();
    }, []);

    useEffect(() => {
        if (userId) getHistoryMessages();
    }, [userId]);


    useEffect(() => {
        if (userState[0]) {
            setUserId(userState[0].user_id);
            setUserName(userState[0].user_name);
            sessionStorage.removeItem("userId");

            // getHistoryMessages();
        } else {
            setMessages([])
            setUserId("");
            setUserName("");
        }

        if (sessionStorage.getItem("userId")) {
            const sessionUserId = JSON.parse(sessionStorage.getItem("userId"));
            setUserId(sessionUserId);
        }
    }, [userState[0]]);


    useEffect(() => {
        if (isHaveNewMessage) {
            const lastItem = messages[messages.length - 1];

            setIsHaveNewMessage(false);
            postMessage(lastItem);
        }
    }, [isHaveNewMessage]);



    const handleSendInput = (inputVal) => {
        if (inputVal) {
            setIsLoading(true);
            setUserInput(inputVal);

            const strList = inputVal.split(" ");
            const cmd = strList[0] + " ";
            const value = inputVal.replace(cmd, "");

            const userMessages = {
                title: "user",
                cmd: cmd,
                content: inputVal
            };
            const newContent = userMessages.content.replace(cmd, "");
            userMessages.content = newContent;

            setMessages(prevMess => [...prevMess, userMessages]);
            setIsHaveNewMessage(true);

            replyUser(cmd, value);
        }
    };


    const replyUser = (command, value) => {
        if (command === "/play ") {
            setItemId("");
            playSong(value);
            setUserCommand(command);
            return;

        } else if (command === "/hello ") {

            return;
        } else if (command === "/help ") {

            return;
        }


        // interactive commands
        if (itemId) {
            if (command === "/stop " || command === "/clear ") {
                setItemId("");
                setItemInfo({});
            }

            const rawCommand = command.replace("/", "").replace(" ", ""); // ex: "/pause " >>> "pause"
            const opts = {
                url: defaultUrl,
                id: itemId,
                title: itemInfo.title,
                userName: userName,
                icon: chooseIcon(command)
            }
            const replyFromBot = botMessagesPreset[rawCommand](opts);

            replyFormatForBot(replyFromBot);
        } else {
            const content = botMessagesPreset.recommendedWhenNothing(kannabored, defaultUrl);

            replyFormatForBot(content);
        }

        setUserCommand(command);
    };




    //////////// play video /////////////
    const playSong = (value) => {
        if (value) {
            const strList = value.split("?v=");
            const videoId = strList[1];


            if (!videoId) { // if inputVal is to search, videoId will be undefined
                getListVideosFromYoutubeApi(value);

            } else { // if inputVal is a URL, videoId after ?v= will be persent
                if (strList[0] !== defaultUrl) {
                    const content = botMessagesPreset.invalidUrl(kannaconfuse);
                    replyFormatForBot(content);

                    setIsHaveNewMessage(false);
                    setIsLoading(false);
                    return;
                }

                getVideoFromYoutubeApi(videoId);
            }

        }
    };

    // reply for /play command: when use /stop or /clear >> itemInfo will be {}
    useEffect(() => {
        if (itemId || Object.keys(itemInfo).length !== 0) {
            if (userCommand === "/play ") {
                const opts = {
                    url: defaultUrl,
                    id: itemId,
                    title: itemInfo.title,
                    userName: userName,
                    icon: chooseIcon(userCommand)
                }

                const content = botMessagesPreset.play(opts);
                replyFormatForBot(content);

                setIsLoading(false);
            }
        }
    }, [itemInfo]);


    // handle scroll when loading message
    useEffect(() => {
        // when first loading message
        const setSttTime1 = setTimeout(() => {
            setSttScroll(false);
        }, 0)

        // when get more message >>> see function handleScrollGetMoreMessage()
        const setSttTime2 = setTimeout(() => {
            setSttScroll(true);
        }, 1000)

        return () => {
            clearTimeout(setSttTime1)
            clearTimeout(setSttTime2)
        };
    }, []);



    //////////////////////////// apis //////////////////////////
    const getListVideosFromYoutubeApi = async (value) => {
        try {
            const data = {
                apiKey: apiKey,
                keyword: value
            };

            const response = await botMusicApi.getListVideosFromYoutubeApi(data, 1);

            if (response) {
                const items = response.items;

                const firstItemId = items[0].id.videoId;
                const firstItemSnippet = response.items[0].snippet;

                setItemId(firstItemId);
                setItemInfo(firstItemSnippet);
                return true;
            } else {
                const content = botMessagesPreset.requestYoutubeFailed(kannapalm);
                replyFormatForBot(content);

                setIsLoading(false);
                message_error("Having an error when play your song :(");
                setItemId("");
                setItemInfo({});
                return false;
            }

        } catch (e) {
            console.log(e);
        }
    };


    const getVideoFromYoutubeApi = async (videoId) => {
        try {
            const data = {
                apiKey: apiKey,
                videoId: videoId
            };

            const response = await botMusicApi.getVideoFromYoutubeApi(data);

            if (response) {
                const itemIdRes = response.items[0].id;
                const itemSnippet = response.items[0].snippet;

                setItemId(itemIdRes);
                setItemInfo(itemSnippet);
                return true;
            } else {
                const content = botMessagesPreset.requestYoutubeFailed(kannapalm);
                replyFormatForBot(content);

                setIsLoading(false);
                message_error("Having an error when play your song :(");
                setItemId("");
                setItemInfo({});
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    };


    const postMessage = async (lastMessage) => {
        const data = {
            userId: userId ? userId : "",
            message: lastMessage
        };

        try {
            const response = await botMusicApi.postMessage(data);
            if (response.content) {
                if (!userState[0] && !sessionStorage.getItem("userId")) {
                    sessionStorage.setItem("userId", JSON.stringify(response.content.user_id));
                }

                setUserId(response.content.user_id);
            }
        } catch (err) {
            console.log(err);
        }


    };


    const getApiKey = async () => {
        try {
            const response = await botMusicApi.getApikey();

            if (response.content) {
                setApiKey(response.content.api_key)
            }
        } catch (e) {
            console.log(e)
        }
    };

    const getHistoryMessages = async () => {
        if (!isEndConversation) {
            try {
                const data = {
                    userId: userId,
                    offset: offset,
                    limit: 10
                }

                const response = await botMusicApi.getHistoryMessages(data);
                if (response.content) {
                    if (response.content.countinue_at > 0) {
                        setOffset(response.content.countinue_at)
                    } else {
                        if (response.content.msg === "end of conversation") {
                            setIsEndConversation(true);
                        }
                    }

                    console.log(response)

                    const messages = response.content.messages;

                    setMessages(prevMess => [...messages, ...prevMess])
                } else {

                    // msg: "no messages found"
                    setIsEndConversation(true);
                }


            } catch (e) {
                console.log(e)
            }
        }
    };

    ///////////// stuffs ////////////
    const replyFormatForBot = (content) => {
        const botMessages = {
            title: "bot",
            content: content
        };

        setMessages(prevMess => [...prevMess, botMessages]);

        setIsLoading(false);
        setIsHaveNewMessage(true);
    };



    const chooseIcon = (cmd) => {
        switch (cmd) {
            case "/play ":
                return kannaaddok;

            case "/stop ":
                return kanndsleep;

            case "/pause ":
                return playIcon;

            case "/unpause ":
                return pauseIcon;

            case "/stop ":
                return kanndsleep;

            default:
                return "";
        }
    }




    return (
        <BotYoutubeMusic
            messages={messages}
            isLoading={isLoading}

            handleSendInput={(inputVal) => handleSendInput(inputVal)}

            itemId={itemId}

            userCommand={userCommand}

            getHistoryMessages={() => getHistoryMessages()}
            isEndConversation={isEndConversation}
            sttScroll={sttScroll}
        />
    );
}
