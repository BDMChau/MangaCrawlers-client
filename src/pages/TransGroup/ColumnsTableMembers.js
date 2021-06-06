import { Popconfirm, Space, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const columns = [
    {
        title: 'Avatar',
        dataIndex: 'user_avatar',
        key: 'user_avatar',
        render: src => <Avatar size={30} src={src} />,
    },
    {
        title: 'Name',
        dataIndex: 'user_name',
        key: 'user_name',
        className: "name-col",
        render: text => <p>{text}</p>,
    },
    {
        title: 'Email',
        dataIndex: 'user_email',
        key: 'user_email',
        className: "email-col"
    },
    {
        title: 'Action',
        key: 'action',
        render: (user, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this account?"
                        // onConfirm={() => handleRemoveUser(user.user_id)}
                        onCancel={"cancel"}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Typography.Text style={{ color: "#629EFF", cursor: "pointer" }} >Remove</Typography.Text>
                    </Popconfirm>
                </Space>
        ),
    },
];


export default columns;