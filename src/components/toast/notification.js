import { notification } from 'antd';

const notification_success = (value, time, placement) => {
    notification['success']({
        message: value,
        duration: time ? time : 3,
        placement: placement ? placement : "bottomLeft"
    });
}

const notification_error = (value, time, placement) => {
    notification['error']({
        message: value,
        duration: time ? time : 3,
        placement: placement ? placement : "bottomLeft"
    });
}

export {
    notification_success,
    notification_error
}