import { regex } from "helpers/regex";


const redirectURI = {
    chapterPage_uri: (mangaId, mangaName, chapterId, chapterName) => {
        const spittedStr = chapterName.split(":");
        const chapterNumber = spittedStr[0];

        return `/chapter/${mangaName.replaceAll(regex.special_char, "-")}-${mangaId}/${chapterNumber.trim().replaceAll(regex.special_char, "-")}_${chapterId}`;
    },
    mangaPage_uri: (mangaId, mangaName) => {
        return `/manga/${mangaName.replaceAll(regex.special_char, "-")}-${mangaId}`;
    },
    projectMangaPage_uri: (mangaId) => {
        return `/user/projects/upload?v=${mangaId}`;
    }
}

export default redirectURI;