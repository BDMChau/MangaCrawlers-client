import React, { useEffect, useState } from "react";
import { Input } from "antd";
import YouTube from "react-youtube";
import Form from "antd/lib/form/Form";

export default function BotYoutubeMusic({ messages, handleSendInput, itemId }) {
    const [event, setEvent] = useState({});
    const [inputVal, setInputVal] = useState("");

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
                {messages.length
                    ? messages.map((message, i) => (
                        <p>message</p>
                    ))
                    : ""

                }
            </div>

            <Form>
                <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />

                <button onClick={() => handleSendInput(inputVal)}>Send</button>
            </Form>


        </div>
    );
}
