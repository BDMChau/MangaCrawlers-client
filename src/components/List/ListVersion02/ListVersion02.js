import { Button, Col, Empty, Image, List, Popconfirm, Typography } from 'antd'
import React, { useEffect } from 'react'
import Item from './Item'


export default function ListVersion02({ mangas, handleDeleteManga, IsLoadingDelete, disableActions }) {
    // const [pageSize, setPageSize] = useState(9)

    useEffect(() => {
        console.log(mangas)
    }, [mangas.length])



    const renderMangas = () => (
        mangas.length
            ? <List
                className="list-following"
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: () => {
                        console.log("page");
                    },
                    pageSize: 10,
                    defaultCurrent: 1,
                    total: mangas.length,
                }}
                dataSource={mangas}
                footer={false}
                renderItem={manga => (
                    <Item
                        item={manga}

                        handleDeleteManga={handleDeleteManga}
                        IsLoadingDelete={IsLoadingDelete}
                        disableActions={disableActions}
                    />
                )}
            />
            : <Empty
                description="You haven't do anything yet"
                style={{ marginTop: "40px", color: "#8a8d92", fontSize: "18px" }}
            />


    )



    return (
        <Col xs={24} md={20} xl={20} xxl={20} className="col-list-follow" >
            {renderMangas()}
        </Col>
    )
}
