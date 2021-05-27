import React from 'react';

const routes = [
    {
        path: "/",
        component: React.lazy(() => import('../../pages/Home/HomeService')),
        exact: true
    },
    {
        path: "/search",
        component: React.lazy(() => import('../../pages/SearchingPage/SearchingPageService')),
        exact: true
    },
    // {
    //     path: "/signin",
    //     component: React.lazy(() => import('../../pages/SignIn/SignInService')),
    //     exact: false
    // },
    // {
    //     path: "/signup",
    //     component: React.lazy(() => import('../../pages/SignUp/SignUpService')),
    //     exact: false
    // },
    {
        path: "/manga/:id",
        component: React.lazy(() => import('../../pages/Manga/MangaService')),
        exact: true
    },
    {
        path: "/chapter/:mangaid/:chapterid",
        component: React.lazy(() => import('../../pages/Chapter/ChapterService')),
        exact: true
    },
    {
        path: "/manga/genres", // use qeury param
        component: React.lazy(() => import('../../pages/MangaGenres/MangaGenresService')),
        exact: false
    },
    {
        path: "/manga/genre", // use qeury param
        component: React.lazy(() => import('../../pages/MangaGenre/MangaGenreService')),
        exact: false
    },
    {
        path: "/user", 
        component: React.lazy(() => import('../../pages/User/UserPage/UserPageService')),
        exact: true
    },
    {
        path: "/auth/forgotpassword",
        component: React.lazy(() => import('../../pages/ForgotPassword/ForgotPassword')),
        exact: false
    },
    {
        path: "/auth/changepassword/:token",
        component: React.lazy(() => import('../../pages/ChangePassword/ChangePassword')),
        exact: false
    },
    {
        path: "/auth/verify/:token",
        component: React.lazy(() => import('../../pages/VerifyAccount/VerifyAccount')),
        exact: false
    },
    {
        path: "/admin",
        component: React.lazy(() => import('../../pages/Admin/AdminService')),
        exact: true
    },
    {
        path: "/user/projects",
        component: React.lazy(() => import('../../pages/TransGroup/TransGroupService')),
        exact: true
    },
    {
        path: "/user/projects/upload",
        component: React.lazy(() => import('../../pages/UploadManga/UploadMangaService')),
        exact: true
    },
    {
        path: "",
        component: React.lazy(() => import('../../pages/NotFound404/NotFound404')),
        exact: false
    },
];

export default routes;