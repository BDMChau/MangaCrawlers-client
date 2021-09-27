const EVENTS_NAME = {
    UPDATE_SOCKETID: 'updateSocketId',

    // to server
    SPECIFIC_USERS: 'sendMessageToSpectificUsers_server',
    ALL_USERS: 'sendMessageToAllUsers_server',

    // from server
    FROM_SERVER_TO_SPECIFIC_USERS: 'fromServerToSpecificUsers_client',
    FROM_SERVER_TO_ALL_USERS: 'fromServerToAllUsers_client'
}


export default EVENTS_NAME;