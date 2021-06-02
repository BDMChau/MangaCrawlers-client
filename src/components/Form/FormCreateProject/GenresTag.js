import React from 'react'
import { Select, Radio, Typography } from 'antd';

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
        {
          genres.length
            ? genres.map((genre, i) => (
              <Select.Option key={i}>
                <Typography.Text style={{ color: genre.genre_color }}>

                {genre.genre_name}

                </Typography.Text>
              </Select.Option>
            ))
            : " "
        }
    </Select>
    </>
  );
};