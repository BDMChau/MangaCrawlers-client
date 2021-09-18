import React, { memo, useEffect, useState } from 'react'
import "./Dashboard.css"

import { Col, Row, Typography } from 'antd'
import teamIcon from "../../../../../assets/img/team.svg";
import userIcon from "../../../../../assets/img/users.svg";
import mangaIcon from "../../../../../assets/img/comic.svg";
import online from "../../../../../assets/img/online.svg";
import DashboardChart01 from '../Charts/components/DashboardChart01';
import DashboardChart02 from '../Charts/components/DashboardChart02';

function Dashboard({
    mangas,
    users,
    transGrs,

    allReports,

    isMobile
}) {
    const [items, setItems] = useState(["init"])


    useEffect(() => {
        const data = [
            {
                name: "Users",
                icon: userIcon,
                quantity: users.length
            },
            {
                name: "Manga Series",
                icon: mangaIcon,
                quantity: mangas.length
            },
            {
                name: "Translation Teams",
                icon: teamIcon,
                quantity: transGrs.length
            },
            {
                name: "Online Now", // realtime
                icon: online,
                quantity: transGrs.length
            },
        ]

        setItems(data);
    }, [])


    return (
        <Row className="dashboard">
            <div style={{ width: "100%" }}>
                <div className="dash-section01">
                    {items.length
                        ? items.map((item, i) => (
                            <Col key={i} span={6} className="dash-total-item" >
                                <img src={item.icon} alt="" />
                                <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                    {isMobile
                                        ? ""
                                        : <Typography.Text style={{ color: "#87898bb8", fontSize: "14px" }}>{item.name}</Typography.Text>
                                    }
                                    <Typography.Text style={{ display: "block" }}>{item.quantity}</Typography.Text>
                                </div>
                            </Col>
                        ))
                        : ""
                    }
                </div>

                <div className="dash-section02">
                    <DashboardChart01 allReports={allReports} />
                </div>

                <div className="dash-section03">
                    <DashboardChart02 allReports={allReports} />
                </div>
            </div>
        </Row>
    )
}


export default memo(Dashboard);