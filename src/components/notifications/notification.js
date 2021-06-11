import { notification } from 'antd';

const notification_success = (value) => {
    notification['success']({
        message: value,
        duration: 3
    });
}

const notification_error = (value) => {
    notification['error']({
        message: value,
        duration: 3
    });
}

export {
    notification_success,
    notification_error
}