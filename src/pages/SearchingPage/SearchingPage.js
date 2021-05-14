import React, { useState } from 'react'
import { Col, Row, Select, Popover, Tag, Typography } from 'antd'
import "./SearchingPage.css"

const { Option } = Select;

export default function SearchingPage() {
    const [genres, setGenres] = useState([
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },
        {
            name: "Action",
            desc: "ascccccccccccccccccccccccgfbfsdfvdhjkfbdvindilbnrdiobrnbfdlkbnfl;g",
            color: "red"
        },

    ])
    const [genresChildren, setGenresChildren] = useState([]);
    const [data, setData] = useState([]);



    const onChange = (value) => {
        const arr = [];
        arr.push(value)
        console.log(arr)
        // let removeDuplicatedItems = 
        setData([...data, value])
    }


    const handleSearch = () => {
        console.log('search:');
    }

    return (
        <Row justify={"center"} className="searching-page">
            <Col sm={24} md={21} xl={17} xxl={21} className="add-panel">
                <Typography.Title level={4}> Search your favorite manga with genres combination</Typography.Title>
                <Select
                    className="selected-tags"
                    placeholder="Add tags which you want to search..."
                    mode="tags"
                    onKeyUp={(e) => e.key === "Enter" ? handleSearch() : ""}
                    onChange={onChange}
                    value={data}
                    disabled={true}
                > 
                </Select>
               
                <div className="tags-wraper">
                    {
                        genres.map((item) => {
                            if (item !== null) {
                                return (
                                        <Popover content={item.desc} className="item-tag">
                                        <Tag color={item.color} onClick={() => onChange(item.name)}>{item.name}</Tag>
                                    </Popover>
                                )
                            }
                        })
                    }
                </div>
            </Col>

        </Row>
    )
}
