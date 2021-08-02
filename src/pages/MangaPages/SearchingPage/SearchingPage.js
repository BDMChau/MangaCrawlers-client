import React from 'react'
import { Col, Row, Select, Tag, Typography, Button, Tooltip } from 'antd'
import "./SearchingPage.css"
import { SearchOutlined } from "@ant-design/icons"

export default function SearchingPage({ data, dataName, isLoading, handleClickTag, handleGetMangasAndRedirectToResultPage }) {




    return (
        <Row justify={"center"} className="searching-page">
            <Col sm={24} md={21} xl={17} xxl={21} className="add-panel">
                <Typography.Title level={4} style={{ margin: "8px 8px" }}> Search your favorite manga with genre combinations</Typography.Title>
                <Select
                    className="selected-tags"
                    title="Tags Selected"
                    placeholder="Add tags which you want to search..."
                    mode="tags"
                    // onKeyUp={(e) => e.key === "Enter" ? handleGetMangasAndRedirectToResultPage() : ""}
                    value={dataName}
                    disabled={true}
                >
                </Select>

                <Button
                    className="search-btn"
                    onClick={() => handleGetMangasAndRedirectToResultPage()}
                    loading={isLoading}
                    icon={<SearchOutlined />}
                >
                    Search
                </Button>

                <div className="tags-wrapper">
                    <div className="tags-tips">
                        <Typography.Text style={{ color: "##afafaf" }} >Click on tag to add or remove!</Typography.Text>
                    </div>
                    {data.length
                        ? data.map((item, i) => {
                            if (item !== null) {
                                return (
                                    <Tooltip title={item.genre_description} key={item.genre_id} className={item.isSelected ? "item-tag-disable" : "item-tag"}>
                                        <Tag
                                            key={i}
                                            color={item.isSelected ? "" : item.genre_color}
                                            onClick={() => handleClickTag(item)}
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
