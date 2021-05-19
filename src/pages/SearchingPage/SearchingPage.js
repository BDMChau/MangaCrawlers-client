import React, { useEffect, useState } from 'react'
import { Col, Row, Select, Popover, Tag, Typography, Button, Tooltip } from 'antd'
import "./SearchingPage.css"


export default function SearchingPage({ data, dataName, handleClickTag }) {


    const handleClick = (genre) => {
        handleClickTag(genre)
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
                    title="Tags Selected"
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
                    {data.length
                        ? data.map((item) => {
                            if (item !== null) {
                                return (
                                    <Tooltip title={item.genre_description} key={item.genre_id} className={item.isSelected ? "item-tag-disable" : "item-tag"}>
                                        <Tag
                                            color={item.isSelected ? "" : item.genre_color}
                                            onClick={() => handleClick(item)}
                                        >
                                            {item.genre_name}
                                        </Tag>
                                    </Tooltip>
                                )
                            }
                        })
                        : ""

                    }
                </div>
            </Col>

        </Row>
    )
}
