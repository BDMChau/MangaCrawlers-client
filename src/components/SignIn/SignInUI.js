import { Button, Modal, Form, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import SignUpService from '../SignUp/SignUpService'

export default function SignInUI({ handleSubmit }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);

    useEffect(() => {
        const isCloseSignUp = JSON.parse(sessionStorage.getItem("closeSignUp"));
        if (isCloseSignUp) {
            setIsModalVisibleSignUp(false)
            sessionStorage.clear();
        }
    })

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const redirectToSignUp = () => {
        setIsModalVisible(false);
        setIsModalVisibleSignUp(true);

    }

    const handleSubmitUI = () => {
        handleSubmit()
    }


    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                className="modal-signin"
                visible={isModalVisible}
                footer={null}
                closable={false}
            >
                <div>
                    <div className="modal-title-signin">
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
                            <Input placeholder="Email" />
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

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item className="form-signin-footer">
                            <div className="signin-to-signup" onClick={() => redirectToSignUp()}>
                                Create an account?
                            </div>
                            <Button
                                className="btn-cancle-signin"
                                type="danger"
                                htmlType="submit"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                className="btn-submit-signin"
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleSubmitUI()}
                            >
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            {isModalVisibleSignUp
                ? <SignUpService />
                : ""
            }
        </div >
    )
}
