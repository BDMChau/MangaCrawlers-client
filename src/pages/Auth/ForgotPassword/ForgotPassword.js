import { Button, Col, Input, Row, Typography, Form } from 'antd'
import React, { useState } from 'react'
import authApi from '../../../api/apis/authApi';
import { message_error, message_success } from '../../../components/notifications/message';
import "./ForgotPassword.css"
const { Title, Text } = Typography;

export default function ForgotPassword() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("")


    const handleSendEmail = async (e) => {
        e.preventDefault();
        
        try {
            if (email) {
                setIsLoading(true);
                setIsDisabled(true);

                const data = {
                    user_email: email
                }

                const response = await authApi.requestchangepassword(data);

                if (response.content.err) {
                    message_error("Missing or your email is not exist!")

                    setIsDisabled(false);
                    setIsLoading(false)
                    return;
                }

                message_success(response.content.msg, 10);
                setIsLoading(false)
                return;

            }
        } catch (err) {
            console.log(err)
        }
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
                            <Input maxLength={40} style={{ borderRadius: "3px" }} placeholder="Type your email here!" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                disabled={isDisabled}
                                loading={isLoading}
                                onClick={(e) => handleSendEmail(e)}
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
