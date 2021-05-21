import React, { memo } from "react";
import "./CarouselHorizontal.css";
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CarouselHorizontal({ itemsShow, isCenter, arrows, autoplaySpeed, isPadding}) {

    // 10 is data.length when we have real data
    const randomInitSlide = Math.floor((Math.random() * 10) + 1);

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
        slidesToShow: itemsShow ? itemsShow : 5,
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
            <Slider {...settings}>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://res.cloudinary.com/mangacrawlers/image/upload/v1621594630/Mangaback/839279_free-download-sword-art-online-sao-computer-wallpapers_3840x2160_h.jpg)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://res.cloudinary.com/mangacrawlers/image/upload/v1620740786/Mangaback/714324.png)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://res.cloudinary.com/mangacrawlers/image/upload/v1621594453/Mangaback/Free-download-Naruto-vs-Bleach-by-getsuga-rasengan-900x432-.jpg)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://res.cloudinary.com/mangacrawlers/image/upload/v1621594815/Mangaback/shinobu-kochou-demon-slayer-wallpaper-1920x540_70.jpg)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://res.cloudinary.com/mangacrawlers/image/upload/v1621594870/Mangaback/ed004b904fad8a61094f993eab787e05.jpg)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://static.fandomspot.com/images/09/8881/00-featured-nier-fantasy-reshade-preview-screenshot.jpg)` }}
                    >
                    </div>
                </div>
                <div className={isPadding ? "slider-item" : "slider-item item2"} >
                    <div className="item"
                        style={{ backgroundImage: `url(https://www.gamerevolution.com/assets/uploads/2021/04/Nier-Replicant-Sequel-Nier-Automata.png)` }}
                    >
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default memo(CarouselHorizontal)