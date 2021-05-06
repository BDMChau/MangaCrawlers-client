import React from "react";
import "./CarouselHorizontal.css";
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarouselHorizontal() {

    // 10 is data.length when we have real data
    const randomInitSlide = Math.floor((Math.random() * 10) + 1);

    const arrResponsive = [{
        breakpoint: 1400,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }];



    const settings = {
        className: "slider",
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: randomInitSlide,
        vertical: false,
        dots: false,
        draggable: true,
        fade: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        swipeToSlide: true,
        lazyLoad: true,
        centerMode: true,
        responsive: arrResponsive
    };


    return (
        <div className="slider-horizontal">
            <Slider {...settings}>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://steamuserimages-a.akamaihd.net/ugc/170415012791203577/5777EB01F742E9BFE19B56AA3EAFA9C8F3085335/)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://news.gearvn.com/wp-content/uploads/2020/06/Gearvn_-Nier-Automata_-7-1024x567.jpg)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://imgix.kotaku.com.au/content/uploads/sites/3/2021/04/23/ihueqnelaahslncmwjpp.jpg?ar=16%3A9&auto=format&fit=crop&q=65&w=1280)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://2.bp.blogspot.com/-cvHyJJCS_II/WpB-AgiI1mI/AAAAAAAAMLI/f9pJOO0nEho7LA-7dKa0rHmXY9R8WdHQgCLcBGAs/s1600/thumb-1920-819005.jpg)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://static.fandomspot.com/images/09/8881/00-featured-nier-fantasy-reshade-preview-screenshot.jpg)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2021/01/nierautomata-1280-1-1488398963732-640x360.jpg)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://static.fandomspot.com/images/09/8881/00-featured-nier-fantasy-reshade-preview-screenshot.jpg)` }}
                    >
                    </div>
                </div>
                <div className="slider-item">
                    <div className="item"
                        style={{ backgroundImage: `url(https://www.gamerevolution.com/assets/uploads/2021/04/Nier-Replicant-Sequel-Nier-Automata.png)` }}
                    >
                    </div>
                </div>
            </Slider>
        </div>
    );
}