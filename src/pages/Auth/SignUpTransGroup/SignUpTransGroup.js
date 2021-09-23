import React, { useEffect, useState } from 'react';
import "./SignUpTransGroup.css"
import { useDispatch } from 'react-redux';
import { CLOSE_SIGN_UP_FORM, CLOSE_SIGN_IN_FORM } from '../../../store/features/auth/AuthSlice';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Checkbox, Popover, Tabs, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import rules from "../../../utils/rules";
import { CheckOutlined } from "@ant-design/icons";
import userApi from '../../../api/apis/MainServer/userApi';
import { message_error, message_success } from '../../../components/notifications/message';
import Cookies from 'universal-cookie';
import { SET_TRANSGROUP_ID } from '../../../store/features/user/UserSlice';


export default function SignUpTransGroup() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [isCheckedRules, setIsCheckedRules] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const token = cookies.get("token")


    useEffect(() => {
        showModal()
    }, [])

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

        if (!name || !desc || !isCheckedRules) {
            return
        } else {
            registerTransGroup();
            return;
        }
    }

    const registerTransGroup = async () => {
        setIsLoading(true);
        const data = {
            group_name: name,
            group_desc: desc
        }

        try {
            const response = await userApi.registerTranslationGroup(token, data);

            if (response.content.err) {
                message_error("response.content.err");
                setIsLoading(false)
            } else if (response.content.msg) {
                const transGroupId = response.content.transgroup_id;
                
                const user = cookies.get("user");
                user.user_transgroup_id = transGroupId;
                cookies.set("user", user, { path: '/' });
                dispatch(SET_TRANSGROUP_ID(transGroupId))
                message_success("Created your team", 3);
                message_success("Log in again to use all features!", 5);
                setIsLoading(false);
            }

            return;
        } catch (ex) {
            console.log(ex)
        }
    }

    const renderRules = () => (
        <div className="rules">
            <Typography.Text><CheckOutlined style={{ fontSize: "18px", color: "green" }} /> {rules.rule01}</Typography.Text>
            <Typography.Text><CheckOutlined style={{ fontSize: "18px", color: "green" }} /> {rules.rule02}</Typography.Text>
            <Typography.Text><CheckOutlined style={{ fontSize: "18px", color: "green" }} /> {rules.rule03}</Typography.Text>
            <Typography.Text><CheckOutlined style={{ fontSize: "18px", color: "green" }} /> {rules.rule04}</Typography.Text>
            <Typography.Text><CheckOutlined style={{ fontSize: "18px", color: "green" }} /> {rules.rule05}</Typography.Text>
        </div>
    )


    return (
        <div>
            <Modal
                className="modal-signup-trans-group"
                visible={isModalVisible}
                footer={null}
                closable={true}
                onCancel={() => handleCancel()}
            >
                <div>
                    <div className="modal-title-signup-trans-group">
                        <div className="logo-signin-signup"></div>
                    </div>
                    <Form
                        name="form-sign-up-trans-group"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="translation team name"
                            rules={[{
                                required: true,
                                message: 'Please fill in your translation team name!',
                            }]}
                        >
                            <Input minLength={1} maxLength={60} placeholder="Choose your translation team name" onChange={(e) => setName(e.target.value.trim())} />
                        </Form.Item>

                        <Form.Item
                            name="Description about your team"
                            rules={[{
                                required: true,
                                message: 'Tell us something about your team!',
                            }]}
                        >
                            <TextArea maxLength={200} placeholder="Description about your team" onChange={(e) => setDesc(e.target.value.trim())} style={{ resize: "none", height: "150px" }} />
                        </Form.Item>

                        <Form.Item
                            name="check box rules"
                            rules={[{
                                required: isCheckedRules ? false : true,
                                message: 'Required!',
                            }]}
                        >
                            <Checkbox className="checkbox-accept-terms" onChange={(e) => setIsCheckedRules(e.target.checked)} >
                                <Typography.Text style={{ marginRight: "2.5px" }} >I understand and accept the</Typography.Text>

                                <Popover className="popover-checkbox" content={renderRules} trigger="click" overlayStyle={{ width: "75vw", maxHeight: "500px", overflowY: "auto" }} >
                                    MangaCrawlers terms
                                </Popover>
                            </Checkbox>

                        </Form.Item>



                        <Form.Item className="form-signup-footer" style={{ marginTop: "10px" }} >
                            <Button className="btn-submit-signup-trans-group" type="primary" htmlType="submit"
                                onClick={(e) => handleSubmit(e)}
                                loading={isLoading}
                                icon={<CheckCircleOutlined />}
                            >
                                Create
                            </Button>

                            <Button className="btn-cancle-signup-trans-group" type="danger" htmlType="submit"
                                onClick={handleCancel}
                                icon={<CloseCircleOutlined />}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}
