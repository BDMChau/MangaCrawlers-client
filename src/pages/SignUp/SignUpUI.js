import { Button, Modal, Form, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import "./SignUp.css";
import { useDispatch } from 'react-redux';
import { CLOSE_SIGN_UP_FORM } from '../../store/slices/stuffsSlice';
import { useHistory } from 'react-router';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


export default function SignUpUI({ handleSignUp }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [isMatchPass, setIsMatchPass] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

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
        dispatch(CLOSE_SIGN_UP_FORM("closeSignUp"))
        history.push("/signin")
    };

    const handleSubmit = () => {
        if (password !== passwordRepeat) {
            setIsMatchPass("Password is not match!")
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
                        onKeyPress={(e) => e.key === "Enter" ? showModal() : ""}
                    >
                        <Form.Item
                            name="name"
                            rules={[{
                                required: true,
                                message: 'Please fill in your nickname!',
                            }]}
                        >
                            <Input placeholder="Choose your nickname!" onChange={(e) => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please fill in your email!',
                            }]}
                        >
                            <Input placeholder="Please fill in your email!" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please fill in your password!',
                            }]}
                        >
                            <Input.Password placeholder="Please fill in your password!" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="repeat password"
                            rules={[{
                                required: true,
                                message: 'Please fill in this field!',
                            }]}
                        >
                            <Input.Password placeholder="Please fill in your repeat password" onChange={(e) => setPasswordRepeat(e.target.value)} />
                        </Form.Item>
                        {isMatchPass ?
                            <p style={{ color: "#FF4D4F" }} >{isMatchPass}</p>
                            : ""
                        }
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item className="form-signup-footer">
                            <Button className="btn-submit-signup" type="primary" htmlType="submit"
                                onClick={() => handleSubmit()}
                            >
                               <CheckCircleOutlined />  Sign up
                            </Button>

                            <Button className="btn-cancle-signup" type="danger" htmlType="submit"
                                onClick={handleCancel}
                            >
                                <CloseCircleOutlined/> Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}
