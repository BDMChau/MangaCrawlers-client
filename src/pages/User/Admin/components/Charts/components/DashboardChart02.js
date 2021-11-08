import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const DashbroadChart02 = ({ mangas, posts, users, transGrs }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const totalMangas = mangas.length;
        const totalUsers = users.length;
        const totalPosts = posts.length;
        const totalTransGrs = transGrs.length;

        const newArr = [
            {
                name: "Users",
                value: totalUsers
            },
            {
                name: "Manga Series",
                value: totalMangas
            },
            {
                name: "Translation Teams",
                value: totalTransGrs
            },
            {
                name: "Post on Forum",
                value: totalPosts
            },
        ]

        setData(newArr)
    }, []);


    const config = {
        appendPadding: 10,
        width: 450,
        autoFit:true,
        color: ['#72ad87', '#F797D6', '#698BBF', "#8BBDC2"],
        theme: {
            styleSheet: {
                backgroundColor: 'white',
            }
        },
        data: data,
        angleField: 'value',
        colorField: 'name',
        innerRadius: 0.5,
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
            content: (_ref) => {
                const percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(0), '%');
            }
        },
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: "#727272"
                },
                content: "2021",
            },
        },
    };
    return (
        <div className="dashbroadchart02">
            <Pie {...config} />
        </div>
    );
};

export default DashbroadChart02;