import React, { useEffect } from 'react'
import "./Footer.css"

import { Col, Row, Typography } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { NavLink } from 'react-router-dom'


export default function FooterContainer() {

    useEffect(() => {

    }, [])

    return (
        <Footer className="footer">
            <div span={24} className="footer-bg">
            </div>
            <Row justify={"center"} className="footer-row">
                <Col span={24} className="col01">
                    <div className="footer-logo"></div>
                    <div className="footer-text">
                        <div style={{ color: "#1890FF" }}>
                            <NavLink to="/contact_us">
                                Contact us
                            </NavLink>

                            &nbsp; | &nbsp;

                            <NavLink to="/legal/privacy_policy">
                                Privacy Policy
                            </NavLink>

                            &nbsp; | &nbsp;


                            <NavLink to="/legal/terms_of_policy">
                                Terms of Policy
                            </NavLink>
                        </div>

                        <Typography.Text style={{ display: "block" }}>
                            All rights reserved © 2021 MangaCrawlers
                        </Typography.Text>
                    </div>
                </Col>
            </Row>

        </Footer>
    )
}
