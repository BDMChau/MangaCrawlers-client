import { Button, Modal, Form, Input, Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import SignUpService from '../SignUp/SignUpService'
import { useDispatch, useSelector } from 'react-redux';
import { LoginOutlined, CloseCircleOutlined, GoogleOutlined } from '@ant-design/icons';
import { CLOSE_SIGN_IN_FORM } from '../../store/slices/AuthSlice';
import { NavLink } from 'react-router-dom';


export default function SignIn({ handleSignIn, handleSignInWithGoogle, isCloseModal, errorMsg, isErr }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);

    const authState = useSelector(state => state.authState);
    const dispatch = useDispatch();


    useEffect(() => {
        showModal()
    }, [])

    useEffect(() => {
        if (isCloseModal === true) {
            handleCancel()
        }
    }, [isCloseModal])

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

    const handleSubmit = (e) => {
        // e.preventDefault()

        handleSignIn(email, password)
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

                    {
                        errorMsg !== ""
                            ? <div div style={{ marginBottom: "10px" }} >
                                {
                                    isErr
                                        ? <Alert message={errorMsg} type="error" showIcon />
                                        : <Alert message={errorMsg} type="warning" showIcon />
                                }
                            </div>
                            : ""
                    }

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
                            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please fill in your password!',
                            }]}
                        >
                            <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value.trim())} />
                        </Form.Item>



                        <Form.Item className="form-signin-button">
                            <Button
                                className="btn-submit-signin"
                                type="primary"
                                htmlType="submit"
                                onClick={(e) => handleSubmit(e)}
                                icon={<LoginOutlined />}
                            >
                                Sign In
                            </Button>

                            <Button
                                className="btn-cancle-signin"
                                type="danger"
                                htmlType="submit"
                                onClick={handleCancel}
                                icon={<CloseCircleOutlined />}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
           
                        <Form.Item>
                            <div className="footer-form" >
                                <div className="signin-to-signup" onClick={() => redirectToSignUp()}>
                                    <a>Create an account?</a>
                                </div>
                                <div className="signin-to-forgotpass" onClick={handleCancel}>
                                    <NavLink to="/auth/forgotpassword">Forgot password?</NavLink>
                                </div>
                            </div>

                            <Button
                                style={{ borderRadius: "50px", color: "#4a8fce", height:"42px", width:"42px", float:"right", marginRight:"40px" }}
                                onClick={() => handleSignInWithGoogle()}
                                icon={<GoogleOutlined style={{ fontSize: "24px", marginTop:"4px" }} />}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            {
                isModalVisibleSignUp
                    ? <SignUpService />
                    : ""
            }
        </div >
    )
}
