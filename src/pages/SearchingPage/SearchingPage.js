import React, { useEffect, useState } from 'react'
import { Col, Row, Select, Popover, Tag, Typography, Button, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import "./SearchingPage.css"
import GenresList from "../../helpers/GenresList"


export default function SearchingPage() {
    const genres = GenresList;
    const [data, setData] = useState(genres);
    const [dataName, setDataName] = useState([]);


    useEffect(() => {
        console.log(dataName)
    }, [dataName])

    const handleClickTag = (item, index) => {
        if (data[index].isSelected === false) {
            data[index].isSelected = true

            setData(data)
            setDataName((prevData) => [...prevData, item.name])
            return;

        } else {
            data[index].isSelected = false

            setData(data)
            setDataName(dataName.filter(name => name !== item.name))
            return;
        }
    }



    const handleSearch = () => {
        console.log(dataName);
    }

    return (
        <Row justify={"center"} className="searching-page">
            <Col sm={24} md={21} xl={17} xxl={21} className="add-panel">
                <Typography.Title level={4} style={{ margin: "8px 8px" }}> Search your favorite manga with genre combinations</Typography.Title>
                <Select
                    className="selected-tags"
                    placeholder="Add tags which you want to search..."
                    mode="tags"
                    onKeyUp={(e) => e.key === "Enter" ? handleSearch() : ""}
                    value={dataName}
                    disabled={true}
                >
                </Select>

                <Button className="search-btn" onClick={() => handleSearch()}>
                    Search
                </Button>

                <div className="tags-wrapper">
                    <div className="tags-tips">
                        <Typography.Text style={{ color: "##afafaf" }} >Click on tag to add or remove!</Typography.Text>
                    </div>
                    {
                        data.map((item, index) => {
                            if (item !== null) {
                                return (
                                    <Tooltip title={item.desc} key={index} className={item.isSelected ? "item-tag-disable" : "item-tag"}>
                                        <Tag
                                            color={item.isSelected ? "" : item.color}
                                            onClick={() => handleClickTag(item, index)}
                                        >
                                            {item.name}
                                        </Tag>
                                    </Tooltip>
                                )
                            }
                        })
                    }
                </div>
            </Col>

        </Row>
    )
}
