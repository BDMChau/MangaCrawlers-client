import { Button, Modal, Form, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignUp.css";
import SignUpService from '../SignUp/SignUpService'

export default function SignUpUI() {
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        showModal()
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        sessionStorage.setItem("closeSignUp", JSON.stringify("closeSignUp"))
    };




    return (
        <div>
        <Modal
            className="modal-signup"
            visible={isModalVisible}
            footer={null}
            closable={false}
        >
            <div>
                <div className="modal-title-signup">
                    <div className="logo-signin-signup"></div>
                </div>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please fill in your email!',
                        }]}
                    >
                        <Input placeholder="Email"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please fill in your password!',
                        }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="repeat password"
                        rules={[{
                            required: true,
                            message: 'Please fill in this field!',
                        }]}
                    >
                        <Input.Password placeholder="Repeat Password" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item className="form-signup-footer">
                        <Button className="btn-cancle-signup" type="danger" htmlType="submit" onClick={handleCancel}>
                            Cancel
                    </Button>

                        <Button className="btn-submit-signup" type="primary" htmlType="submit">
                            Sign up
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </div>
    )
}
