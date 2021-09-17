import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

import { Col, Row, Tabs, Typography } from 'antd'


const { TabPane } = Tabs

export default function Contact() {
    let location = useLocation()
    let history = useHistory()
    const [tabSelected, setTabSelected] = useState("");

    useEffect(() => {
        const paths = location.pathname.split("/");
        const tabKey = paths[1] === "legal" ? paths[2] : paths[1]


        setTabSelected(tabKey);
    }, [location])

    const renderContact = () => (
        <div>
            <Typography.Title level={3}>Contact us</Typography.Title>

            <div>
                For advertising & cooperation, please send email to us:
                <a href="mailto:mangacrawlers123@gmail.com"> mangacrawlers123@gmail.com</a>
            </div>

            <div>
                For reporting or more infomation, you can send email or  <a href="#">contact an administrator</a> directly

            </div>
        </div>
    )

    const renderTerms = () => (
        <div>
            <Typography.Title level={3}>Terms of Service</Typography.Title>

            <div>
                Terms
            </div>
        </div>
    )

    const renderpolicy = () => (
        <div>
            <Typography.Title level={3}>Privacy Policy</Typography.Title>

            <div>
                Privacy Policy
            </div>
        </div>
    )


    return (
        <Row justify="center">
            <Col md={20} xxl={20} sm={24} xs={24}>
                <Tabs
                    style={{ marginTop: "70px" }}
                    activeKey={tabSelected}
                    tabPosition={"left"}
                    className="contact-tabs"
                    onChange={(val) => val === "contact_us" ? history.push(`/${val}`) : history.push(`/legal/${val}`)}
                >
                    <TabPane tab="Contact us" key="contact_us">
                        {renderContact()}
                    </TabPane>

                    <TabPane tab="Privacy Policy" key="privacy_policy">
                        {renderpolicy()}
                    </TabPane>

                    <TabPane tab="Terms of Service" key="terms_of_policy">
                        {renderTerms()}
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}
