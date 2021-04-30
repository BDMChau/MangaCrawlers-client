import React, { useState } from 'react'
import "./Navbar.css"
import { Menu, Input } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Search } = Input;

export default function Navbar() {
    const [searchStt, setSearchStt] = useState(false)

    const handleSearch = (value) => {
        //setSearchStt(true)
        console.log(value)
    }

    const renderItems = () => {
     
    }

    return (
        
           
    )
}
