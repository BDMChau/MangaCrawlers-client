import { message_error } from "../../components/notifications/message";

export const errCodeResCheking = (errorResponse) => {
    switch (errorResponse.status) {
        case 400:
            switch (errorResponse.data.content.err) {
                case "Missing credentials!":
                    message_error("Missing credentials!")
                    break;

                default:
                    break;
            }

            break;

        case 401:
            message_error("Unauthorization! 401")
            break;

        case 404:
            console.log("Not found resource! 404")
            break;

        case 403:
            message_error("Fobbiden! 403")
            break;

        default:
            break;
    }
    return

}



export const errMsgResNotification = (errMsg) => {
    message_error(errMsg,5);
}

export const code2xxCheking = (code, msg) => {
    switch (code) {
        case 200:
            // console.log("Success")
            // console.log(msg)
            break;
        case 202:
            // console.log("Accepted")
            // console.log(msg)
            break;
        case 204:
            // console.log("No Content")
            // console.log(msg)
            break;

        default:
            break;
    }
    return
}