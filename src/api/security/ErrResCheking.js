import { message_error } from "../../components/notifications/message";

export const errCodeResCheking = (errorResponse) => {
    switch (errorResponse.status) {
        case 400:
            switch (errorResponse.data.content.err) {
                case "Missing credentials!":
                    message_error("Missing credentials!")
                    break;
                case "Token verification is failed!":
                    message_error("Your request was wrong or expired, try another request!", 5)
                    break;
                case "Token has expired!":
                    message_error("Your request was wrong or expired, try another request!", 5)
                    break;
                case "Body request wrong! please try again!":
                    message_error("Having a problem with your credentials, password is missing or not strong enough!")
                    break;
                case "Body request wrong!":
                    message_error("Having a problem with your credentials, password is missing or not strong enough!")
                    break;
                case "Request to login with Google is failed!":
                    message_error("Having a problem, please try another method to login!");
                    break;
                case "Notthing from OAuth Google!":
                    break;

                default:
                    message_error("Having a problem, please try again or contact administrator!")
                    break;
            }
            localStorage.setItem("code_400", JSON.stringify("BadRequest 400"))
            console.error("BadRequest! 400")
            break;

        case 401:
            console.error("Unauthorized! 401")
            break;

        case 404:
            console.error("Not found resource! 404")
            break;

        case 403:
            message_error("You are not allowed to do this action!", 3)
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
            // if (url.indexOf("searchmangas") !== -1) {
            //     return;
            // } else {
            //     message_error("No Content!", 4);
            // }
            // console.log(msg)
            break;

        default:
            break;
    }
    return
}