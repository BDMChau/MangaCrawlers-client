import { regex } from "helpers/regex";


const redirectURI = {
    chapterPage_uri: (mangaId, mangaName, chapterId, chapterName) => {
        const spittedStr = chapterName.split(":");
        const chapterNumber = spittedStr[0];

        return `/chapter/${mangaName?.replaceAll(regex.special_char, "-")}-${mangaId}/${chapterName.trim().replaceAll(regex.special_char, "-")}_${chapterId}`;

    },
    mangaPage_uri: (mangaId, mangaName) => {
        return `/manga/${mangaName?.replaceAll(regex.special_char, "-")}-${mangaId}`;
    },
    mangaWithGenre_uri: (genreId) => {
        return `/manga/genre/tag?v=${genreId}`;
    },
    projectMangaPage_uri: (mangaId) => {
        return `/user/projects/upload?v=${mangaId}`;
    },
    userPage_uri: (userId) => {
        return `/user/id?id=${userId}`;
    },
    userOwnPage_uri: (userId) => {
        return `/user/own/posts`;
    },
    postPage_uri: (postId) => {
        return `/forums/post/${postId}`;
    },
    postPageWithCate_uri: (cateId) => {
        return `/forums/posts/category?v=${cateId}`;
    },
}

export default redirectURI;



