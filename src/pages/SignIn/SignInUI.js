import { Button, Modal, Form, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import SignUpService from '../SignUp/SignUpService'
import { useDispatch, useSelector } from 'react-redux';
import { RESET } from '../../store/slices/stuffsSlice';
import { LoginOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { CLOSE_SIGN_IN_FORM } from '../../store/slices/stuffsSlice';


export default function SignInUI({ handleSignIn }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);

    const stuffsState = useSelector(state => state.stuffsSlice);
    const dispatch = useDispatch();


    useEffect(() => {
        showModal()
    }, [])

    useEffect(() => {
        if (stuffsState[0] === "closeSignUp") {
            setIsModalVisibleSignUp(false)
            dispatch(RESET())
        }
    }, [stuffsState])


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

                            <div className="signin-to-signup" onClick={() => redirectToSignUp()}>
                                Create an account?
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
