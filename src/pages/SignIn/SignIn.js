import { Button, Modal, Form, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import SignUpService from '../SignUp/SignUpService'
import { useDispatch, useSelector } from 'react-redux';
import { LoginOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { CLOSE_SIGN_IN_FORM } from '../../store/slices/AuthSlice';
import { NavLink } from 'react-router-dom';


export default function SignIn({ handleSignIn }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);

    const authState = useSelector(state => state.authState);
    const dispatch = useDispatch();


    useEffect(() => {
        showModal()
    }, [])

    useEffect(() => {
        if (authState[0] === "closeSignUp") {
            setIsModalVisibleSignUp(false)
        }
    }, [authState])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

        setTimeout(() => {
            dispatch(CLOSE_SIGN_IN_FORM("closeSignIn"))
        }, 300);
    };


    const redirectToSignUp = () => {
        setIsModalVisible(false);
        setIsModalVisibleSignUp(true);
        dispatch(CLOSE_SIGN_IN_FORM("closeSignInAndRedirectToSignUp"))

    }

    const handleSubmit = () => {
        handleSignIn()
    }


    return (
        <div>
            <Modal
                className="modal-signin"
                visible={isModalVisible}
                footer={null}
                closable={true}
                onCancel={() => handleCancel()}
            >
                <div>
                    <div className="modal-title-signin">
                        <div className="logo-signin-signup"></div>
                    </div>
                    <Form
                        name="form-sign-in"
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
                            <Button
                                className="btn-submit-signin"
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleSubmit()}
                            >
                                <LoginOutlined /> Sign In
                            </Button>

                            <Button
                                className="btn-cancle-signin"
                                type="danger"
                                htmlType="submit"
                                onClick={handleCancel}
                            >
                                <CloseCircleOutlined /> Cancel
                            </Button>

                            <div className="footer-form" >
                                <div className="signin-to-signup" onClick={() => redirectToSignUp()}>
                                    <a>Create an account?</a>
                                </div>
                                <div className="signin-to-forgotpass">
                                    <NavLink to="/auth/forgotpassword">Forgot the password?</NavLink>
                                </div>
                            </div>
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
