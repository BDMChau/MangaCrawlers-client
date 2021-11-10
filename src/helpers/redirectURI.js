import { regex } from "helpers/regex";


const redirectURI = {
    chapterPage_uri: (mangaId, mangaName, chapterId, chapterName) => {
       if(mangaId && mangaName && chapterId && chapterName){
        const spittedStr = chapterName.split(":");
        const chapterNumber = spittedStr[0];

        return `/chapter/${mangaName.replaceAll(regex.special_char, "-")}-${mangaId}/${chapterNumber.trim().replaceAll(regex.special_char, "-")}_${chapterId}`;
       }
    },
    mangaPage_uri: (mangaId, mangaName) => {
        if(mangaId && mangaName)
            return `/manga/${mangaName.replaceAll(regex.special_char, "-")}-${mangaId}`;
    },
    projectMangaPage_uri: (mangaId) => {
        if(mangaId) return `/user/projects/upload?v=${mangaId}`;
    },
    userPage_uri: (userId) => {
        if(userId) return `/user/id?id=${userId}`;
    },
    friendPage_uri: (userId) => {
        if(userId) return `/user/friends/all_friends`;
    },
    postPage_uri: (postId) => {
        if(postId) return `/forum/post/${postId}`;
    },
}

export default redirectURI;



