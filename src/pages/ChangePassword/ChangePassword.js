import React, { useState } from 'react'
import "./ChangePassword.css"

import { useParams } from 'react-router';
import authApi from '../../api/apis/authApi';
import { message_success } from '../../components/notifications/message';
import { Button, Col, Input, Row, Typography, Form } from 'antd'


const { Title, Text } = Typography;

export default function ChangePassword() {
    const [password, setPassword] = useState("")
    const { token } = useParams();

    const handleSendNewPass = async (e) => {
        e.preventDefault();

        try {
            if (password) {
                const data = {
                    user_password: password,
                    user_change_pass_token: token
                }
                const response = await authApi.changePassword(data);
                console.log(response)
                if (response.content.err) {
                    return;
                }
                setPassword("");
                message_success(response.content.msg, 10);
                return;
            }
        } catch (err) {
            console.log(err)
        }
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
                            <Input.Password
                                style={{ borderRadius: "3px" }}
                                placeholder="Type your new password!"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                onClick={(e) => handleSendNewPass(e)}
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
