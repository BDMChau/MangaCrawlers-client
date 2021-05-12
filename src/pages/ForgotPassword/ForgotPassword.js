import { Button, Col, Input, Row, Typography, Form, message } from 'antd'
import React, { useState } from 'react'
import { message_success } from '../../notifications/message';
import "./ForgotPassword.css"
const { Title, Text } = Typography;

export default function ForgotPassword() {
    const [state, setstate] = useState("")


    const handleSendEmail = () => {
        message_success("We just sent you a mail, please check it!", 900)
    }

    return (
        <div className="forgot-pass-wrap">
            <Row justify={"center"}>
                <Col span={23} md={21} xl={17} xxl={21} className="forgot-pass">
                    <div className="text">
                        <Title level={5}>Were you forgotting your password?</Title>
                        <Text>Provied us your email, we'll help you change the password!</Text>
                    </div>
                    <Form className="form">
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please fill in your email!' }]}
                        >
                            <Input placeholder="Type your email here!" />
                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                onClick={() => handleSendEmail()}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
