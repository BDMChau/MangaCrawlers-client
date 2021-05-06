import { message, Button, Space } from 'antd';

message.config({
    top: 30,
    maxCount: 3,
});

const message_success = (text, durationMSEC) => {
    message.success({
        content: text,
        duration: durationMSEC,
    });
};

const message_error = (text, durationMSEC) => {
    message.error({
        content: text,
        duration: durationMSEC
    });
};

export {
    message_success,
    message_error
}