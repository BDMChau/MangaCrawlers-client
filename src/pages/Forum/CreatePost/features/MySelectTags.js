import { Button, Input, Typography, Select, Form } from 'antd';


export const MySelectTags = ({ data, title, handleChange }) => (
    <>
        <Select
            mode="multiple"
            size="medium"
            showArrow
            allowClear
            placeholder="Select Categories"
            onChange={(arrValue) => handleChange(arrValue)}
            style={{ width: '100%', borderRadius: "5px" }}
        >
            {
                data.length
                    ? data.map((item, i) => (
                        <Select.Option key={item.category_id}>
                            <Typography.Text style={{ color: item.color }}>
                                {item.name}
                            </Typography.Text>
                        </Select.Option>
                    ))
                    : ""
            }
        </Select>
    </>
);