import React from 'react'

import { Select, Typography } from 'antd';


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
        style={{ width: '100%', borderRadius:"5px" }}
      >
        {
          genres.length
            ? genres.map((genre, i) => (
              <Select.Option key={genre.genre_id}>
                <Typography.Text style={{ color: genre.genre_color }}>
                  {genre.genre_name}
                </Typography.Text>
              </Select.Option>
            ))
            : ""
        }
      </Select>
    </>
  );
};