import dayjs from 'dayjs';

export const format = {
    formatDate01: (value) => {
        return dayjs(value).format("MMM DD, YYYY");
    },
    formatDate02: (value) => {
        return dayjs(value).format("MMM DD, YYYY h:mm A");
    }
}