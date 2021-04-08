import React from 'react'
import notFoundIcon from '../../assets/img/404NotFound.svg'

export default function NotFound404() {
    return (
        <div style={{ textAlign: "center", margin: "180px 0 0 0" }} >
            <img src={notFoundIcon} alt="" style={{ width: "200px", marginBottom: "20px" }} />

            <h1>404 Not Found :(</h1>
        </div>
    )
}
