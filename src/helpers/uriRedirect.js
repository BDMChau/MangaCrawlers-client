import { regex } from "helpers/regex";


const uriRedirect = {
    uriChapterPage: (mangaId, mangaName, chapterId, chapterName) => {
        const spittedStr = chapterName.split(":");
        const chapterNumber = spittedStr[0];

        return `/chapter/${mangaName.replaceAll(regex.special_char, "-")}-${mangaId}/${chapterNumber.trim().replaceAll(regex.special_char, "-")}_${chapterId}`;
    },
    uriMangaPage: (mangaId, mangaName) => {
        return `/manga/${mangaName.replaceAll(regex.special_char, "-")}-${mangaId}`;
    },
    uriProjectMangaPage: (mangaId) => {
        return `/user/projects/upload?v=${mangaId}`;
    }
}

export default uriRedirect;