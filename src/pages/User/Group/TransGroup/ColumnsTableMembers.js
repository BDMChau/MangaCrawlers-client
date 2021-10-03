import { Popconfirm, Space, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const tableColumns = (userEmail, transgrEmail, handleRemoveUser) => {
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (user, record) => (
                userEmail === transgrEmail
                    ? <Space size="middle">
                        <Popconfirm
                            title="Are you sure to remove this member?"
                            onConfirm={() => handleRemoveUser(user.user_id)}
                            okText="Confirm"
                            cancelText="Cancle"
                        >
                            <Typography.Text style={{ color: "#629EFF", cursor: "pointer" }} >Remove</Typography.Text>
                        </Popconfirm>
                    </Space>
                    : ""
            ),
        },
    ];

    return columns;
}


export default tableColumns;