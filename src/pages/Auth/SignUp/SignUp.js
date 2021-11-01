import React, { useEffect, useState } from 'react';
import "./SignUp.css";
import { useDispatch } from 'react-redux';
import { CLOSE_SIGN_UP_FORM, CLOSE_SIGN_IN_FORM } from '../../../store/features/auth/AuthSlice';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input } from 'antd';
import SignInService from '../SignIn/SignInService';


export default function SignUp({ isLoading, handleSignUp, isCloseModal, msgFromSignUp }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [isMatchPass, setIsMatchPass] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);

    const dispatch = useDispatch();



    useEffect(() => {
        showModal()
    }, [])

    useEffect(() => {
        if (isCloseModal === true) {
            setIsModalVisible(false);
            setIsModalSignInVisible(true);

            dispatch(CLOSE_SIGN_UP_FORM("closeSignUpAndRedirectToSignIn"))
        }
    }, [isCloseModal])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

        setTimeout(() => {
            dispatch(CLOSE_SIGN_UP_FORM("closeSignUp"))
            dispatch(CLOSE_SIGN_IN_FORM("closeSignIn"))
        }, 300);
    };

    const handleSubmit = (e) => {
        // e.preventDefault()

        if (!name || !email || !password || !passwordRepeat) {
            return
        }
        else if (password !== passwordRepeat) {
            setIsMatchPass("Passwords didn't match!")
            return;

        } else {
            handleSignUp(name, email, password)
            setIsMatchPass("")
            return;
        }
    }



    return (
        <div>
            <Modal
                className="modal-signup"
                visible={isModalVisible}
                footer={null}
                closable={true}
                onCancel={() => handleCancel()}
            >
                <div>
                    <div className="modal-title-signup">
                        <div className="logo-signin-signup"></div>
                    </div>
                    <Form
                        name="form-sign-up"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="name"
                            rules={[{
                                required: true,
                                message: 'Please fill in your nickname!',
                            }]}
                        >
                            <Input minLength={1} maxLength={30} placeholder="Nickname" onChange={(e) => setName(e.target.value.trim())} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please fill in your email!',
                            }]}
                        >
                            <Input maxLength={100} placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please fill in your password!',
                            }]}
                        >
                            <Input.Password minLength={8} placeholder="Password" onChange={(e) => setPassword(e.target.value.trim())} />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "20px" }}
                            name="Confirm password"
                            rules={[{
                                required: true,
                                message: 'Confirm password!',
                            }]}
                        >
                            <Input.Password minLength={8} placeholder="Confirm your password" onChange={(e) => setPasswordRepeat(e.target.value)} />
                        </Form.Item>
                        {isMatchPass ?
                            <p style={{ color: "#FF4D4F" }} >{isMatchPass}</p>
                            : ""
                        }


                        <Form.Item className="form-signup-footer">
                            <Button className="btn-submit-signup" type="primary" htmlType="submit"
                                onClick={(e) => handleSubmit(e)}
                                icon={<CheckCircleOutlined />}
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Register
                            </Button>

                            <Button className="btn-cancle-signup" type="danger" htmlType="submit"
                                onClick={handleCancel}
                                icon={<CloseCircleOutlined />}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            {
                isModalSignInVisible
                    ? <SignInService isOpenModal={isModalSignInVisible} msgFromSignUp={msgFromSignUp} />
                    : ""
            }
        </div>
    )
}
