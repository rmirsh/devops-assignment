import { useState } from "react";
import pensil from "../../assets/directions/pensil.svg"
import ModalWindow from "../ModalWindow";
import holidayImg from "../../assets/directions/holiday2.png"
import { motion } from "framer-motion"
import { animation } from "../../animations/animations.tsx"

const OgeHolidayCards = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDirection, setSelectedDirection] = useState<string>('')


    const toggleModal = (d: string) => {
        setIsModalOpen(!isModalOpen);
        setSelectedDirection(d);
    }

    return (
        <div className="oge-holidays">
            <figure className="oge-card-main" aria-labelledby="Карточка подготовки к ОГЭ">
            <div className="routing" id="oge" />
                <motion.div className="oge-front"
                    variants={animation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    exit="hidden">
  
                    <div className="oge-front-left">
                        <img src={pensil} alt="pensil-img" id="pensil-img1" />
                    </div>
                    <div className="oge-front-right">
                        <mark><h3 className="card-front-mainsign">Подготовка к ОГЭ</h3></mark>
                        <span className="card-front-thinsign nowraps">Математика, информатика</span>
                        <div className="card-front-btn">
                            <button className="signup big" onClick={() => toggleModal("Подготовка к ОГЭ")}>Записаться!</button>
                        </div>
                    </div>
                </motion.div>
            </figure>
            <figure className="holiday-card-main" aria-labelledby="Карточка проведения праздников">
            <div className="routing" id="holidays" />
                <motion.div className="holiday-front"
                    variants={animation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.8 }}>
                    <div className="holiday-front-left">
                        <img src={holidayImg} id="holiday-img" alt="holiday-img" />
                    </div>
                    <div className="holiday-front-right" >
                        <mark><h3 className="card-front-mainsign nowrap">Проведение праздников</h3></mark>
                        <span className="card-front-thinsign" >Создадим праздник по Вашим пожеланиям</span>
                        <div className="card-front-btn">
                            <button className="signup big" onClick={() => toggleModal("Проведение праздников")}>Записаться!</button>
                        </div>
                    </div>

                </motion.div>
            </figure>
            {isModalOpen && <ModalWindow onClose={() => toggleModal('')} selectedDirection={selectedDirection} isVisible={true} info={{ name: '', phone: '' }} />}
        </div>
    )
}

export default OgeHolidayCards;