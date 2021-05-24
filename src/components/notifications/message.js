import { message } from 'antd';

message.config({
    top: 30,
    maxCount: 3,
});

const message_success = (text, durationSEC) => {
    message.success({
        content: text,
        duration: durationSEC,
    });
};

const message_warning = (text, durationSEC) => {
    message.warning({
        content: text,
        duration: durationSEC,
    });
};

const message_error = (text, durationSEC) => {
    message.error({
        content: text,
        duration: durationSEC
    });
};

export {
    message_success,
    message_error,
    message_warning
}