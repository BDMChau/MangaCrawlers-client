import React from 'react';

const routes = [
    {
        path: "/",
        component: React.lazy(() => import('../../pages/Home/HomeService')),
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
        exact: false
    },
    {
        path: "/chapter/:id",
        component: React.lazy(() => import('../../pages/Chapter/ChapterService')),
        exact: false
    },
    {
        path: "/auth/forgotpassword",
        component: React.lazy(() => import('../../pages/ForgotPassword/ForgotPassword')),
        exact: false
    },
    {
        path: "/auth/changepassword",
        component: React.lazy(() => import('../../pages/ChangePassword/ChangePassword')),
        exact: false
    },
    {
        path: "",
        component: React.lazy(() => import('../../pages/NotFound404/NotFound404')),
        exact: false
    },
];

export default routes;