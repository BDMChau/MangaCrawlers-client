import { Button, Col, Input, Row, Typography, Form, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { message_success } from '../../components/notifications/message';
import "./ChangePassword.css"
const { Title, Text } = Typography;

export default function ChangePassword() {
    const [state, setstate] = useState("")
    const { token } = useParams();

    useEffect(() => {
        console.log(token)
    }, [])

    const handleSendNewPass = () => {
        message_success("Password changed successfully!", 3)
    }

    return (
        <div className="change-pass-wrap">
            <Row justify={"center"}>
                <Col span={23} md={21} xl={17} xxl={21} className="change-pass">
                    <div className="text">
                        <Title level={5}>Your brain is too bad my friend ^_^</Title>
                        <Text>Your password must have at least 1 number and 8 characters long</Text>
                    </div>
                    <Form className="form">
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please fill in your new password!' }]}
                        >
                            <Input placeholder="Type your new password here!" />
                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                onClick={() => handleSendNewPass()}
                            >
                                Confirm your new password
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
