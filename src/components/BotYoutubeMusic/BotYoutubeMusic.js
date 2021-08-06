import React, { useEffect, useState } from "react";
import "./BotYoutubeMusic.css";
import { AutoComplete, Button, Input, Row, Select, Tag, Typography } from "antd";
import YouTube from "react-youtube";
import Form from "antd/lib/form/Form";
import { SendOutlined } from "@ant-design/icons"

export default function BotYoutubeMusic({ messages, handleSendInput, itemId }) {
    const [event, setEvent] = useState({});
    const [inputVal, setInputVal] = useState("");
    const [commands, setCommands] = useState([]);

    const cmdList = [
        {
            title: "/hello ",
            subTitle: "Start command"
        },
        {
            title: "/help ",
            subTitle: "Start command"
        },
        {
            title: "/pause ",
            subTitle: "Start command"
        },

    ]


    const interaction = {
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
            interaction.onStop()
            interaction.onPlay();
        }
    }, [itemId]);



    //////// handle command of user's input
    useEffect(() => {
        handleCommands()
    }, [inputVal])

    const handleCommands = () => {
        if ((inputVal.startsWith("/")) && inputVal.length <= checkCmdLength()) {
            const filtedCmds = cmdList.filter(cmd => cmd.title.includes(inputVal))
            setCommands(filtedCmds)

        } else {
            setCommands([]);
        }
    }

    const checkCmdLength = () => {
        let length = 0
        for (let i = 0; i < cmdList.length; i++) {
            if (cmdList[i].title.includes(inputVal)) {
                length = cmdList[i].title.length - 1;
                break;
            }
        }

        return length;
    }


    //////// handle errors
    useEffect(() => {
        handleErrors()
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
            <YouTube
                className="iframe-youtube"
                videoId={itemId ? itemId : ""}
                opts={{
                    height: "0",
                    width: "0",
                }}
                onReady={(e) => interaction.onReady(e)}
                onError={(e) => interaction.onError(e)}
            />

            <div className="messages-cont">
                <Typography.Text>Type <b>/hello</b> to start ^^</Typography.Text>
                {messages.length
                    ? messages.map((mess, i) => (
                        <div dangerouslySetInnerHTML={{ __html: mess }}></div>
                    ))
                    : ""

                }
            </div>


            <Form className="form-input-bot" onKeyPress={(e) => e.key === "Enter" ? handleSendInput(inputVal) : ""} >
                <AutoComplete
                    className="input-bot"
                    onSearch={(value) => setInputVal(value)}
                    onSelect={() => setCommands([])}
                    placeholder="Input hear..."

                >
                    {commands.length
                        ? commands.map((cmd, i) => (
                            <AutoComplete.Option key={i} value={cmd.title}>
                                <div>
                                    <div style={{ background: "red", width: "fit-content" }} dangerouslySetInnerHTML={{ __html: cmd.title }}></div>
                                    <div dangerouslySetInnerHTML={{ __html: cmd.subTitle }}></div>
                                </div>
                            </AutoComplete.Option>
                        ))
                        : ""
                    }
                </AutoComplete>

                <Button
                    className="btn-send"
                    onClick={() => handleSendInput(inputVal)}
                >
                    <SendOutlined style={{ fontSize: "17px", marginTop:"3px" }
                    } />
                </Button>
            </Form>


        </Row>
    );
}
