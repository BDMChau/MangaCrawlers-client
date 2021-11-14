import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

export const format = {
    formatDate01: (value) => {
        return dayjs(value).format("MMM DD, YYYY");
    },
    formatDate02: (value) => {
        return dayjs(value).format("MMM DD, YYYY hh:mm A");
    },
    relativeTime: (value) => {
        return dayjs().to(value);
    }
}