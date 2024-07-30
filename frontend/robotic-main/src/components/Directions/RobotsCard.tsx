
import robotHead from "../../assets/directions/0001 2.svg"
import robotBody from "../../assets/directions/Group 23.svg";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import closeIcon from "../../assets/directions/add.svg"
import leftman from "../../assets/directions/3monthman.svg"
import rightman from "../../assets/directions/6monthman.svg"
import ModalWindow from "../ModalWindow";
import { animation } from "../../animations/animations.tsx"

const RobotsCard = () => {

    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [textId, setTextId] = useState<number>(0);
    const [threeBtnActive, setThreeBtnActive] = useState<boolean>(false);
    const [sixBtnActive, setSixBtnActive] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const texts = ['Хотите научиться создавать и программировать своих собственных роботов? Тогда наши курсы по робототехнике идеально подойдут для вас! Наши занятия проводятся в небольших группах, а полный курс рассчитан на 9 месяцев.',
        'Ваш ребёнок хочет сделать первые шаги в робототехнике? Наш базовый курс познакомит его с основами, за 3 месяца мы изучим основы сборки и программирования, а также основные инструменты взаимодействия с роботами.',
        'Ваш ребёнок с роботами на "Ты"? Продвинутый курс предназначен для тех, кто уже изучил основы и готов двигаться дальше. В программе сборка впечатляющих механизмов, а также углублённое изучение программной части робота.'
    ];

    const handleFlip = useCallback(() => {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(!isAnimating);
            setSixBtnActive(false);
            setThreeBtnActive(false);
            setTextId(0);
        }
    }, [isAnimating, isFlipped]);

    const threeHandle = useCallback(() => {
        setTextId(1);
        setThreeBtnActive(true);
        setSixBtnActive(false);
    }, []);

    const sixHandle = useCallback(() => {
        setTextId(2);
        setSixBtnActive(true);
        setThreeBtnActive(false);
    }, []);

    return (
        <div className="robot-super-main">
                     <div className="routing" id="robototechnics" />
            <motion.figure className="robot-dir-main" aria-labelledby="Карточка робототехники"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 360 }}
                transition={{ duration: 0.6, animationDirection: "normal" }}
                onAnimationComplete={() => setIsAnimating(false)} >
   
                <motion.div className="robot-dir1"
                    variants={animation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}>
                    <div className="robot-dir-left">
                        <mark><h3 className="directions-sign" id="robot-dir-left-sign">Робототехника</h3></mark>
                        <p className="directions-sign" id="robot-dir-left-thin">Научим Вашего ребенка работать с роботами</p>
                        <div className="robot-dir-left-buttons">
                            <button className="signup" onClick={toggleModal} >Записаться!</button>
                            <button className="more" onClick={handleFlip}>Подробнее</button>
                            <span className="directions-sign" id="robot-dir-right-age">4-16 лет</span>
                        </div>
                    </div>
                    <div className="robot-dir-mid">
                        <img src={robotHead} id="robothead" alt="robot-head" />
                        <img src={robotBody} id="robotbody" alt="robot-body" />
                    </div>
                    <div className="robot-dir-right" >
                        <div className="robot-dir-right-list">

                            <h5 className="directions-sign" id="robot-dir-right-ul">Работа с роботами:</h5>
                            <ul>
                                <li><span className="li">Развивает мышление</span> </li>
                                <li><span className="li">Развивает мелкую моторику</span> </li>
                                <li ><span className="li"  >Помогает понять базу IT</span> </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <div className="robot-dir2" >
                    <div className="robot-dir-flipped" >
                        <h3 className="directions-sign" id="robot-dir-flipped-main" >Робототехника</h3>
                        <span className="directions-sign" id="robot-dir-flipped-thin">{texts[textId]}</span>
                        <div className="robot-dir-flipped-buttons">
                            {threeBtnActive && <img src={leftman} id="leftman" loading="lazy" />}
                            <button className={threeBtnActive ? "flipped-btn-active" : "flipped-btn"} onClick={threeHandle}>3 месяца (Базовый курс)</button>
                            {sixBtnActive && <img src={rightman} alt="" id="rightman" loading="lazy" />}
                            <button className={sixBtnActive ? "flipped-btn-active" : "flipped-btn"} onClick={sixHandle}>6 месяцев (Продвинутый курс)</button>
                        </div>
                        <button onClick={handleFlip} className="close-icon"><img src={closeIcon} alt="close" className="close-icon" /></button>
                    </div>

                </div>
            </motion.figure>
            {isModalOpen && <ModalWindow onClose={toggleModal} selectedDirection="Робототехника" isVisible={true} info={{ name: '', phone: '' }} />}
        </div>
    )
}

export default RobotsCard;