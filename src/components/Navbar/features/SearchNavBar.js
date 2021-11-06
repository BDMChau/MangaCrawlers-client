import React, { useEffect, useState } from 'react'

import { Input, AutoComplete, Typography } from 'antd'
import { SearchOutlined } from "@ant-design/icons";
import mangaApi from 'api/apis/MainServer/mangaApi';
import { debounce } from 'lodash';

export default function SearchNavBar() {
    const [inputVal, setInputVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (inputVal) debouceCallApiToSearch(inputVal);
        else setSearchResults([]);
    }, [inputVal])


    const debouceCallApiToSearch = debounce(async (val) => {
        try {
            setIsLoading(true);
            const data = {
                "manga_name": val
            }
            const response = await mangaApi.search(data);

            if (response) {
                if (response.content.err) {
                    setSearchResults([])
                    setIsLoading(false);
                    return;
                }

                const mangas = response.content.data;
                setSearchResults(mangas)
                setIsLoading(false);
                return;
            }
        } catch (err) {
            console.log(err)
        }
    }, 200)



    return (
        <AutoComplete
            getPopupContainer={() => document.getElementById('header-nav')}
            className="search-menu-input"
            onSearch={(value) => setInputVal(value)}
            onSelect={(val) => setInputVal("")}
            value={inputVal}
            suffixIcon={<SearchOutlined />}
            defaultActiveFirstOption
            placeholder="Search..."
        >
            {searchResults.map((item, i) => (
                <AutoComplete.Option key={i} value={item.manga_name}>
                    <div className="search-menu-item" >
                        <img className="img" src={item.thumbnail} alt="" />

                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                            <Typography.Text style={{ whiteSpace: "pre-wrap", fontWeight: 500 }} >{item.manga_name}</Typography.Text>
                            <Typography.Text style={{ color: "#7e7e7e", fontStyle: "italic" }} >{item.views} views</Typography.Text>
                        </div>
                    </div>
                </AutoComplete.Option>
            ))}

        </AutoComplete>
    )
}
