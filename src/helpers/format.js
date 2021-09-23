import dayjs from 'dayjs';

export const format = {
    formatDate01: (element) => {
        dayjs(element).format("MMM DD, YYYY");
    },
    formatDate02: (element) => {
        dayjs(element).format("DD-MM-YYYY HH:mm:ss")
    }
}