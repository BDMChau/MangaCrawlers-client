import io from 'socket.io-client';
import endPoint from '../config/endPoint';

const socket = io(endPoint.socket_local);

const updateSocketId = (userId) => {
    socket.emit("updateSocketId", userId);
}


const sendMessageSocket = (message, userId) => {
    const data = {
        message: message,
        userId: 48
    }

    socket.emit('sendMessageFromClient', data);
}


export {
    socket,
    updateSocketId,
    sendMessageSocket,
}