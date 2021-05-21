import { message_error } from "../../components/notifications/message";

export const errCodeResCheking = (errorResponse) => {
    switch (errorResponse.status) {
        case 400:
            switch (errorResponse.data.content.err) {
                case "Missing credentials!":
                    message_error("Missing credentials!")
                    break;
                case "Token verification is failed!":
                    message_error("Verification is failed!")
                    break;
                case "Token has expired!":
                    message_error("Your request has expired, try another request!")
                    break;
                case "Body request wrong! please try again!":
                    message_error("Having a problem with your credentials, password is missing or not strong enough!")
                    break;
                case "Body request wrong!":
                    message_error("Having a problem with your credentials, password is missing or not strong enough!")
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
            message_error("Don't have permission! 403")
            break;

        default:
            break;
    }
    return

}



export const errMsgResNotification = (errMsg) => {
    message_error(errMsg, 5);
}

export const code2xxCheking = (code, url) => {
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
            if(url.indexOf("searchmangas") !== -1){
                return;
            } else{
                message_error("No Content!", 4);
            }
            // console.log(msg)
            break;

        default:
            break;
    }
    return
}