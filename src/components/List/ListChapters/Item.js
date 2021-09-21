import { Dropdown, Input, Typography } from 'antd'
import React from 'react'
import { DownOutlined } from '@ant-design/icons';

export default function Item({ chapter, setChapterId, chapterId, setChapterName, chapterName, menuDropDown, isModifyChapter, editChapter }) {


    return (
        <>
            {isModifyChapter
                ? <>
                    <Input
                        className="input-modify"
                        defaultValue={chapter.chapter_name}
                        onClick={() => { setChapterId(chapter.chapter_id); setChapterName(chapter.chapter_name) }}
                        onChange={(e) => setChapterName(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" ? editChapter(chapterId, chapterName) : ""}
                    />
                </>
                : <>
                    <Typography.Text style={{ width: "65%", overflow: "hidden", textOverflow: "ellipsis" }}>{chapter.chapter_name}</Typography.Text>

                    <div>
                        <Typography.Text>{chapter.createdAt}</Typography.Text>

                        <Dropdown trigger={['click']} overlay={menuDropDown}>
                            <DownOutlined style={{ fontSize: "15px", padding: "5px", color: "#1890FF" }} onClick={() => setChapterId(chapter.chapter_id)} />
                        </Dropdown>
                    </div>
                </>

            }
        </>
    )
}
