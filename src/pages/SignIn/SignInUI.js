import { Button, Modal, Form, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import SignUpService from '../SignUp/SignUpService'
import { useDispatch, useSelector } from 'react-redux';
import { RESET } from '../../store/slices/stuffsSlice';
import { useHistory } from 'react-router';


export default function SignInUI({ handleSubmit }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);

    const stuffsState = useSelector(state => state.stuffsSlice);
    const dispatch = useDispatch();
    const history = useHistory();



    useEffect(() => {
        if (stuffsState[0] === "closeSignUp") {
            setIsModalVisibleSignUp(false)
            dispatch(RESET())
        }
    }, [stuffsState])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        history.push("/");
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
                            <Button
                                className="btn-submit-signin"
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleSubmitUI()}
                            >
                                Sign in
                            </Button>

                            <Button
                                className="btn-cancle-signin"
                                type="danger"
                                htmlType="submit"
                                onClick={handleCancel}
                            >
                                Cancel
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
