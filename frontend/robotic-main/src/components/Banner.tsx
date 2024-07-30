import rs from '../assets/Heads/lastRs.webp';
import { useQuery } from 'react-query';
import ls from '../assets/Heads/lastLs.svg';
import robotL from '../assets/Heads/robot-banner-l.svg';
import robotR from '../assets/Heads/robot-banner-r.svg';
import 'react-dom'
import "../css/NavbarBanner.css"
import { downAnimation } from '../animations/animations';
import { leftAnimation } from '../animations/animations';
import { motion as m } from 'framer-motion'

const loadImage = async (src: string) => {
    const response = await fetch(src);
    const data = await response.blob();
    return URL.createObjectURL(data);
};

const Banner = () => {
    const { data: lsData } = useQuery('ls', () => loadImage(ls));

    return (
        <section className="banner-main" aria-labelledby="Главный баннер 'Роботик'">
            <div className="home-routing"></div>
            <div className="banner">
                <div className="marquee">
                    <div className="marquee__content">
                        <ul className="list-inline">
                            <li><img src={rs} alt="" id='rs' /></li>
                        </ul>
                        <ul className="list-inline">
                            <li><img src={rs} alt="" id='rs' /></li>
                        </ul>
                        <ul className="list-inline">
                            <li><img src={rs} alt="" id='rs' /></li>
                        </ul>

                    </div>
                </div>
                <div className="marquee2">
                    <div className="marquee2__content">
                        <ul className="list-inline">
                            <li><img src={lsData} alt="" id='ls' /></li>
                        </ul>
                        <ul className="list-inline">
                            <li><img src={lsData} alt="" id='ls' /></li>
                        </ul>
                        <ul className="list-inline">
                            <li><img src={lsData} alt="" id='ls' /></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-main">

                <div className="down-banner">
                    <m.div className="banner-text" variants={leftAnimation} initial="hidden" whileInView="visible">
                        <h4 className='banner-text-bold'>в Краснодаре</h4>
                        <span className='banner-text-sign'>Влюбляемся в IT профессии, повышаем успеваемость в школе и учимся по-новому взаимодействовать с гаджетами</span>
                    </m.div>
                    <m.div className="robots" variants={downAnimation} initial="hidden" animate="visible" >
                        <m.img src={robotL} id='robotL' alt="robot1"/>
                        <m.img src={robotR} id='robotR' alt="robot2"/>
                    </m.div>
                </div>
            </div>


        </section>
    )
}

export default Banner;