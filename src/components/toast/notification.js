import { notification } from 'antd';

const notification_success = (value, time) => {
    notification['success']({
        message: value,
        duration: time ? time : 3
    });
}

const notification_error = (value, time) => {
    notification['error']({
        message: value,
        duration: time ? time : 3
    });
}

export {
    notification_success,
    notification_error
}