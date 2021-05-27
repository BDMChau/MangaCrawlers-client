import React from 'react'
import { Select, Radio } from 'antd';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


export const GenresTag = ({ genres, handleChange }) => {
  


  return (
    <>
      <Select
        mode="multiple"
        size="medium"
        showArrow
        allowClear
        placeholder="Select Genres"
        onChange={(arrValue) => handleChange(arrValue)}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
    </>
  );
};