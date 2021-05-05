import { Button, Col, Dropdown, Image, Menu, Row } from 'antd'
import React, { useState } from 'react'
import LazyLoad from 'react-lazyload';
import "./Chapter.css"

export default function Chapter() {
    const [data, setData] = useState([
        "https://cm.blazefast.co/aa/c2/aac2a2b3db4c8f033f830730eff89c58.jpg",
        "https://cm.blazefast.co/7f/9a/7f9aec32c3273dcc2430a2d1bbea478c.jpg",
        "https://cm.blazefast.co/b9/fb/b9fbb989c7be8fb6f5f901bc78733b21.jpg",
        "https://cm.blazefast.co/f5/53/f5539dc4d7fb0387eeb68e0b6487fb70.jpg",
        "https://cm.blazefast.co/23/e0/23e0ae8d7dd414c7a6ac83df18cd153a.jpg",
        "https://cm.blazefast.co/35/27/352797530402300c71cd413beeab92c6.jpg",
        "https://cm.blazefast.co/8a/fa/8afabb35e76b0e3917cdf0e0ca29ae1c.jpg",
        "https://cm.blazefast.co/b0/ba/b0ba715f7094045acab90043222ff9cb.jpg",
        "https://cm.blazefast.co/99/58/99587bda891d96b43888420b0f2d3421.jpg",
        "https://cm.blazefast.co/e1/5b/e15b70dc1ca1a85ac540fc0fbca0d854.jpg",
        "https://cm.blazefast.co/a0/d7/a0d7c6fc410c2d32e22729474b17d896.jpg",
        "https://cm.blazefast.co/b9/c8/b9c83e985ca093c6ee38e16499f062a4.jpg",
        "https://cm.blazefast.co/f6/30/f630b3f0908f7b99be4b0eac8f9f44d7.jpg",
        "https://cm.blazefast.co/ec/d5/ecd54f1a4660abf779dbb20fd86385c3.jpg",
        "https://cm.blazefast.co/36/7f/367f895fdc3455724b491a9feeb21a7d.jpg",
        "https://cm.blazefast.co/37/37/37372045b39d64cf15c34896f4f14c9f.jpg",
        "https://cm.blazefast.co/97/3c/973c70543582aad3a31a8cb95789675e.jpg",
        "https://cm.blazefast.co/49/85/49857201484441f50d9f3cc77681f23a.jpg",
        "https://cm.blazefast.co/a9/f7/a9f7bfb3e1a0bf4334d95a9eb85e1095.jpg",
        "https://cm.blazefast.co/ce/39/ce394e6485630cb102f82527152c5fc8.jpg",
        "https://cm.blazefast.co/cd/3d/cd3dda38b170f31db283f1bc364aa7b0.jpg",
        "https://cm.blazefast.co/2c/84/2c84a7e63dc73df3f2866a08d53bb786.jpg",
        "https://cm.blazefast.co/72/48/7248e7e1672016f52b33d30a2b1448b1.jpg",
        "https://cm.blazefast.co/67/8b/678b2ae7a2d12b247cab4f8f6ab19a7c.jpg",
        "https://cm.blazefast.co/e3/cc/e3cc3d3ce7af498cad8c3f8311281677.jpg",
        "https://cm.blazefast.co/dc/9f/dc9f553b2242e895e40069775a5cdbf6.jpg",
        "https://cm.blazefast.co/d4/20/d42001fef1c624711eac908cd4f3bbae.jpg",
        "https://cm.blazefast.co/a4/36/a4360cdeaae3d2de05844f7ed4541bc0.jpg",
        "https://cm.blazefast.co/91/2b/912b346fa73e675840d40b7fe86ef640.jpg",
        "https://cm.blazefast.co/de/22/de2290e798ce6d3419d435c9b617ae9f.jpg",
        "https://cm.blazefast.co/5a/c5/5ac5bbf28cb66f643a68a7162f285214.jpg",
        "https://cm.blazefast.co/1a/5d/1a5d1a20b196807608de218624a886ee.jpg",
        "https://cm.blazefast.co/34/70/3470233a6d4b3a9699b9ea41a6e23916.jpg",
        "https://cm.blazefast.co/df/18/df18285f1c3f2e059fc3fecd0230d3b1.jpg",
        "https://cm.blazefast.co/45/f0/45f0868e86e694fe654f2a05fa81dfad.jpg",
        "https://cm.blazefast.co/50/1a/501ac5f4d54cefb30ffca015c0fced7c.jpg",
        "https://cm.blazefast.co/8f/57/8f57d17cba6ce9101cf303028e708dc2.jpg",
        "https://cm.blazefast.co/28/1b/281b2745826014cc2f3f7837e9c1e6fa.jpg",
        "https://cm.blazefast.co/e6/79/e6795c055e6223fcfb0ff3a1c6fcada0.jpg",
        "https://cm.blazefast.co/bc/97/bc978b5e05f887cee870b2b1923f488b.jpg",
        "https://cm.blazefast.co/7a/4f/7a4f9c0acfef1c8c5b13c322c2619b17.jpg",
        "https://cm.blazefast.co/dd/52/dd527966b914466eb4663a3be559d6d2.jpg",
        "https://cm.blazefast.co/2c/f3/2cf343c19187a25ac7e27467ff3040d7.jpg",
        "https://cm.blazefast.co/39/a9/39a92ab691401397d52da0b5a301c07d.jpg",
    ])

    const Spinner = () => (
        <div className="post loading">
            <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#49d1e0"
                    strokeWidth="10"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(275.845 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        calcMode="linear"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );

    return (
        <Row justify={"center"} className="chapter">

            <Col span={23} xxl={14} className="chapter-pages">
                {data.map((item, id) => (
                    <div className="page" id={`page_${id}`}>
                        <LazyLoad
                            key={id}
                            height={100}
                            placeholder={<Spinner />}
                        >
                            <Image className="img" id={id} src={item} alt="" />
                        </LazyLoad>

                    </div>
                ))}
            </Col>
        </Row>
    )
}
