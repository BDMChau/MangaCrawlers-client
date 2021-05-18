import React, { memo, useState } from 'react'
import Slider from 'react-slick';
import "./CarouselVertical.css"

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from 'antd';

function CarouselVertical() {
    const [data, setData] = useState([
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626554/manga_wallpaper/Sousei_no_onmyoji.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626543/manga_wallpaper/Tensei_shitara_Slime.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626535/manga_wallpaper/Solo_leveling.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626495/manga_wallpaper/Attack_on_Titan.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626480/manga_wallpaper/704366.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626509/manga_wallpaper/Fate.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626524/manga_wallpaper/Kimetsu_no_yaiba.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626519/manga_wallpaper/Mushoku_Tensei.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626512/manga_wallpaper/Jujutsu.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626488/manga_wallpaper/Hige_wo_suru.jpg",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626486/manga_wallpaper/Black_clover.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626463/manga_wallpaper/Absolute_dou.png",
        "https://res.cloudinary.com/mangacrawlers/image/upload/v1620626463/manga_wallpaper/Akatsuki_no_yona.jpg"
    ])

    // 10 is data.length when we have real data
    const randomInitSlide = Math.floor((Math.random() * data.length) + 1);

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
        slidesToScroll: 3,
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
        // lazyLoad: true,
        centerMode: false,
        responsive: arrResponsive,

    };

    return (
        <div className="slider-vertical">
            <Slider {...settings}>
                {data.map((img) => (
                    <div className="slider-item">
                        <Image src={img} class="item" alt="" />
                    </div>
                ))}


            </Slider>
        </div>
    )
}

export default memo(CarouselVertical)