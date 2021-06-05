import React, { useState, useEffect } from 'react'
import { Rate, Typography } from 'antd';
import "./Rating.css";

function Rating({ stars, handleRatingManga, hideText }) {
    const [hoverVal, setHoverVal] = useState(undefined);
    const [customText, setCustomText] = useState({
        text: "",
        color: ""
    });


    useEffect(() => {
        if (hoverVal <= 2) {
            setCustomText({ text: "Poor", color: "#e48d88" })
        } else if (hoverVal <= 3.5) {
            setCustomText({ text: "Normal", color: "#f9d767" })
        } else if (hoverVal <= 4.5) {
            setCustomText({ text: "Good", color: "#61d2c6" })

        } else if (hoverVal >= 5) {
            setCustomText({ text: "Perfect", color: "#9be462" })
        } else if (hoverVal === undefined) {
            setHoverVal(stars);
        }
    }, [hoverVal])

    useEffect(() => {
        if (stars <= 2) {
            setCustomText({ text: "Poor", color: "#e48d88" })
        } else if (stars <= 3.5) {
            setCustomText({ text: "Normal", color: "#f9d767" })
        } else if (stars <= 4.5) {
            setCustomText({ text: "Good", color: "#61d2c6" })
        } else if (stars >= 5) {
            setCustomText({ text: "Perfect", color: "#9be462" })
        }
    }, [stars])


    return (
        <div style={{ display: "flex" }}>
            <Rate
                className="rating"
                allowHalf={true}
                allowClear={true}
                value={stars}
                count={5}
                onChange={(value) => handleRatingManga(value)}
                onHoverChange={(value) => { setHoverVal(value) }}
            />
            <Typography.Text
                style={{
                    marginLeft: "10px",
                    marginTop: "6px",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: customText.color,
                }}
            >
                {
                    hideText
                        ? ""
                        : customText.text
                }
            </Typography.Text>
        </div>
    )
}

export default Rating