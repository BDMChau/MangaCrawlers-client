import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import botMusicApi from '../../api/apis/SecondServer/botMusicApi';

import BotYoutubeMusic from './BotYoutubeMusic';
import botMessagesPreset from './features/botMessagesPreset';

import playIcon from '../../assets/img/playicon.svg';
import pauseIcon from '../../assets/img/pause.svg';
import kannapalm from '../../assets/img/kannafacepalm.png';
import kannabored from '../../assets/img/kannabored.gif';
import kannawhat from '../../assets/img/kannawhat.png';
import kannaaddok from '../../assets/img/Kannaaddokgif.gif';
import kanndsleep from '../../assets/img/kannasleep.png';




function BotYoutubeMusicService() {
    const userState = useSelector((state) => state.userState);

    const [userName, setUserName] = useState("Anonymous");
    const [userId, setUserId] = useState("");

    const [messages, setMessages] = useState([]);
    const [isHaveNewMessage, setIsHaveNewMessage] = useState(false);

    const [userInput, setUserInput] = useState("");
    const [userCommand, setUserCommand] = useState("");

    const [isLoading, setIsLoading] = useState(Boolean);
    const [isEndConversation, setIsEndConversation] = useState(Boolean);
    const [allowGetHistoryMess, setAllowGetHistoryMess] = useState(Boolean);

    const [apiKey, setApiKey] = useState("");

    // **IMPORTANT: visible the <YouTube/>, have to reset when interact
    const [isVisible, setIsVisible] = useState(false); 

    const [itemId, setItemId] = useState("");
    const [itemInfo, setItemInfo] = useState({});

    const [itemsInQueue, setItemsInQueue] = useState([]);
    const [isEndVid, setIsEndVid] = useState(false);
    const [playingPosition, setPlayingPosition] = useState(null);
    const [isJumpTo, setIsJumpTo] = useState(false);
    const [allowToAddQueue, setAllowToAddQueue] = useState(false);

    const [offset, setOffset] = useState(0);
    const [sttScroll, setSttScroll] = useState(false);


    const defaultUrl = "https://www.youtube.com/watch";


    useEffect(() => {
        getApiKey();
    }, []);


    useEffect(() => {
        if (isEndVid === true && itemId && Object.keys(itemInfo).length !== 0) {
            const videoEndedPos = itemsInQueue.findIndex(item => item.video_id === itemInfo.video_id);

            if (videoEndedPos === itemsInQueue.length - 1) {
                // setItemId("")
                // setItemInfo({})
                setIsJumpTo(false);
                handleClearQueue();
                setIsVisible(false);
            } else {
                setItemId(itemsInQueue[videoEndedPos + 1].video_id);
                setItemInfo(itemsInQueue[videoEndedPos + 1]);
                setIsJumpTo(true);
            }


            setIsEndVid(false)
        }
    }, [isEndVid]);


    useEffect(() => {
        if (userId && allowGetHistoryMess) {
            getHistoryMessages();
        }
    }, [userId, allowGetHistoryMess]);


    useEffect(() => {
        if (userState[0]) {
            setUserId(userState[0].user_id);
            setUserName(userState[0].user_name);
            setAllowGetHistoryMess(true);

            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("queue");

            getQueue(userState[0].user_id);
        } else if (!userState[0] && sessionStorage.getItem("userId")) {
            // unregistered account
            const sessionUserId = JSON.parse(sessionStorage.getItem("userId"));

            if (sessionStorage.getItem("queue")) {
                setItemsInQueue(JSON.parse(sessionStorage.getItem("queue")))
            }

            setUserId(sessionUserId);
            setAllowGetHistoryMess(true);
            setUserName("");
        }


        // reset everything
        setMessages([])
        setItemId("")
        setItemInfo({})
        setIsEndConversation(false)
        setOffset(0)
    }, [userState]);


    // add to queue: allowToAddQueue is "true" when the first message has been saved in db
    useEffect(() => {
        if (Object.keys(itemInfo).length !== 0 && !isJumpTo) {
            handleAddQueue(itemId, itemInfo.video_title)
        }
    }, [itemInfo, userId])


    // have new message >> send to server
    useEffect(() => {
        if (isHaveNewMessage) {
            const lastItem = messages[messages.length - 1];

            setIsHaveNewMessage(false);
            postMessage(lastItem);
        }
    }, [isHaveNewMessage]);


    // set playing video
    useEffect(() => {
        if (itemsInQueue) {
            if (itemsInQueue.length === 1) {
                itemsInQueue[0].playing = true;

            } else if (playingPosition >= 0) {
                itemsInQueue.forEach((item, i) => {
                    if (i === playingPosition) {
                        item.playing = true;

                    } else {
                        item.playing = false;
                    }
                })
            }

        }
    }, [itemsInQueue, playingPosition]);



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
                content: inputVal,
                message_id: uuidv4()
            };
            const newContent = userMessages.content.replace(cmd, "");
            userMessages.content = newContent;

            setMessages(prevMess => [...prevMess, userMessages]);
            console.log("user true")

            setIsHaveNewMessage(true);

            replyUser(cmd, value);
        }
    };


    const replyUser = (command, value) => {
        setUserCommand(command);

        if (command === "/play ") {
            if (itemsInQueue?.length === 0) setPlayingPosition(0);
            playSong(value);
            return;
        }

        const rawCommand = command.replace("/", "").replace(" ", ""); // ex: "/pause " >>> "pause"
        const nonInteractiveCmds = ["help", "queue", "clear", "jump"];
        const opts = {
            value: value,
            url: defaultUrl,
            id: itemId,
            title: itemInfo.video_title,
            userName: userName,
            icon: chooseIcon(command),
        }

        setTimeout(() => {
            if (command === "/queue ") {
                opts.items = itemsInQueue;

            } else if (command === "/clear ") {
                setIsVisible(false);
                setItemId("");
                setItemInfo({});
                handleClearQueue();
            } else if (command === "/jump ") {
                setIsVisible(false);
                setItemId("");
                setIsJumpTo(true);

                const itemsToJump = itemsInQueue.filter(item => item.video_title.toLowerCase().includes(value.toLowerCase()));
                const itemToJump = itemsToJump.length ? itemsToJump[0] : null;
                if (!itemToJump) {
                    const content = botMessagesPreset.cannotJump(opts);
                    replyFormatForBot(content);
                    setIsJumpTo(false);
                    return;
                }

                const playingVideoPos = itemsInQueue.findIndex(item => item.video_id === itemToJump.video_id);
                setPlayingPosition(playingVideoPos)
                setItemId(itemToJump.video_id);
                setItemInfo(itemToJump);

                opts.id = itemToJump.video_id;
                opts.title = itemToJump.video_title;
                
                setTimeout(() => {
                    setIsJumpTo(false);
                    setIsVisible(true);
                }, 200);       
            }

            if (nonInteractiveCmds.includes(rawCommand)) {
                const replyFromBot = botMessagesPreset[rawCommand](opts);
                replyFormatForBot(replyFromBot);
                return;
            }


            // interactive commands
            if (itemId) {
                if (command === "/stop ") {
                    setIsVisible(false);
                    setTimeout(() => {
                        opts.id = itemId;
                        opts.title = itemInfo.video_title;

                        setItemId("");
                        setItemInfo({});

                        itemsInQueue.forEach(item => {
                            item.playing = false;
                        })
                    }, 100)
                }


                const replyFromBot = botMessagesPreset[rawCommand](opts);
                replyFormatForBot(replyFromBot);
            } else {
                const content = botMessagesPreset.recommendedWhenNothing(kannabored, defaultUrl);
                replyFormatForBot(content);
            }

        }, 300)
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
                    const content = botMessagesPreset.invalidUrl(kannawhat);
                    replyFormatForBot(content);

                    setIsHaveNewMessage(false);
                    setIsLoading(false);
                    return;
                }

                getVideoFromYoutubeApi(videoId);
            }

        }
    };


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

            if (response.items.length) {
                const firstItemId = response.items[0].id.videoId;
                const firstItemInfo = {
                    is_error: false,
                    video_id: response.items[0].id.videoId,
                    video_title: response.items[0].snippet.title,
                    playing: true
                };

                if (itemsInQueue.length === 0) {
                    setItemId(firstItemId);
                    setItemInfo(firstItemInfo);
                    setIsLoading(false);
                } else {
                    handleAddQueue(firstItemId, firstItemInfo.video_title);
                }

                setIsVisible(true);
                return;
            } else {
                const content = botMessagesPreset.requestYoutubeFailed(kannapalm);
                replyFormatForBot(content);

                setItemId("");
                setItemInfo({});
                return;
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

            if (response.items.length) {
                const itemIdRes = response.items[0].id;
                const itemInfo = {
                    is_error: false,
                    video_id: response.items[0].id,
                    video_title: response.items[0].snippet.title,
                    playing: true
                };

                if (itemsInQueue.length === 0) {
                    setItemId(itemIdRes);
                    setItemInfo(itemInfo);
                    setIsLoading(false);
                } else {
                    handleAddQueue(itemIdRes, itemInfo.title);
                }

                setIsVisible(true);
                return;
            } else {
                const content = botMessagesPreset.requestYoutubeFailed(kannapalm);
                replyFormatForBot(content);

                setItemId("");
                setItemInfo({});
                return;
            }
        } catch (e) {
            console.log(e);
        }
    };


    const postMessage = async (lastMessage) => {
        let newUserId;
        if (!userState[0] && !sessionStorage.getItem("userId")) {
            newUserId = uuidv4();
            sessionStorage.setItem("userId", JSON.stringify(newUserId));
            setUserId(newUserId);
        }

        const data = {
            userId: userId ? userId : newUserId,
            message: lastMessage
        };

        try {
            const response = await botMusicApi.postMessage(data);

            console.log(response.content.user_id)
            setAllowToAddQueue(true);
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


    const addToQueue = async (id, videoId, videoTitle) => {
        try {
            const data = {
                youtube_video_id: videoId,
                youtube_video_title: videoTitle,
                user_id: id
            };

            const response = await botMusicApi.addToQueue(data);
            if (response.content) {
                setItemsInQueue(prevIds => [...prevIds, response.content.new_item])
            }
            return;
        } catch (e) {
            console.log(e)
        }
    };


    const modifyVideoErrorAtServer = async (queueId) => {
        try {
            const data = {
                queue_id: queueId,
                user_id: userState[0] ? userState[0].user_id : ""
            };

            const response = await botMusicApi.modifyWhenVideoError(data);
            if (response.content) {
                setItemsInQueue(prevIds => [...prevIds, response.content.modified_item])
            }

        } catch (e) {
            console.log(e)
        }
    };


    const getQueue = async (id) => {
        try {
            const data = {
                user_id: id
            };

            const response = await botMusicApi.getQueue(data);
            if (response.content) {
                setItemsInQueue(response.content.videos_id_queue)
            }

        } catch (e) {
            console.log(e)
        }
    };


    const removeQueue = async (id) => {
        try {
            const data = {
                user_id: id
            };

            const response = await botMusicApi.removeQueue(data);
            if (response.content) {
                setItemsInQueue([]);
            };

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
                    const messagesRes = response.content.messages;

                    setMessages(prevMess => [...messagesRes, ...prevMess])
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
            content: content,
            message_id: uuidv4()
        };

        setMessages(prevMess => [...prevMess, botMessages]);
        console.log("bot true")
        setIsLoading(false);
        setIsHaveNewMessage(true);
    };


    const replyForPlayCmd = (id, title) => {
        const opts = {
            url: defaultUrl,
            id: id,
            title: title,
            userName: userName,
            icon: chooseIcon("/play ")
        }

        const content = botMessagesPreset.play(opts);
        replyFormatForBot(content);
    }


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


    const handleAddQueue = async (videoId, videoTitle) => {
        const videosExisted = itemsInQueue.filter(item => item.video_id.includes(videoId));
        if (videosExisted.length) {
            replyForPlayCmd(videoId, videoTitle);
            return;
        }

        if (userState[0]) { //registered account
            const id = userState[0].user_id;
            await addToQueue(id, videoId, videoTitle);

        } else if (!userState[0] && sessionStorage.getItem("userId")) { // unregistered account
            const queueItems = sessionStorage.getItem("queue") ? JSON.parse(sessionStorage.getItem("queue")) : [];
            const queueItem = {
                is_error: false,
                queue_id: uuidv4(),
                video_id: videoId,
                video_title: videoTitle
            }
            queueItems.push(queueItem);

            sessionStorage.setItem("queue", JSON.stringify(queueItems));
            setItemsInQueue(prevItem => [...prevItem, queueItem]);
        }

        replyForPlayCmd(videoId, videoTitle);
    }


    const handleClearQueue = () => {
        if (userState[0]) { //registered account
            const id = userState[0].user_id;
            removeQueue(id);

        } else if (!userState[0] && sessionStorage.getItem("userId")) { // unregistered account
            sessionStorage.removeItem("queue");
            setItemsInQueue([]);
        }
    }


    const modifyQueueWhenVideoError = (queueId) => {
        console.log(queueId)
        if (userState[0]) {
            modifyVideoErrorAtServer(queueId);

        } else if (!userState[0] && sessionStorage.getItem("userId")) {
            for (let i = 0; i < itemsInQueue.length; i++) {
                if (itemsInQueue[i].queue_id === queueId) {
                    itemsInQueue[i].is_error = true;
                    sessionStorage.setItem("queue", JSON.stringify(itemsInQueue));
                    break;
                }
            }

        }
    }



    return (
        <BotYoutubeMusic
            messages={messages}
            isLoading={isLoading}

            handleSendInput={(inputVal) => handleSendInput(inputVal)}

            itemInfo={itemInfo}
            isVisible={isVisible}

            userCommand={userCommand}

            getHistoryMessages={() => getHistoryMessages()}
            isEndConversation={isEndConversation}
            sttScroll={sttScroll}

            replyFormatForBot={replyFormatForBot}

            modifyQueueWhenVideoError={(queueId) => modifyQueueWhenVideoError(queueId)}
            itemsInQueue={itemsInQueue}

            setIsEndVid={setIsEndVid}
        />
    );
}

export default memo(BotYoutubeMusicService)