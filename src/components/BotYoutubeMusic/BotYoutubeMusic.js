import React, { useEffect, useState } from "react";
import "./BotYoutubeMusic.css";
import { AutoComplete, Input, Select, Tag, Typography } from "antd";
import YouTube from "react-youtube";
import Form from "antd/lib/form/Form";

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

    const options = {
        height: "390",
        width: "640"
    };


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



    const isCmdLength = () => {
        let length = 0
        for (let i = 0; i < cmdList.length; i++) {
            if (cmdList[i].title.includes(inputVal)) {
                length = cmdList[i].title.length - 1;
                break;
            }
        }

        return length;
    }

    const handleCommands = () => {
        if ((inputVal.startsWith("/")) && inputVal.length <= isCmdLength()) {
            const filtedCmds = cmdList.filter(cmd => cmd.title.includes(inputVal))
            setCommands(filtedCmds)

        } else {
            setCommands([]);
        }
    }

    useEffect(() => {
        handleCommands()
    }, [inputVal])


    // play when have new video id
    useEffect(() => {
        if (itemId) {
            interaction.onStop()
            interaction.onPlay();
        }
    }, [itemId]);


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
        <div>
            <YouTube
                videoId={itemId ? itemId : ""}
                opts={options}
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


            <Form>
                <AutoComplete
                    className={"input-bot"}
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

                <button onClick={() => handleSendInput(inputVal)} >Send</button>
            </Form>


        </div>
    );
}
