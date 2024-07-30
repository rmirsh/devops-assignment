import "../css/About.css"
import { useQuery } from 'react-query';
import bg from "../assets/about/bg.svg";
import bgsmall from "../assets/about/bgsmall.svg";
import legoCard from "../assets/about/legoCard.svg"
import htmlCard from "../assets/about/htmlCard.svg"
import javaCard from "../assets/about/javaCard.svg"
import pythonCard from "../assets/about/pythonCard.svg"
import cplusCard from "../assets/about/cplusCard1.svg"
import cshCard from "../assets/about/cshCard.svg"
import unityCard from "../assets/about/unityCard.svg";
import gamedev from "../assets/about/gamedev.svg"
import modeling from "../assets/about/3D.svg"
import websites from "../assets/about/websites.svg"
import programming from "../assets/about/programming.svg"
import robots from "../assets/about/robots.svg"
import { animationDir, hrAnimation, animationDirReversed } from '../animations/animations.tsx';
import { motion } from "framer-motion"

const loadImage = async (src: string) => {
    const response = await fetch(src);
    const data = await response.blob();
    return URL.createObjectURL(data);
  };

const About = () => {

    const { data: bgData } = useQuery('about-bg-w', () => loadImage(bg));
    const { data: bgsmallData } = useQuery('about-bg', () => loadImage(bgsmall));

    return (
        <section className="about" aria-labelledby="Секция О нас">
            <div className="routing" id="about"></div>
            <div className="container-main">
                <div className="images-bg" aria-hidden="true">
                    <picture>
                    <source media="(min-width: 1440px)" srcSet={bgData} id="about-bg-w"/>
                    <source media="(min-width: 768px)" srcSet={bgData} id="about-bg-w"/>
                    <img src={bgsmallData} id="about-bg" alt=""/>
                    </picture>
                </div>

                <h4 className="main-sign-about">Добро пожаловать в Роботик — ваш ключ к захватывающему миру технологий и творчества!{<br />}{<br />}

                    Открывайте для себя веселое программирование, захватывающие проекты и уникальные курсы, которые не только раскроют ваши таланты, но и повысят успеваемость в школе!
                    Превратите свою любовь к технике в потрясающий опыт обучения с Роботик— где будущее начинается сегодня!
                </h4>
                <h6 className="main-sign-about" id="span-hashtags">#Роботик #Технотворчество #ПрограммированиеДляДетей</h6>
                <h3 className="main-sign-about" id="span-education">ПРОГРАММА ОБУЧЕНИЯ</h3>

                <motion.div className="line"
                    variants={hrAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.9 }} />
                <motion.div className="cards-directions"
                    variants={animationDir}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.9 }} 
                     >
                <h1 className="main-sign-about" id="span-program">НАПРАВЛЕНИЯ ДЛЯ ИЗУЧЕНИЯ</h1>
                    <div className="upper-line">
                        <img src={legoCard} className="directions-item" alt="лего"/>
                        <img src={htmlCard} alt="html" className="directions-item" />
                        <img src={javaCard} alt="java" className="directions-item" />
                    </div>
                    <div className="down-line">
                        <img src={pythonCard} alt="python" className="directions-item" id="python" />
                        <img src={cplusCard} className="directions-item" alt="c++"/>
                        <img src={cshCard} className="directions-item" id="csharp" alt="c#"/>
                        <img src={unityCard} className="directions-item" id="unity" alt="unity"/>
                    </div>
                </motion.div>

                <motion.div className="cards-education"
                    variants={animationDirReversed}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.9, delay: 0.1}} 
                    >
                    <h1 className="main-sign-about" id="span-directions">ЧЕМУ МЫ ОБУЧАЕМ</h1>
                    <div className="down-directions">
                        <img src={programming} alt="programming" className="down-directions-item" />
                        <img src={robots} alt="robototechnics" className="down-directions-item" />
                    </div>
                    <div className="upper-directions">
                        <img src={modeling} alt="3dmodeling" className="down-directions-item grid" />
                        <img src={websites} alt="websites" className="down-directions-item"/>
                        <img src={gamedev} alt="gamedev" className="down-directions-item grid" id="gamedev"/>
                    </div>
                </motion.div>
            </div>
        </section >
    )
}

export default About;