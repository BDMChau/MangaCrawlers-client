const EVENTS_NAME = {
    UPDATE_SOCKETID: 'updateSocketId',
    NOTIFY_ONLINE: 'notifyonline',


    SEND_OK: "sendmessage_ok",
    SEND_FAILED: "sendmessage_failed",

    // to server
    SPECIFIC_USERS: 'sendMessageToSpecificUsers_server',
    ALL_USERS: 'sendMessageToAllUsers_server',

    // from server
    FROM_SERVER_TO_SPECIFIC_USERS: 'fromServerToSpecificUsers_client',
    FROM_SERVER_TO_ALL_USERS: 'fromServerToAllUsers_client'
}


export default EVENTS_NAME;