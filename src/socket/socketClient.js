import io from 'socket.io-client';
import endPoint from '../config/endPoint';
import EVENTS_NAME from './features/eventsName';

const socket = io(endPoint.socket_local);

const socketActions = {
    updateSocketId: (userId) => {
        socket.emit(EVENTS_NAME.UPDATE_SOCKETID, { user_id: userId });
    },


    sendMessageToServer: (data) => {
        socket.emit(EVENTS_NAME.SPECIFIC_USERS, data);
    }
}


export {
    socket,
    socketActions
}