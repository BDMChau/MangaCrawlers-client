import React, { memo, useEffect, useState } from 'react'
import "./Dashboard.css"

import { Col, Row, Spin, Typography } from 'antd'
import teamIcon from "../../../../../assets/img/team.svg";
import userIcon from "../../../../../assets/img/users.svg";
import mangaIcon from "../../../../../assets/img/comic.svg";
import postIcon from "../../../../../assets/img/post.svg";
import DashboardChart01 from '../Charts/components/DashboardChart01';
import DashboardChart02 from '../Charts/components/DashboardChart02';
import AdminTable from '../Tables/components/AdminTable';

function Dashboard({
    mangas,
    users,
    admins,
    transGrs,

    allReports,

    weatherStatus,

    isMobile
}) {
    const [items, setItems] = useState(["init"]);


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
                name: "Posts", // realtime
                icon: postIcon,
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
                            <Col key={i} span={6} title={item.name} className="dash-total-item" >
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
                    <DashboardChart02
                        mangas={mangas}
                        users={users}
                        transGrs={transGrs}
                    />

                    <AdminTable admins={admins} />

                    <div className="stuffs">
                        <div className="item" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "200px",
                            padding: "10px",
                            borderRadius: "3px",
                            width: "100%",
                            background: "#A5D4FC"
                        }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <Typography.Title level={4} style={{ color: "#ffffffb3" }}>{Object.keys(weatherStatus).length ? weatherStatus.name : ""}</Typography.Title>
                                <Typography.Text style={{ color: "#ffffffb3", textTransform: "capitalize" }}>{Object.keys(weatherStatus).length ? weatherStatus.weather[0].description : ""}</Typography.Text>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <Typography.Title level={4} style={{ color: "#ffffffb3" }}>{Object.keys(weatherStatus).length ? weatherStatus.main.temp : ""}°C</Typography.Title>
                                <Spin size="default" />
                            </div>
                        </div>

                        <div className="item" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "200px",
                            padding: "10px",
                            borderRadius: "3px",
                            width: "100%",
                            background: "#F797D6",
                            marginTop: "15px"
                        }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <Typography.Title level={5} style={{ color: "#ffffffb3" }}>
                                    I'm impatient, a little insecure, I always make mistakes, out of control at times. But if you can't handle, that's not your fault...
                                </Typography.Title>
                                <Typography.Title level={5} style={{ color: "#ffffffb3", float: "right", marginRight: "40px" }}>
                                    -???-
                                </Typography.Title>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Row>
    )
}


export default memo(Dashboard);