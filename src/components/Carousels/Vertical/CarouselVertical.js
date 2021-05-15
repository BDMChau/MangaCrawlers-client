import React, { memo } from 'react'
import Slider from 'react-slick';
import "./CarouselVertical.css"

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from 'antd';

function CarouselVertical() {

    // 10 is data.length when we have real data
    const randomInitSlide = Math.floor((Math.random() * 10) + 1);

    const arrResponsive = [{
        breakpoint: 1400,
        settings: {
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToScroll: 1,
        }
    }];

    const settings = {
        className: "slider",
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: randomInitSlide,
        vertical: true,
        dots: true,
        draggable: true,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        swipeToSlide: true,
        lazyLoad: false,
        centerMode: false,
        responsive: arrResponsive,

    };

    return (
        <div className="slider-vertical">
            <Slider {...settings}>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
                <div className="slider-item">
                    <Image src="https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/" class="item" alt="" />
                </div>
               
            </Slider>
        </div>
    )
}

export default memo(CarouselVertical) 