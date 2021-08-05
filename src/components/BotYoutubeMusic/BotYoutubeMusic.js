import React, { useEffect, useState } from "react";
import { AutoComplete, Input, Select, Typography } from "antd";
import YouTube from "react-youtube";
import Form from "antd/lib/form/Form";

export default function BotYoutubeMusic({ messages, handleSendInput, itemId }) {
    const [event, setEvent] = useState({});
    const [inputVal, setInputVal] = useState("");
    const [commands, setCommands] = useState([]);

    const cmdList = [
        <p>
            <b>/hello</b>
            <br /> Start command
        </p>,
        "/help ",
        "/play ",
        "/stop ",
        "/pause "
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

    const handleCommands = () => {
        if (inputVal.indexOf("/") !== -1) {
            setCommands(cmdList);
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
                        <p>{mess}</p>
                    ))
                    : ""

                }
            </div>


            <Form>
                <AutoComplete
                    onSearch={(value) => setInputVal(value)}
                    placeholder="Input hear..."
                    style={{
                        width: 200,
                    }}
                >
                    {commands.length
                        ? commands.map((cmd, i) => (
                            <AutoComplete.Option key={i} value={cmd}>
                                {cmd}
                            </AutoComplete.Option>
                        ))
                        : ""
                    }
                </AutoComplete>

                <button onClick={() => handleSendInput(inputVal)}>Send</button>
            </Form>


        </div>
    );
}
