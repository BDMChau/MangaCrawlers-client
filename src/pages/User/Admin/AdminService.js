import React, { memo, useEffect, useState } from 'react'
import Admin from './Admin'
import Cookies from 'universal-cookie';
import { message_success } from '../../../components/toast/message';
import arrayMethods from '../../../helpers/arrayMethods';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import adminApi from 'api/apis/MainServer/adminApi';

function AdminService() {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [mangas, setMangas] = useState([]);
    const [posts, setPosts] = useState([]);
    const [transGrs, setTransGrs] = useState([]);

    const [reportUsers, setReportUsers] = useState([]);
    const [reportManga, setReportManga] = useState([]);
    const [reportPosts, setReportPosts] = useState([]);
    const [reportTransGr, setReportTransGr] = useState([]);

    const [weatherStatus, setWeatherStatus] = useState({});

    const [allReports, setAllReports] = useState([]);


    const [isLoading, setIsLoading] = useState(false);
    const cookies = new Cookies();
    const token = cookies.get("token")

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (!query.get('v')) history.push(`/admin?v=dashboard`);
    }, [])


    useEffect(() => {
        getAllUsers();
        getAllMangas();
        getAllPosts();
        getAllTransGroups();

        getReportUser();
        getReportManga();
        getReportPosts();
        getReportTransGr();

        getPosition();
    }, []);


    const getPosition = async () => {
        try {
            const response = await axios.get(`https://geolocation-db.com/json/`)
            if (response.data) {
                console.log(response.data)
                const position = response.data.city ? response.data.city : response.data.country_name ? response.data.country_name : "Ho Chi Minh";
                getWeather(position);
            }
        } catch (err) {
            getWeather("Ho Chi Minh");
            console.log(err);
        }
    }

    const getWeather = async (city) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
            if (response.data) {
                setWeatherStatus(response.data)
            }
        } catch (err) {
            getWeather("Ho Chi Minh");
            console.log(err);
        }
    }


    const getAllUsers = async () => {
        try {
            const response = await adminApi.getAllUsers(token);
            if (response.content.err) {
                console.error("getAllUsers error!")
                return;
            }

            const allUsers = response.content.users;
            const sortedUsers = allUsers.sort(arrayMethods.dynamicSort("user_id"))

            const arrAdmins = [];
            const arrUsers = [];
            sortedUsers.forEach(user => {
                if (user.user_isAdmin === true) {
                    arrAdmins.push(user);
                } else {
                    arrUsers.push(user)
                }
            });

            setAdmins(arrAdmins);
            setUsers(arrUsers);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const getAllMangas = async () => {
        try {
            const response = await adminApi.getAllMangas(token);
            if (response.content.err) {
                console.error("getAllMangas error!")
                return;
            }

            const allMangas = response.content.mangas;
            const sortedMangas = allMangas.sort(arrayMethods.dynamicSort("manga_id"))

            setMangas(sortedMangas)
            // sortedMangas.forEach(manga => {
            //     setMangas(prev => [...prev, manga]);
            // });

            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const getAllPosts = async () => {
        try {
            const response = await adminApi.getAllPosts(token);
            if (response.content.err) {
                console.error("getAllPosts error!")
                return;
            }

            const allPosts = response.content.posts;
            const sortedPosts = allPosts.sort(arrayMethods.dynamicSort("post_id"))

            setPosts(sortedPosts)
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const getAllTransGroups = async () => {
        try {
            const response = await adminApi.getAllTransGroups(token);
            if (response.content.err) {
                console.error("getAllTransGroups error!")
                return;
            }

            const allTransGroups = response.content.list_transgroup;
            const sortedTransGroups = allTransGroups.sort(arrayMethods.dynamicSort("transgroup_id"))

            setTransGrs(sortedTransGroups)
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const handleDeprecateUser = async (userId) => {
        setIsLoading(true);
        const data = {
            user_id: userId
        }
        try {
            const response = await adminApi.deprecateUser(token, data);
            console.log(response.content.users)
            if (response.content.err) {
                console.error("DeprecateUser error!")
                setIsLoading(false);
                return;
            }

            const allUsers = response.content.users;

            const newArrUsers = [];
            allUsers.forEach(user => {
                if (user.user_isAdmin === false) {
                    newArrUsers.push(user);
                }
            });
            setUsers(newArrUsers);

            message_success("Deprecated this account!", 3);
            setIsLoading(false);
            return;

        } catch (ex) {
            console.log(ex)
        }
    }


    const handleRemoveUser = async (userId) => {
        setIsLoading(true);
        const data = {
            user_id: userId
        }
        try {
            const response = await adminApi.removeUser(token, data);
            console.log(response.content.users)
            if (response.content.err) {
                console.error("RemoveUser error!")
                setIsLoading(false);
                return;
            }

            const userIdRemoved = response.content.user_id;
            setUsers(users.filter(user => user.user_id !== userIdRemoved));


            message_success("Removed this account!", 3);
            setIsLoading(false);
            return;

        } catch (ex) {
            console.log(ex)
        }
    }


    const handleRemoveManga = async (mangaId) => {
        setIsLoading(true);
        const data = {
            manga_id: mangaId
        }

        try {
            const response = await adminApi.removeManga(token, data);
            console.log(response)
            if (response.content.err) {
                console.error("RemoveManga error!")
                setIsLoading(false);
                return;
            }

            const mangaIdRemoved = response.content.manga_id;
            setMangas(mangas.filter(manga => manga.manga_id !== mangaIdRemoved));

            message_success("Removed this manga!", 3);
            setIsLoading(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const handleDeprecatePost = async (postId) => {
        setIsLoading(true);
        const data = {
            post_id: postId
        }

        try {
            const response = await adminApi.deprecatePost(token, data);
            if (response.content.err) {
                console.error("handleDeprecatePost error!")
                setIsLoading(false);
                return;
            }

            const post = response.content.post;
            const copied = [...posts]
            for (let i = 0; i < posts.length; i++) {
                if(copied[i].post_id === post.post_id){
                    copied[i].is_deprecated = true;
                    break;
                }
            }

            setPosts(copied);
            message_success("Deprecated this post!", 3);
            setIsLoading(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const handleRemoveTransGroup = async (transGrId) => {
        setIsLoading(true);
        const data = {
            transgroup_id: transGrId
        }

        try {
            const response = await adminApi.removeTransGroup(token, data);
            console.log(response)
            if (response.content.err) {
                console.error("RemoveTransGroup error!")
                setIsLoading(false);
                return;
            }

            const transGrIdRemoved = response.content.transgroup_id;
            setTransGrs(transGrs.filter(transGr => transGr.transgroup_id !== transGrIdRemoved));

            message_success("Removed this translation Team!", 3);
            setIsLoading(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }


    const getReportUser = async () => {
        try {
            const response = await adminApi.getReportUser(token);
            if (response.content.err) {
                console.error("getReportUser error!")
                return;
            }

            const reports = response.content.users_report;
            reports.forEach(report => {
                if (report.hasOwnProperty("values")) {
                    report.Users = report.values;
                    report.name = "Users"
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })

            setReportUsers(reports);
            setAllReports(prev => [...prev, ...reports]);

            console.log("Get report user OK!");
            return;

        } catch (ex) {
            console.log(ex)
        }
    }

    const getReportManga = async () => {
        try {
            const response = await adminApi.getReportManga(token);
            if (response.content.err) {
                console.error("getReportmanga error!")
                return;
            }

            const reports = response.content.mangas_report;
            reports.forEach(report => {
                if (report.hasOwnProperty("values")) {
                    report.Quantity = report.values;
                    report.name = "Manga Series"
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })

            setReportManga(reports)
            setAllReports(prev => [...prev, ...reports]);

            console.log("Get report manga OK!");
            return;

        } catch (ex) {
            console.log(ex)
        }
    }

    const getReportPosts = async () => {
        try {
            const response = await adminApi.getReportPosts(token);
            if (response.content.err) {
                console.error("getReportPosts error!")
                return;
            }

            const reports = response.content.posts_report;
            reports.forEach(report => {
                if (report.hasOwnProperty("values")) {
                    report.Quantity = report.values;
                    report.name = "Posts"
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })

            setReportPosts(reports)
            setAllReports(prev => [...prev, ...reports]);

            console.log("Get report posts OK!");
            return;

        } catch (ex) {
            console.log(ex)
        }
    }

    const getReportTransGr = async () => {
        try {
            const response = await adminApi.getReportTransGr(token);
            if (response.content.err) {
                console.error("getReportTransGroup error!")
                return;
            }

            const reports = response.content.trans_group_report;
            reports.forEach(report => {
                if (report.hasOwnProperty("values")) {
                    report.Quantity = report.values;
                    report.name = "Translation Teams"
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })

            setReportTransGr(reports)
            setAllReports(prev => [...prev, ...reports]);

            console.log("Get report trans group OK!");
            return;

        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <Admin
            users={users}
            admins={admins}
            mangas={mangas}
            posts={posts}
            transGrs={transGrs}

            reportUsers={reportUsers}
            reportManga={reportManga}
            reportPosts={reportPosts}
            reportTransGr={reportTransGr}

            allReports={allReports}

            weatherStatus={weatherStatus}

            handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
            handleRemoveUser={(userId) => handleRemoveUser(userId)}
            handleRemoveManga={(mangaId) => handleRemoveManga(mangaId)}
            handleDeprecatePost={handleDeprecatePost}
            handleRemoveTransGroup={(transGrId) => handleRemoveTransGroup(transGrId)}
            isLoading={isLoading}

            tabSelected={query.get('v')}
        />
    )
}

export default AdminService;