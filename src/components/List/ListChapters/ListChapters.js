import React, { memo, useState } from 'react';
import "./ListChapters.css";
import LoadingCircle from '../../Loading/LoadingCircle/LoadingCircle';
import { Empty, Input, Typography, Button, Popconfirm, Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import redirectURI from 'helpers/redirectURI';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import Item from './RenderChapters';
import RenderChapters from './RenderChapters';

function ListChapters({ chapters, mangaId, mangaName, height, editChapter, removeChapter }) {
    const [isLoading] = useState(false)




    return (
        <ul
            className="list-chapter"
            style={{ height: height }}
        >
            {isLoading
                ? <LoadingCircle />
                : chapters.length
                    ? <RenderChapters chapters={chapters} mangaId={mangaId} mangaName={mangaName} editChapter={editChapter} />
                    : <Empty
                        style={{ margin: "0 auto", marginTop: "120px", color: "#8a8d92" }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Chapters :("
                    />
            }
        </ul >
    )
}

export default memo(ListChapters)