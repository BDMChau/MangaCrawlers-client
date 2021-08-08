import React, { useEffect, useState } from "react";
import "./BotYoutubeMusic.css";
import { AutoComplete, Button, Row, Typography } from "antd";
import YouTube from "react-youtube";
import Form from "antd/lib/form/Form";
import { SendOutlined } from "@ant-design/icons"
import { commandsList } from "./features/commandsList";
import { useSelector } from "react-redux";

import stereo from "../../assets/img/stereo.svg";
import { message_error, message_warning } from "../notifications/message";

export default function BotYoutubeMusic({ messages, isLoading, handleSendInput, itemId }) {
    const userState = useSelector((state) => state.userState);

    const [event, setEvent] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [commands, setCommands] = useState([]);




    const interactions = {
        onPlay: () => {
            console.log("play");
            event.target.playVideo();
        },
        onStop: () => {
            console.log("stop");
            event.target.stopVideo();
        },
        onError: (e) => {
            console.log("err", e);
            setEvent(e);
        },
        onReady: (e) => {
            setEvent(e);
        },
    }


    //////// play video when have new videoId
    useEffect(() => {
        if (itemId) {
            interactions.onReady();
        }
    }, [itemId]);


    //////// handle command of user's input
    useEffect(() => {
        handleCommands()
    }, [inputVal])

    const handleCommands = () => {
        if ((inputVal.startsWith("/")) && inputVal.length <= cmdLength()) {
            console.log("??????")
            const filtedCmds = commandsList.filter(cmd => cmd.title.includes(inputVal))
            setCommands(filtedCmds)

        } else {
            setCommands([]);
        }
    }

    const cmdLength = () => {
        let length = 0
        for (let i = 0; i < commandsList.length; i++) {
            if (commandsList[i].title.includes(inputVal)) {
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


    const handleInput = () => {
        const strList = inputVal.split(" ");
        const value = strList[1];

        const isCmd = checkisCmd(inputVal);
        if (isCmd === false) {
            message_error("Wrong command!", 2)
            return;
        }

        if (!value) {
            message_warning("Input your URL or some keywords!", 3)
            return;
        }

        handleSendInput(inputVal);
        setInputVal("");
    }


    //////// handle errors
    useEffect(() => {
        if (event) {
            handleErrors()
        }
    }, [event]);

    const handleErrors = () => {
        if (event.data === null) {
            event.target.stopVideo();
            event.target.playVideo();
        }

        switch (event.data) {
            case null:
                event.target.stopVideo();
                event.target.playVideo();
                break;

            case 2: // invalid Id
                break;

            case 5: // html5 error
                break;

            case 100: // not found

                break;

            case 101 || 150: // not allow

                break;

            default:
                break;
        }
    }



    return (
        <Row style={{ margin: "15px 3px" }}>
            {itemId
                ? <YouTube
                    className="iframe-youtube"
                    videoId={itemId ? itemId : ""}
                    opts={{
                        height: "200",
                        width: "200",
                    }}
                    onReady={(e) => interactions.onReady(e)}
                    onError={(e) => interactions.onError(e)}
                />
                : ""

            }


            <div className="messages-cont">
                <Typography.Text>Type <b>/hello</b> to start ^^</Typography.Text>

                <div className="message-item">
                    {messages
                        ? messages.map((mess, i) => (
                            mess.title === "bot"

                                // bot's message
                                ? <div className="bot-message-cont">
                                    {mess.content.length
                                        ? <div className="message-bot">
                                            <img className="bot-avatar" src={stereo} alt="" />

                                            <div>
                                                <Typography.Text style={{ fontWeight: "500" }}>Bot</Typography.Text>
                                                {mess.content.map((botMess, i) => (
                                                    <div key={i} dangerouslySetInnerHTML={{ __html: botMess }}></div>
                                                ))}
                                            </div>
                                        </div>

                                        : ""
                                    }
                                </div>

                                // user's message 
                                : <div className="user-message-cont">
                                    <div className="message-user">
                                        <div style={{ marginTop: "15px", display: "flex" }} >
                                            {mess.cmd ? <div className="user-cmd" key={i} dangerouslySetInnerHTML={{ __html: mess.cmd }}></div> : ""}
                                            &nbsp; <div className="user-content" key={i} dangerouslySetInnerHTML={{ __html: mess.content }}></div>
                                        </div>

                                        <div>
                                            <img className="user-avatar" src={userState[0] ? userState[0].user_avatar : "https://i.pinimg.com/originals/6b/a5/b9/6ba5b90780203734faa5ef940b983029.jpg"} alt="" />
                                        </div>
                                    </div>
                                </div>
                        ))
                        : ""
                    }
                </div>
            </div>


            {isLoading
                ? <p>Sending...</p>
                : ""
            }
            <Form className="form-input-bot" onKeyPress={(e) => e.key === "Enter" ? handleInput() : ""} >
                <AutoComplete
                    className="input-bot"
                    onSearch={(value) => setInputVal(value)}
                    onSelect={(value) => { setCommands([]); setInputVal(value) }}
                    value={inputVal}
                    defaultActiveFirstOption
                    placeholder="Input hear..."
                >
                    {commands.length
                        ? commands.map((cmd, i) => (
                            <AutoComplete.Option key={i} value={cmd.title}>
                                <div>
                                    <div style={{ fontWeight: 600, width: "fit-content" }} dangerouslySetInnerHTML={{ __html: cmd.title }}></div>
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
