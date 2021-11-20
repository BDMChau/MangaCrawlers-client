const { socketActions } = require("./socketClient");



export const socketService = {
    notifyTaggedUsers: (userInfo, listToUserIds, targetTitle, cmtId) => {
        if(!userState[0] || !targetId || !targetTitle) return;
        
        let targetTitleToSend = "";
        if(targetTitle === "manga") targetTitleToSend = "comment_manga";
        else if (targetTitle === "post") targetTitleToSend = "comment_post";

        listToUserIds = listToUserIds.map(id => parseInt(id))

        const data = {
            type: 4,
            message: `${userInfo.user_name} mentioned you in a comment.`,
            image_url: userInfo.user_avatar,
            user_id: userInfo.user_id,
            list_to: listToUserIds.length ? listToUserIds : [],
            obj_data: {
                target_id: cmtId,
                target_title: targetTitleToSend
            }
        }

        socketActions.sendMessageToServer(data);
    }
}