import React from 'react';

const routes = [
    /////////// Auth
    {
        path: "/auth/forgotpassword",
        component: React.lazy(() => import('../../pages/Auth/ForgotPassword/ForgotPassword')),
        exact: false
    },
    {
        path: "/auth/changepassword/:token",
        component: React.lazy(() => import('../../pages/Auth/ChangePassword/ChangePassword')),
        exact: false
    },
    {
        path: "/auth/verification/:token",
        component: React.lazy(() => import('../../pages/VerifyAccount/VerifyAccount')),
        exact: false
    },

    /////////// Home
    {
        path: "/",
        component: React.lazy(() => import('../../pages/Home/HomeService')),
        exact: true
    },
    {
        path: "/contact_us",
        component: React.lazy(() => import('../../pages/Contact/Contact')),
        exact: true
    },
    {
        path: "/legal/privacy_policy",
        component: React.lazy(() => import('../../pages/Contact/Contact')),
        exact: true
    },
    {
        path: "/legal/terms_of_policy",
        component: React.lazy(() => import('../../pages/Contact/Contact')),
        exact: true
    },

    ////////////// Manga pages
    {
        path: "/search",
        component: React.lazy(() => import('../../pages/MangaPages/SearchingPage/SearchingPageService')),
        exact: true
    },
    {
        path: "/manga/:name_id",
        component: React.lazy(() => import('../../pages/MangaPages/Manga/MangaService')),
        exact: true
    },
    {
        path: "/chapter/:manga_name_id_param/:chapter_name_param",
        component: React.lazy(() => import('../../pages/MangaPages/Chapter/ChapterService')),
        exact: false
    },
    {
        path: "/manga/genres", // use query param
        component: React.lazy(() => import('../../pages/MangaPages/MangaGenres/MangaGenresService')),
        exact: false
    },
    {
        path: "/manga/genre", // use query param
        component: React.lazy(() => import('../../pages/MangaPages/MangaGenre/MangaGenreService')),
        exact: false
    },

    ////////// User
    {
        path: "/user",
        component: React.lazy(() => import('../../pages/User/UserPage/UserPageService')),
        exact: true
    },
    {
        path: "/admin",
        component: React.lazy(() => import('../../pages/User/Admin/AdminService')),
        exact: true
    },
    {
        path: "/user/id", // query param
        component: React.lazy(() => import('../../pages/User/UserInfo/UserInfoService')),
        exact: true
    },
    {
        path: "/user/:id/friends/:path",
        component: React.lazy(() => import('../../pages/User/Friends/FriendsService')),
        exact: true
    },

    ////// Translation team
    {
        path: "/user/projects",
        component: React.lazy(() => import('../../pages/User/Group/TransGroup/TransGroupService')),
        exact: true
    },
    {
        path: "/user/projects/upload",
        component: React.lazy(() => import('../../pages/User/Group/UploadManga/UploadMangaService')),
        exact: true
    },
    ////////////// Forum
    {
        path: "/forum",
        component: React.lazy(() => import('../../pages/Forum/ForumHome/ForumHomeService')),
        exact: true
    },
    {
        path: "/forum/newpost",
        component: React.lazy(() => import('../../pages/Forum/NewPost/NewPostService')),
        exact: true
    },
    /////////////// not found 404
    {
        path: "",
        component: React.lazy(() => import('../../pages/NotFound404/NotFound404')),
        exact: false
    },


];

export default routes;