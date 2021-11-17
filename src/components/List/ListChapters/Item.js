import React, { useState } from 'react'

import { Input, Typography, Dropdown, Menu, Popconfirm } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { format } from 'helpers/format';



export default function Item({
    chapter,

    setIsRemoving,
    removeChapter,

    setChapterId,
    chapterId,
    setChapterName,
    chapterName,

    allowToModify,
    setAllowToModify,
    editChapter
}) {
    const userState = useSelector((state) => state.userState);
    const [isModifyChapter, setIsModifyChapter] = useState(false)


    const handleEditChapter = () => {
        editChapter(chapterId, chapterName);
        setIsModifyChapter(false);
        setIsRemoving(false);
        setAllowToModify(true);
    }


    const menuDropDown = (
        <Menu>
            <Menu.Item style={{ color: "#1890FF" }} onMouseOver={() => setIsRemoving(true)} onClick={() => { setIsModifyChapter(true); setAllowToModify(false) }} >
                Modify
            </Menu.Item>

            <Menu.Item style={{ color: "#FF4D4F" }} onClick={() => setIsRemoving(true)} >
                <Popconfirm
                    title="Are you sure to delete this chapter?"
                    onConfirm={() => { removeChapter(chapterId); setIsRemoving(false); }}
                    okText="Confirm"
                    cancelText="Cancle"
                >
                    Delete
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );


    return (
        <>
            {isModifyChapter
                ? <>
                    <Input
                        className="input-modify"
                        defaultValue={chapter.chapter_name}
                        onClick={() => { setChapterId(chapter.chapter_id); setChapterName(chapter.chapter_name) }}
                        onChange={(e) => setChapterName(e.target.value)}
                        onKeyUp={(e) => { e.key === "Enter" ? handleEditChapter() : "" }}
                    />
                </>
                : <>
                    <Typography.Text style={{ width: "65%", overflow: "hidden", textOverflow: "ellipsis" }}>{chapter.chapter_name}</Typography.Text>

                    <div>
                        <Typography.Text title={format.formatDate02(chapter.created_at)} >
                            {format.relativeTime(chapter.created_at)}
                        </Typography.Text>

                        {userState[0]?.user_isAdmin
                            ? allowToModify
                                ? <Dropdown
                                    trigger={['click']}
                                    overlay={menuDropDown}
                                    onClick={() => setChapterId(chapter.chapter_id)}
                                >
                                    <DownOutlined
                                        style={{ fontSize: "15px", padding: "5px", color: "#1890FF" }}
                                    />
                                </Dropdown>
                                : <Dropdown trigger={['click']} disabled >
                                    <DownOutlined style={{ fontSize: "15px", padding: "5px", color: "#afafaf" }} />
                                </Dropdown>

                            : ""

                        }

                    </div>
                </>
            }
        </>
    )
}
