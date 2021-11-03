import React from 'react'

import { Input, AutoComplete } from 'antd'
import { SearchOutlined } from "@ant-design/icons";

export default function SearchNavBar() {
    const options = [
        { value: 'Burns Bay Road' },
        { value: 'Downing Street' },
        { value: 'Wall Street' },
      ];
  
    return (
        <AutoComplete
            allowClear
            dropdownMatchSelectWidth={310}
            options={options}
        >
            <Input
                className="input-search"
                prefix={<SearchOutlined style={{ color: "#a3a1a1" }} />}
                placeholder={`Search...`}

            />
        </AutoComplete>
    )
}
