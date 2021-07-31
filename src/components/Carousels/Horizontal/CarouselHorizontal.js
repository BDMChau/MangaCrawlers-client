import React, { memo } from "react";
import "./CarouselHorizontal.css";
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from "react-router-dom";
import LoadingDots from "../../Loading/LoadingDots/LoadingDots"


function CarouselHorizontal({
    data,
    isLoading,
    itemsShow,
    isCenter,
    arrows,
    autoplaySpeed,
    isPadding
}) {

    const staticImgs = [
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594870/Mangaback/ed004b904fad8a61094f993eab787e05.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594492/Mangaback/93cc7694e5f3feb317d892a4c331c976.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594630/Mangaback/839279_free-download-sword-art-online-sao-computer-wallpapers_3840x2160_h.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1622902745/Mangaback/c4546a602b7c4797.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620740786/Mangaback/714324.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594728/Mangaback/qEHxXLP.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594870/Mangaback/ed004b904fad8a61094f993eab787e05.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594492/Mangaback/93cc7694e5f3feb317d892a4c331c976.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594630/Mangaback/839279_free-download-sword-art-online-sao-computer-wallpapers_3840x2160_h.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1622902745/Mangaback/c4546a602b7c4797.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620740786/Mangaback/714324.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1621594728/Mangaback/qEHxXLP.jpg"
    ]


    // 10 is data.length when we have real data
    const randomInitSlide = Math.floor((Math.random() * data.length) + 1);

    const arrResponsive = [{
        breakpoint: 1400,
        settings: {
            slidesToShow: itemsShow ? itemsShow : 4,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: itemsShow ? itemsShow : 3,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: itemsShow ? itemsShow : 1,
            slidesToScroll: 1,
        }
    }];



    const settings = {
        className: "slider",
        slidesToShow: itemsShow ? itemsShow : 7,
        slidesToScroll: 1,
        initialSlide: randomInitSlide,
        vertical: false,
        dots: false,
        arrows: arrows,
        draggable: true,
        fade: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: autoplaySpeed,
        adaptiveHeight: true,
        swipeToSlide: true,
        lazyLoad: true,
        centerMode: isCenter,
        responsive: arrResponsive
    };


    return (
        <div className="slider-horizontal">
            {isLoading
                ? <div className="items-loading">
                    <LoadingDots />
                </div>
                : <Slider {...settings}>
                    {data.length
                        ? data.map((item, i) => (
                            <NavLink
                                title={item.manga_name}
                                to={`/manga/${item.manga_id}`}
                                key={i}
                                className={isPadding ? "slider-item" : "slider-item item2"}
                            >
                                <div className="item" style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                </div>
                            </NavLink>
                        ))
                        : staticImgs.map((item, i) => (
                            <div key={i} className={isPadding ? "slider-item" : "slider-item item2"} >
                                <div className="item" style={{ backgroundImage: `url(${item})` }}>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            }
        </div>
    );
}

export default memo(CarouselHorizontal)