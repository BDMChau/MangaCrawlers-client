import { toast_error } from "../notifications/toast";

export const errCodeResCheking = (errorResponse) => {
    switch (errorResponse.status) {
        case 400:
            console.log(errorResponse)
            switch (errorResponse.data.content.err) {
                case "Invalid email!":
                    toast_error(errorResponse.data.content.err)
                    break;

                default:
                    break;
            }

            break;

        case 401:
            console.log("Unauthorization!")
            break;

        case 404:
            console.log("Not found resource!")
            break;

        default:
            break;
    }
    return

}



export const errMsgResNotification = (errMsg) => {
    toast_error(errMsg);
}