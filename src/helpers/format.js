import dayjs from 'dayjs';

export const format = {
    formatDate01: (value) => {
        dayjs(value).format("MMM DD, YYYY");
    },
    formatDate02: (value) => {
        dayjs(value).format("DD-MM-YYYY HH:mm:ss")
    }
}