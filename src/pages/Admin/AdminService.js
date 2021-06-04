import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import Cookies from 'universal-cookie';
import adminApi from '../../api/apis/adminApi';
import { message_error, message_success } from '../../components/notifications/message';
import arrayMethods from '../../helpers/arrayMethods';

export default function AdminService() {
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [mangas, setMangas] = useState([])
    const [transGrs, setTransGrs] = useState([])

    const [reportUsers, setReportUsers] = useState([])
    const [reportManga, setReportManga] = useState([])
    const [reportTransGr, setReportTransGr] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const cookies = new Cookies();
    const token = cookies.get("token")

    useEffect(() => {
        getAllUsers();
        getAllMangas();
        getAllTransGroups();

        getReportUser();
        getReportManga();
        getReportTransGr();
    }, [])


    const getAllUsers = async () => {
        try {
            const response = await adminApi.getAllUsers(token);
            if (response.content.err) {
                console.error("getAllUsers error!")
                return;
            }

            console.log(response.content.msg)

            const allUsers = response.content.users;
            const sortedUsers = allUsers.sort(arrayMethods.dynamicSort("user_id"))

            sortedUsers.forEach(user => {
                if (user.user_isAdmin === true) {
                    setAdmins(prevUser => [...prevUser, user]);
                } else {
                    setUsers(prevUser => [...prevUser, user]);
                }
            });

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

            console.log(response)
            console.log(response.content.msg)

            const allMangas = response.content.mangas;
            const sortedMangas = allMangas.sort(arrayMethods.dynamicSort("manga_id"))

            sortedMangas.forEach(manga => {
                setMangas(prev => [...prev, manga]);
            });

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

            console.log(response)
            console.log(response.content.msg)

            const allTransGroups = response.content.list_transgroup;
            const sortedTransGroups = allTransGroups.sort(arrayMethods.dynamicSort("transgroup_id"))

            sortedTransGroups.forEach(transGr => {
                setTransGrs(prev => [...prev, transGr]);
            });

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

            setUsers([]);
            allUsers.forEach(user => {
                if (user.user_isAdmin === false) {
                    setUsers(prevUser => [...prevUser, user]);
                }
            });

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

            const allUsers = response.content.users;

            setUsers([]);
            allUsers.forEach(user => {
                if (user.user_isAdmin === false) {
                    setUsers(prevUser => [...prevUser, user]);
                }
            });

            message_success("Removed this account!", 3);
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
                    delete report.values;
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })
            console.log(reports)
            setReportUsers(reports)

            console.log("Get report user OK!");
            console.log(response)
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
                    delete report.values;
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })
            console.log(reports)
            setReportManga(reports)

            console.log("Get report manga OK!");
            console.log(response)
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
                    delete report.values;
                }

                if (report.month <= 9) {
                    report.month = "0" + report.month.toString();
                } else {
                    report.month = report.month.toString();
                }
            })
            console.log(reports)
            setReportTransGr(reports)

            console.log("Get report trans group OK!");
            console.log(response)
            return;

        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div>
            <Admin
                users={users}
                admins={admins}
                mangas={mangas}
                transGrs={transGrs}

                reportUsers={reportUsers}
                reportManga={reportManga}
                reportTransGr={reportTransGr}

                handleDeprecateUser={(userId) => handleDeprecateUser(userId)}
                handleRemoveUser={(userId) => handleRemoveUser(userId)}
                isLoading={isLoading}
            />
        </div>
    )
}
