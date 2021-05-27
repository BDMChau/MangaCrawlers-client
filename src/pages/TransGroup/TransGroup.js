import React, { useState } from 'react'
import "./TransGroup.css"
import { Row, Typography, Tabs } from 'antd';
import FormCreateProject from '../../components/Form/FormCreateProject/FormCreateProject';
import ListVersion02 from '../../components/List/ListVersion02/ListVersion02';


const { TabPane } = Tabs;

export default function TransGroup() {
    const [state, setState] = useState([
        {
            chapter_id: 43,
            chapter_name: "Chapter 2",
            createdAt: "08-05-2021",
            date_publications: 2008,
            manga_id: 36,
            manga_name: "Tensei Shitara Slime Datta Ken",
            readingHistory_id: 32,
            reading_History_time: 1622025566195,
            stars: 4,
            status: "Ongoing",
            thumbnail: "https://res.cloudinary.com/mangacrawlers/image/upload/v1619097768/manga_thumbnails/Slime.jpg",
            user_id: 28,
            views: 1200,
            isProject: true
        },
        {
            chapter_id: 43,
            chapter_name: "Chapter 2",
            createdAt: "08-05-2021",
            date_publications: 2008,
            manga_id: 36,
            manga_name: "Tensei Shitara Slime Datta Ken",
            readingHistory_id: 32,
            reading_History_time: 1622025566195,
            stars: 4,
            status: "Ongoing",
            thumbnail: "https://res.cloudinary.com/mangacrawlers/image/upload/v1619097768/manga_thumbnails/Slime.jpg",
            user_id: 28,
            views: 1200,
            isProject: true
        },
        {
            chapter_id: 43,
            chapter_name: "Chapter 2",
            createdAt: "08-05-2021",
            date_publications: 2008,
            manga_id: 36,
            manga_name: "Tensei Shitara Slime Datta Ken",
            readingHistory_id: 32,
            reading_History_time: 1622025566195,
            stars: 4,
            status: "Ongoing",
            thumbnail: "https://res.cloudinary.com/mangacrawlers/image/upload/v1619097768/manga_thumbnails/Slime.jpg",
            user_id: 28,
            views: 1200,
            isProject: true
        },
        {
            chapter_id: 43,
            chapter_name: "Chapter 2",
            createdAt: "08-05-2021",
            date_publications: 2008,
            manga_id: 36,
            manga_name: "Tensei Shitara Slime Datta Ken",
            readingHistory_id: 32,
            reading_History_time: 1622025566195,
            stars: 4,
            status: "Ongoing",
            thumbnail: "https://res.cloudinary.com/mangacrawlers/image/upload/v1619097768/manga_thumbnails/Slime.jpg",
            user_id: 28,
            views: 1200,
            isProject: true
        },
        {
            chapter_id: 43,
            chapter_name: "Chapter 2",
            createdAt: "08-05-2021",
            date_publications: 2008,
            manga_id: 36,
            manga_name: "Tensei Shitara Slime Datta Ken",
            readingHistory_id: 32,
            reading_History_time: 1622025566195,
            stars: 4,
            status: "Ongoing",
            thumbnail: "https://res.cloudinary.com/mangacrawlers/image/upload/v1619097768/manga_thumbnails/Slime.jpg",
            user_id: 28,
            views: 1200,
            isProject: true
        },
        {
            chapter_id: 43,
            chapter_name: "Chapter 2",
            createdAt: "08-05-2021",
            date_publications: 2008,
            manga_id: 36,
            manga_name: "Tensei Shitara Slime Datta Ken",
            readingHistory_id: 32,
            reading_History_time: 1622025566195,
            stars: 4,
            status: "Ongoing",
            thumbnail: "https://res.cloudinary.com/mangacrawlers/image/upload/v1619097768/manga_thumbnails/Slime.jpg",
            user_id: 28,
            views: 1200,
            isProject: true
        },
       
    ])


    const renderProjects = () => (
        <Row justify={"center"} className="projects">
            <ListVersion02 mangas={state} />
        </Row>
    )

    return (
        <Row justify={"center"} className="transgrouppage-row1">
            <Tabs defaultActiveKey="projects" className="transgrouppage-tabs">
                <TabPane tab="Your Projects" key="projects">
                    {renderProjects()}
                </TabPane>

                <TabPane tab="New Project" key="newproject">
                    <Row justify={"center"}>
                        <FormCreateProject />
                    </Row>
                </TabPane>
            </Tabs>

        </Row>
    )
}
