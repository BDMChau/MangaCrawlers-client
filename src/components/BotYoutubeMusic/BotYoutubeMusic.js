import React, { useEffect, useRef, useState } from "react";
import "./BotYoutubeMusic.css";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

import { SendOutlined } from "@ant-design/icons"
import stereo from "../../assets/img/stereo.svg";

import { AutoComplete, Button, Row, Typography, Form, Tag, Avatar } from "antd";

import { commandsList } from "./features/commandsList";
import { message_error } from "../alerts/message";
import TransitionAnimate from "../Animation/transition";

import botMessagesPreset from "./features/botMessagesPreset";

import kannapalm from '../../assets/img/kannafacepalm.png';
import kannaconfuse from '../../assets/img/kannawhat.png';


function BotYoutubeMusic({
    messages,
    isLoading,
    handleSendInput,

    itemInfo,
    isVisible,

    userCommand,

    getHistoryMessages,
    isEndConversation,
    sttScroll,

    replyFormatForBot,

    modifyQueueWhenVideoError,
    itemsInQueue,

    setIsEndVid
}) {
    const userState = useSelector((state) => state.userState);

    const [event, setEvent] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [inputWarning, setInputWarning] = useState("");

    const [commands, setCommands] = useState([]);

    const scrollRef = useRef(null);


    const interactions = {
        onPlay: () => {
            event.target.playVideo();
        },
        onStop: () => {
            setEvent(null);
            event.target.stopVideo();
        },
        onPause: () => {
            event.target.pauseVideo();
        },
        onUnpause: () => {
            event.target.playVideo();
        },
        onError: (e) => {
            setEvent(e);
        },
        onReady: (e) => {
            setEvent(e);
        },
    }


    // have to reset event when disable <Youtube ... /> component
    useEffect(() => {
        if (isVisible === false || Object.keys(itemInfo).length === 0) setEvent(null);
    }, [itemInfo, isVisible])


    ////// userCommand is prop from service (interaction commands), commands here are not all
    useEffect(() => {
        if (userCommand) {
            handleUserCmd(userCommand)
        }
    }, [userCommand])


    const handleUserCmd = (command) => {
        setTimeout(() => {
            switch (command) {
                case "/stop ":
                    if (event) interactions.onStop();
                    break;

                case "/pause ":
                    if (event) interactions.onPause();
                    break;

                case "/unpause ":
                    if (event) interactions.onUnpause();
                    break;

                case "/jump ":
                    if (event) {
                        // interactions.onStop();
                    }
                    break;

                default:
                    break;
            }

        }, 300)
    }



    ////// send input to service component
    const handleInput = () => {
        const strList = inputVal.split(" ");
        const cmd = strList[0] + " ";
        const value = strList[1];

        const isCmd = checkisCmd(inputVal);
        if (isCmd === false) {
            message_error("Wrong command!", 2)
            return;
        }

        const commandsRequireInput = [
            "/play ",
            "/jump "
        ]

        if (commandsRequireInput.includes(cmd) && !value) {
            setInputWarning("Input is required. Specify a value")
            return;
        }

        setInputVal("");
        setInputWarning("");

        handleSendInput(inputVal); // send to service
    }



    ////// render commands list recommended when user types /...
    useEffect(() => {
        handleRenderCommands()
    }, [inputVal])

    const handleRenderCommands = () => {
        if ((inputVal.startsWith("/")) && inputVal.length <= cmdLength()) {
            const filtedCmds = commandsList.filter(cmd => cmd.title.toLowerCase().includes(inputVal.toLowerCase()))
            setCommands(filtedCmds)

        } else {
            setCommands([]);
        }
    }


    //////// handle errors: Have new videoId >>> event change >>> No error ? case null : others
    useEffect(() => {
        if (event) {
            handleErrors()
        }
    }, [event, itemInfo]);

    const handleErrors = () => {
        let content;

        console.log("video_err_code: ", event.data);
        if (event.data !== null) {
            const lastItem = itemsInQueue[itemsInQueue.length - 1];
            modifyQueueWhenVideoError(lastItem.queue_id);
        }

        switch (event.data) {
            case null:
                event.target.stopVideo();
                event.target.playVideo();
                break;

            case 2: // invalid Id
                content = botMessagesPreset.invalidId(kannaconfuse);
                replyFormatForBot(content);
                break;

            case 5: // html5 error
                content = botMessagesPreset.requestYoutubeFailed(kannapalm);
                replyFormatForBot(content);
                break;

            case 100: // not found
                content = botMessagesPreset.notFoundVideo(kannaconfuse);
                replyFormatForBot(content);
                break;

            case 101, 150: // not allow
                content = botMessagesPreset.unavailableVideo(kannaconfuse);
                replyFormatForBot(content);
                break;

            default:
                break;
        }
    }


    ////////// scroll //////////
    useEffect(() => {
        let myRef = scrollRef.current;

        if (myRef) {
            const currentScroll = myRef.scrollTop + myRef.clientHeight;
            // auto scroll to bottom when have new message
            if (currentScroll + 500 >= myRef.scrollHeight && !inputVal) {
                myRef.scrollTop = myRef.scrollHeight;
            }

            // when first loading message
            if (myRef.scrollTop === 0) {
                myRef.scrollTop = myRef.scrollHeight;
            }
        }
    })

    const getMoreHistoryMessages = async (e) => {
        if (e.target.scrollTop === 0) {
            let myRef = scrollRef.current;

            await getHistoryMessages();

            if (!isEndConversation) {
                myRef.scrollTop = 820;
            }
        }
    }


    ///////////// stuffs /////////////
    const cmdLength = () => {
        let length = 0
        for (let i = 0; i < commandsList.length; i++) {
            if (commandsList[i].title.toLowerCase().includes(inputVal.toLowerCase())) {
                length = commandsList[i].title.length - 1;
                break;
            }
        }

        return length;
    }

    const checkisCmd = (input) => {
        const strList = input.split(" ");
        const cmd = strList[0] + " ";

        for (let i = 0; i < commandsList.length; i++) {
            if (commandsList[i].title === cmd) {
                return true;
            }
        }

        return false;
    }


    return (
        <Row style={{ margin: "5px 3px" }}>
            {isVisible
                ? <div style={{ display: "none" }}>
                    <YouTube
                        className="iframe-youtube"
                        videoId={itemInfo.video_id ? itemInfo.video_id : ""}
                        // opts={{
                        //     height: "200",
                        //     width: "200",
                        // }}
                        onReady={(e) => interactions.onReady(e)}
                        onError={(e) => interactions.onError(e)}
                        onEnd={() => setIsEndVid(true)}
                    />
                </div>
                : ""

            }



            <div className="messages-cont" onScroll={(e) => getMoreHistoryMessages(e)} ref={scrollRef}>
                <Typography.Text>Type <b>/help</b> to start ^^</Typography.Text>

                <div className="message-item">
                    {messages
                        ? messages.map((mess, i) => (
                            mess.title === "bot"

                                // bot's message
                                ? <div className="bot-message-cont">
                                    {mess.content.length
                                        ? <div className="message-bot">
                                            <Avatar size="large" className="bot-avatar" src={stereo} alt="" />

                                            <div className="bot-text">
                                                {mess.content[0] === "queue"
                                                    ? <TransitionAnimate renderPart={
                                                        <div>
                                                            {
                                                                mess.content[1].length
                                                                    ? mess.content[1].map((mess, i) => (
                                                                        mess.playing === true
                                                                            ? <Typography.Text
                                                                                style={{
                                                                                    display: "block",
                                                                                    background: "#9f9ed57d",
                                                                                    padding: "5px",
                                                                                    borderRadius: "5px"
                                                                                }}
                                                                            >
                                                                                <Typography.Text style={{ color: "#593bfffa", fontWeight: "600", fontSize: "15px" }} >{i + 1})</Typography.Text>&nbsp;
                                                                                <a
                                                                                    className="vid-title"
                                                                                    href={`https://www.youtube.com/watch?v=${mess.video_id}`}
                                                                                    title={mess.video_title}
                                                                                    target="_blank"
                                                                                    key={i}
                                                                                >
                                                                                    {mess.video_title}
                                                                                </a>
                                                                            </Typography.Text>
                                                                            : <Typography.Text
                                                                                style={{
                                                                                    display: "block",
                                                                                    background: "transparent",
                                                                                    padding: "5px",
                                                                                    borderRadius: "5px"
                                                                                }}
                                                                            >
                                                                                <Typography.Text style={{ color: "#593bfffa", fontWeight: "600", fontSize: "15px" }}>{i + 1})</Typography.Text>&nbsp;
                                                                                <a
                                                                                    className="vid-title"
                                                                                    href={`https://www.youtube.com/watch?v=${mess.video_id}`}
                                                                                    title={mess.video_title}
                                                                                    target="_blank"
                                                                                    key={i}
                                                                                >
                                                                                    {mess.video_title}
                                                                                </a>
                                                                            </Typography.Text>

                                                                    ))
                                                                    : mess.content[1].empty
                                                            }

                                                            <p style={{ marginTop: "15px", marginBottom: "0" }}>{mess.content[2] ? mess.content[2] : ""}</p>
                                                        </div>

                                                    }

                                                        transitionTime={0.3} />

                                                    : mess.content.map((botMess, i) => (
                                                        <TransitionAnimate
                                                            renderPart={<div dangerouslySetInnerHTML={{ __html: botMess }}></div>}
                                                            transitionTime={0.3}
                                                        />
                                                    ))}
                                            </div>
                                        </div>

                                        : ""
                                    }
                                </div>

                                // user's message 
                                : <div className="user-message-cont">
                                    <div className="message-user">
                                        <div className="user-text" >
                                            <TransitionAnimate renderPart={mess.cmd ? <Tag color="geekblue" className="user-cmd" >{mess.cmd}</Tag> : ""} />
                                            <TransitionAnimate renderPart={<div className="user-content" dangerouslySetInnerHTML={{ __html: mess.content }}></div>} />
                                        </div>

                                        <div>
                                            <Avatar size="large" className="user-avatar" src={userState[0] ? userState[0].user_avatar : "https://emoji.discord.st/emojis/bdc1faec-8960-474b-bb7b-900a01b52cdb.png"} alt="" />
                                        </div>
                                    </div>
                                </div>
                        ))
                        : ""
                    }
                </div>
            </div>


            {isLoading
                ? <p style={{ margin: "0" }}>Sending...</p>
                : ""
            }

            {inputWarning ? <p style={{ color: "red", margin: "0" }} >{inputWarning}</p> : ""}

            <Form className="form-input-bot" onKeyPress={(e) => e.key === "Enter" ? handleInput() : ""} >
                <AutoComplete
                    className="input-bot"
                    onSearch={(value) => setInputVal(value)}
                    onSelect={(value) => { setCommands([]); setInputVal(value) }}
                    value={inputVal}
                    type="tag"
                    defaultActiveFirstOption
                    placeholder="/ to see all available commands"
                >
                    {commands.length
                        ? commands.map((cmd, i) => (
                            <AutoComplete.Option key={i} value={cmd.title}>
                                <div>
                                    <Tag color="geekblue" style={{ padding: "5px 10px", fontSize: "14px" }}>
                                        <div style={{ fontWeight: 600, width: "fit-content" }} dangerouslySetInnerHTML={{ __html: cmd.title }}></div>
                                    </Tag>

                                    <div style={{ color: "#42414180" }} dangerouslySetInnerHTML={{ __html: cmd.subTitle }}></div>
                                </div>
                            </AutoComplete.Option>
                        ))
                        : ""
                    }
                </AutoComplete>

                <Button
                    className="btn-send"
                    onClick={() => handleInput()}
                >
                    <SendOutlined style={{ fontSize: "17px", marginTop: "3px" }
                    } />
                </Button>
            </Form>


        </Row>
    );
}


export default BotYoutubeMusic;
