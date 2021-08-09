const botMessagesPreset = {
    play: (url, id, title, userName) => (
        [
            `Queued <a href=${url}?v=${id} target="blank_" >${title}</a> <p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`,
        ]
    ),
    stop: (url, id, title, userName) => (
        [
            `Stopped <a href=${url}?v=${id} target="blank_" >${title}</a> <p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`,
        ]
    ),
    pause: (icon) => (
        [
            `<img style="width: 28px; height: 28px;" src=${icon} alt="" /> Paused the player`,
        ]
    ),
    unpause: (icon) => (
        [
            `<img style="width: 25px; height: 25px;" src=${icon} alt="" /> unpaused the player`,
        ]
    ),
    queue: () => (
        [
            `queue`,
        ]
    ),
    clear: () => (
        [
            `Cleared the queue`,
        ]
    ),
    jump: (url, id, title, userName) => (
        [
            `Jumped to <a href=${url}?v=${id} target="blank_" >${title}</a>`,
            `<b>Now playing</b> <a href=${url}?v=${id} target="blank_" >${title}</a> <p style="background: #d0ccccd1; width: fit-content; padding: 5px; border-radius: 3px;">[@${userName}]</p>`,
        ]
    ),
}

export default botMessagesPreset;