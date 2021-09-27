import io from 'socket.io-client';
import endPoint from '../config/endPoint';
import EVENTS_NAME from './features/eventsName';

const socket = io(endPoint.socket_local);

const socketActions = {
    updateSocketId: (userId) => {
        socket.emit(EVENTS_NAME.UPDATE_SOCKETID, { user_id: userId });
    },

    /** 
     * @param message: message: string
     * @param users_identification: Can be user_email: string or user_id: number
    */
    sendMessageToServer: (message, users_identification) => {
        const data = {
            message: message,
            users_identification: users_identification ? users_identification : []
        }

        socket.emit(EVENTS_NAME.SPECIFIC_USERS, data);
    }
}


export {
    socket,
    socketActions
}