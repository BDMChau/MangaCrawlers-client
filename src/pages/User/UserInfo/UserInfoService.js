import React, {useEffect, useState} from 'react'
import "./UserInfo.css";

import { Col, Row } from 'antd';
import { useLocation } from 'react-router';

export default function UserInfoService() {
    const query = new URLSearchParams(useLocation().search);
    
    


    useEffect(() => {
        console.log(query.get("v"));
    }, [query.get("v")])

    return (
        <Row justify="center">
            <Col xs={23} sm={18} xl={18} xxl={16} >
            <h1>ascascasc</h1>
            <h1>ascascasc</h1>
            </Col>
        </Row>
    )
}
