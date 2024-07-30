import {motion} from "framer-motion";
import {useState} from "react";
import comp from "../../assets/directions/computer.svg"
import closeIcon from "../../assets/directions/add.svg"
import gamepad from "../../assets/directions/gamepad.png"
import ModalWindow from "../ModalWindow";
import {animation} from "../../animations/animations.tsx"

const ProgramCard = () => {

    const [isFlippedPr, setIsFlippedPr] = useState<boolean>(false);
    const [isAnimatingPr, setIsAnimatingPr] = useState<boolean>(false);
    const [isFlippedGm, setIsFlippedGm] = useState<boolean>(false);
    const [isAnimatingGm, setIsAnimatingGm] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDirection, setSelectedDirection] = useState<string>('')


    const toggleModal = (d: string) => {
        setIsModalOpen(!isModalOpen);
        setSelectedDirection(d);
    }

    function handleFlipPr() {
        if (!isAnimatingPr) {
            setIsFlippedPr(!isFlippedPr);
            setIsAnimatingPr(!isAnimatingPr);
        }
    }

    function handleFlipGm() {
        if (!isAnimatingGm) {
            setIsFlippedGm(!isFlippedGm);
            setIsAnimatingGm(!isAnimatingGm);
        }
    }

    return (
        <div className="programming-gamedev">
            <motion.figure className="program-card-main" aria-labelledby="Карточка программирования"
                           initial={false}
                           animate={{rotateY: isFlippedPr ? 180 : 360}}
                           transition={{duration: 0.6, animationDirection: "normal"}}
                           onAnimationComplete={() => setIsAnimatingPr(false)}>

                <div className="routing" id="programming"/>
                <motion.div className={isFlippedPr ? "program-front close" : "program-front"}
                            variants={animation}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.2}}
                            transition={{duration: 0.8}}>
                    <div className="program-front-left">
                        <img src={comp} alt="computer" id="computer-img"/>
                    </div>
                    <div className="program-front-right">
                        <mark><h3 className="card-front-mainsign">Программирование</h3></mark>
                        <span className="card-front-thinsign">Научим Вашего ребенка основам различных языков</span>
                        <div className="card-front-btn">
                            <button className="signup smallw"
                                    onClick={() => toggleModal("Программирование")}>Записаться!
                            </button>
                            <button className="more smallw" onClick={handleFlipPr}>Подробнее</button>
                        </div>
                        <span className="card-front-mainsign age">12-18 лет</span>
                    </div>
                </motion.div>

                <div className="program-back">
                    <p className="card-back-sign">В основе курса лежит изучение таких языков программирования как Java,
                        C#,
                        HTML и CSS, основы вёрстки и FRONTEND-разработки. Курс рассчитан на 2 года, затрагивает разные
                        направления
                        программирования и даёт ребёнку полное понимание того, чем ему интересно занимать в сфере
                        IT.</p>
                    <button className="close-icon" onClick={handleFlipPr}><img src={closeIcon} className="close-icon"
                                                        alt="close"/></button>
                </div>
            </motion.figure>

            <motion.figure className="game-card-main" aria-labelledby="Карточка разработки игр"
                           initial={false}
                           animate={{rotateY: isFlippedGm ? 180 : 360}}
                           transition={{duration: 0.6, animationDirection: "normal"}}
                           onAnimationComplete={() => setIsAnimatingGm(false)}>
                <div className="routing" id="gamedevelop"/>
                <motion.div className="game-front"
                            variants={animation}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.2}}
                            transition={{duration: 0.8}}>
                    <div className="game-front-left">
                        <img src={gamepad} alt="minecraft" id="minecr-img"/>
                    </div>
                    <div className="game-front-right">
                        <mark><h3 className="card-front-mainsign">Разработка игр</h3></mark>
                        <span className="card-front-thinsign">Научим Вашего ребенка создавать игры на Unity</span>
                        <div className="card-front-btn">
                            <button className="signup smallw"
                                    onClick={() => toggleModal("Разработка игр")}>Записаться!
                            </button>
                            <button className="more smallw" onClick={handleFlipGm}>Подробнее</button>
                        </div>
                        <span className="card-front-mainsign age">12-18 лет</span>
                    </div>
                </motion.div>

                <div className="game-back">
                    <p className="card-back-sign">Разработка игр - одно из самых перспективных направлений в сфере IT.
                        Если Ваш ребёнок - творческая личность, то это направление идеально ему подойдёт. Курс обучения
                        2 года и включает в себя всё, начиная с азов программирования и до создания полноценных 2D и 3D
                        проектов</p>
                    <button className="close-icon" onClick={handleFlipGm}><img src={closeIcon} className="close-icon"
                                                        alt="close"/></button>
                </div>
            </motion.figure>
            {isModalOpen &&
                <ModalWindow onClose={() => toggleModal('')} selectedDirection={selectedDirection} isVisible={true}
                             info={{name: '', phone: ''}}/>}
        </div>
    )
}

export default ProgramCard;