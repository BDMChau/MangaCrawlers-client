import React, { useEffect, useState } from 'react'
import userApi from '../../../../api/apis/MainServer/userApi';
import TransGroup from './TransGroup'
import Cookies from 'universal-cookie';
import genreApi from '../../../../api/apis/MainServer/genreApi';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TRANSGROUP_ID } from "../../../../store/features/user/UserSlice"
import { useHistory } from 'react-router';
import { message_error, message_success, message_warning } from '../../../../components/toast/message';
import { format } from 'helpers/format';
import { notification_error, notification_success } from 'components/toast/notification';
import { socketActions } from 'socket/socketClient';
import { Upload } from 'antd';
import cloudinaryApi from 'api/apis/Cloudinary/cloudinaryApi';

export default function TransGroupService() {
    const userState = useSelector((state) => state.userState);
    const dispatch = useDispatch()

    const [transGrInfo, setTransGrInfo] = useState({})
    const [mangas, setMangas] = useState([])
    const [users, setUsers] = useState([])
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [IsLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [valToSearch, setValToSearch] = useState("");
    const [usersSearchResult, setUsersSearchResult] = useState([]);

    const history = useHistory();


    const cookies = new Cookies();
    const token = cookies.get("token");
    const [img, setImg] = useState('');

    // if (transGrInfo.transgroup_email === userState[0].user_email) {
    //     message_error("You cannot delete yourself ~.~");
    //     return;
    // }

    useEffect(() => {
        if (!userState[0] || !userState[0].user_transgroup_id) {
            history.push("/");
            message_warning("You haven't joined any team or signed in yet!")
            return;
        } else {
            getTransGroupInfo();
            getAllGenres();
        }
    }, [])


    const getTransGroupInfo = async () => {
        const data = {
            transgroup_id: userState[0].user_transgroup_id
        }

        try {
            const response = await userApi.getTransGroupInfo(token, data);
            if (response.content.err) {
                setIsLogin(true);
                return;
            }
            const transGroup = response.content.trans_group;

            const mangas = response.content.list_manga;
            mangas.forEach(manga => {
                manga.isProject = true;

                if (manga.createdAt === null) {
                    manga.createdAt = "";
                } else {
                    manga.createdAt = format.formatDate02(manga.createdAt); //createdAt is milisecond;
                }
            })

            const users = response.content.list_user;
            users.forEach(user => {
                if (user.user_email === transGroup.transgroup_email) {
                    user.role = "Admin"
                } else {
                    user.role = "Member";
                }
            })


            setTransGrInfo(transGroup)
            setMangas(response.content.list_manga)
            setUsers(users)
            setIsLogin(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const getAllGenres = async () => {
        try {
            const response = await genreApi.getAll();
            if (response.content.err) {
                return;
            }
            const genres = response.content.genres;

            setGenres(genres);
            return;
        } catch (error) {
            console.log(error);
        }

    }

    const deleteGroup = async (transgroupId) => {
        const data = {
            transgroup_id: transgroupId.toString()
        }

        try {
            const response = await userApi.deleteGroup(token, data);
            if (response.content.err) {
                notification_error("Something wrong, please try again!");
                return;
            }

            dispatch(SET_TRANSGROUP_ID(null));
            notification_success("Your organization has been deleted :(", 4);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateNewProject = async (fieldsData, img) => {
        setIsLoading(true);
        const data = {
            ...fieldsData
        }

        try {
            const response = await userApi.addNewProjectFields(token, data);

            if (response.content.msg) {
                let formData = new FormData();
                formData.append("file", img)
                formData.append("manga_id", response.content.manga_id);

                const response02 = await userApi.addNewProjectThumbnail(token, formData);

                if (response02.content.msg) {
                    const newManga = response02.content.manga;
                    newManga.createdAt = format.formatDate01(newManga.createdAt);
                    setMangas([...mangas, newManga]);

                    message_success("Upload new manga successfully!")
                }

            } else {
                message_error("Login again before visit this page, thank you ^^!");
            }

            setIsLoading(false);
            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const handleDeleteManga = async (mangaId) => {
        if (transGrInfo) {
            setIsLoadingDelete(true);
            const data = {
                manga_id: mangaId,
                transgroup_id: transGrInfo.transgroup_id
            }

            try {
                const response = await userApi.removeManga(token, data);

                if (response.content.msg) {
                    const mangaIdRemoved = response.content.manga_id

                    setMangas(mangas.filter(manga => manga.manga_id !== mangaIdRemoved));
                    message_success("Removed this manga!");
                }

                setIsLoadingDelete(false);
            } catch (ex) {
                console.log(ex)
            }

        }
    }


    useEffect(() => {
        if (valToSearch) searchUsers()
        else setUsersSearchResult([]);
    }, [valToSearch])


    const searchUsers = async () => {
        const data = {
            value: valToSearch,
            key: 1
        }

        try {
            const response = await userApi.searchUsers(token, data);
            if (response.content.err) {
                setUsersSearchResult([]);
                return;
            }

            setUsersSearchResult(response.content.data);
            return;
        } catch (error) {
            console.log(error);
        }
    }


    const inviteUser = (val, transGr) => {
        const user_email = val;

        const data = {
            type: 1,
            message: `Want to join our team <b>${transGrInfo.transgroup_name}</b>`,
            image_url: "",
            user_id: userState[0].user_id,
            list_to: user_email ? [user_email] : [],
            obj_data: {
                target_id: transGr.transgroup_id.toString(),
                target_title: "transgroup"
            }
        }

        socketActions.sendMessageToServer(data);
        notification_success("Sent your invitation!");

        setValToSearch("");
    }


    const handleRemoveUser = async (userId) => {
        const data = {
            member_id: userId
        }

        try {
            const response = await userApi.removeMember(token, data);
            if (response.content.err_code === 1) {
                notification_error("You are not allowed to do this action!");
                return;
            } else if(response.content.err_code === 2){
                notification_error("You cannot remove an admin team!");
                return;
            }
            const memberName = response.content.member_name;
            const memberId = response.content.member_id;

            const remainingUsers = users.filter(user => user.user_id !== memberId);
            console.log(remainingUsers)
            setUsers(remainingUsers);

            notification_success(`removed ${memberName} from your team!`)
            return;
        } catch (error) {
            console.log(error);
        }
    }


    const onChangeFile = (info) => {
        console.log("file to upload: ", info)
        setImg(info.file)


    }

    const propsUploadImg = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: file => false,
        onChange: (info) => onChangeFile(info)
    };


    return (
        <>
            <Upload
                showUploadList={false}
                {...propsUploadImg}
                style={{ display: "none" }}
            >

            </Upload>

            <TransGroup
                transGrInfo={transGrInfo}
                mangas={mangas}
                users={users}
                genres={genres}

                handleCreateNewProject={(fieldsData, img) => handleCreateNewProject(fieldsData, img)}
                isLoading={isLoading}
                isLogin={isLogin}

                deleteGroup={(transgroupId) => deleteGroup(transgroupId)}

                handleDeleteManga={(mangaId) => handleDeleteManga(mangaId)}
                IsLoadingDelete={IsLoadingDelete}

                setValToSearch={setValToSearch}
                valToSearch={valToSearch}
                setUsersSearchResult={setUsersSearchResult}
                usersSearchResult={usersSearchResult}
                handleRemoveUser={handleRemoveUser}

                inviteUser={(val, transGr) => inviteUser(val, transGr)}
            />
        </>
    )
}
