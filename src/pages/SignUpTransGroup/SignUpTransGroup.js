import React, { useEffect, useState } from 'react';
import "./SignUpTransGroup.css"
import { useDispatch } from 'react-redux';
import { CLOSE_SIGN_UP_FORM, CLOSE_SIGN_IN_FORM } from '../../store/slices/AuthSlice';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Checkbox, Popover, Tabs, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import rules from "../../helpers/Rules";
import { CheckOutlined } from "@ant-design/icons";

export default function SignUpTransGroup() {
    const [nameTransTeam, setNameTransTeam] = useState("");
    const [desc, setDesc] = useState("");

    const [isCheckedRules, setIsCheckedRules] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();



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

        if (!nameTransTeam || !desc || !isCheckedRules) {
            return
        } else {
            // handleSignUp(name, email, password)

            return;
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
                            <Input placeholder="Choose your translation team name" onChange={(e) => setNameTransTeam(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="Description about your team"
                            rules={[{
                                required: true,
                                message: 'Tell us something about your team!',
                            }]}
                        >
                            <TextArea placeholder="Description about your team" onChange={(e) => setDesc(e.target.value)} style={{ resize: "none", height: "150px" }} />
                        </Form.Item>

                        <Form.Item
                            name="check box rules"
                            rules={[{
                                required: isCheckedRules ? false : true,
                                message: 'Required!',
                            }]}
                        >
                            <Checkbox className="checkbox-accept-terms" onChange={(e) => setIsCheckedRules(e.target.checked)} >
                                <Typography.Text style={{ marginRight: "2.5px" }} >I understand and agree to</Typography.Text>

                                <Popover className="popover-checkbox" content={renderRules} trigger="click" overlayStyle={{ width: "75vw", maxHeight: "500px", overflowY: "auto" }} >
                                    Terms of Service and Private Policy
                                </Popover>
                            </Checkbox>

                        </Form.Item>



                        <Form.Item className="form-signup-footer">
                            <Button className="btn-submit-signup-trans-group" type="primary" htmlType="submit"
                                onClick={(e) => handleSubmit(e)}
                            >
                                <CheckCircleOutlined />  Create
                            </Button>

                            <Button className="btn-cancle-signup-trans-group" type="danger" htmlType="submit"
                                onClick={handleCancel}
                            >
                                <CloseCircleOutlined /> Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}
