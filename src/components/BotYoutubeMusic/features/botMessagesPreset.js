const botMessagesPreset = {
    hello: ({ }) => (
        [
            'Hello'
        ]
    ),
    help: ({ }) => (
        [
            `Help`
        ]
    ),
    play: ({ url, id, title, userName, icon }) => (
        [
            `Queued <a href=${url}?v=${id} target="blank_" >${title}</a>  <img style="width: 40px; height: 40px; border-radius: 50px" src=${icon} alt="" />`,
            `<p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`
        ]
    ),
    stop: ({ url, id, title, userName, icon }) => (
        [
            `Stopped <a href=${url}?v=${id} target="blank_" >${title}</a>  <img style="width: 45px; height: 45px; border-radius: 50px" src=${icon} alt="" />`,
            `<p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`
        ]
    ),
    pause: ({ icon }) => (
        [
            `<img style="width: 28px; height: 28px;" src=${icon} alt="" /> Paused the player`,
        ]
    ),
    unpause: ({ icon }) => (
        [
            `<img style="width: 25px; height: 25px;" src=${icon} alt="" /> Unpaused the player`,
        ]
    ),
    queue: ({ items }) => (
        [
            "queue",
            items.length ? items : { empty: "The queue is empty :(" },
            items.length ? "This is the end of the queue!" : ""
        ]
    ),
    clear: () => (
        [
            `Cleared the queue`,
        ]
    ),
    jump: ({ url, id, title, userName }) => (
        [
            `Jumped to <a href=${url}?v=${id} target="blank_" >${title}</a>`,
            // `<b>Now playing</b> <a href=${url}?v=${id} target="blank_" >${title}</a> 
            `<p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`
        ]
    ),
    cannotJump: ({ value, userName }) => (
        [
            `A track could not be found for "${value}"!`,
            `<p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`
        ]
    ),
    ///////////////////
    invalidUrl: ({ icon }) => (
        [
            `Unknown URL <img style="width: 50px; height: 50px; border-radius: 3px" src=${icon} alt="" />`,
            `I just can play music from youtube`
        ]
    ),
    invalidId: ({ icon }) => (
        [
            `Unknown your video, I cannot play it <img style="width: 50px; height: 50px; border-radius: 3px" src=${icon} alt="" />`,
            `I just can play music from youtube`
        ]
    ),
    requestYoutubeFailed: (icon) => (
        [
            `<img style="width: 40px; height: 40px; border-radius: 50px" src=${icon} alt="" /> Sorry, there seems to be an error. Try another!`
        ]
    ),
    unavailableVideo: (icon) => (
        [
            `<img style="width: 40px; height: 40px; border-radius: 50px" src=${icon} alt="" /> This video is not available!`
        ]
    ),
    notFoundVideo: (icon) => (
        [
            `<img style="width: 40px; height: 40px; border-radius: 50px" src=${icon} alt="" /> Not found, maybe this video was removed!`
        ]
    ),
    recommendedWhenNothing: (icon, url) => (
        [
            `Nothing to do <img style="width: 35px; height: 35px; border-radius: 50px" src=${icon} alt="" />`,
            `Go <a href=${url} target="blank_">here</a> and give me what you want to listen`
        ]
    ),
};


export default botMessagesPreset;