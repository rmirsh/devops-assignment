import {useRef, useState, useEffect} from 'react';
import {motion, AnimatePresence} from "framer-motion";
import "../css/ModalWindow.css"

interface data {
    name: string;
    surname: string,
    phone: string,
    direction: string;
    date: string;
}

interface SMSProps {
    data: data;
    onClose: () => void
}

const SMSValidation: React.FC<SMSProps> = ({onClose, data}) => {
    const [smsContent1, setSmsContent1] = useState<string>("");
    const [smsContent2, setSmsContent2] = useState<string>("");
    const [smsContent3, setSmsContent3] = useState<string>("");
    const [smsContent4, setSmsContent4] = useState<string>("");

    const [unsuccessCount, setUnsuccessCount] = useState<number>(0);
    const [countdown, setCountdown] = useState(50);
    const [isShaking, setIsShaking] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [showFirstDiv, setShowFirstDiv] = useState(true);

    const switchDivs = () => {
        setShowFirstDiv((prev) => !prev);
    };

    const inputRefs = [useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null)];
    const handleInputChange = (index: number, value: string) => {
        const numericValue = value.replace(/[^\d]/g, '');

        // Limit the length of the value based on the index
        const maxLength = index === 3 ? 1 : 2;
        const trimmedValue = numericValue.slice(0, maxLength);

        switch (index) {
            case 0:
                setSmsContent1(trimmedValue);
                break;
            case 1:
                setSmsContent2(trimmedValue);
                break;
            case 2:
                setSmsContent3(trimmedValue);
                break;
            case 3:
                setSmsContent4(trimmedValue);
                break;
            default:
                break;
        }

        // Move focus to the next input if a single character is entered
        if (trimmedValue.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleSubmitFromInput = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') passwordValidation();
        if (e.key === "Backspace") {
            if (index !== 0) {
                setSmsContent4('')
                inputRefs[index - 1].current?.focus();
            } else inputRefs[0].current?.focus();
        }
        return;
    }

    const passwordValidation = () => {
        const code = (smsContent1 + smsContent2 + smsContent3 + smsContent4).trim();
        const url = 'https://roboserver.tech/submitUserData';
        console.log(JSON.stringify({...data, code: code}) + '  отправляемые данные с кодом из смс')
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({...data, code: code}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                console.log(response + ' - респонс с сервера')
                if (response.status === 403) {
                    console.log("c сервера: код неверный")
                    setSmsContent1('')
                    setSmsContent2('')
                    setSmsContent3('')
                    setSmsContent4('')
                    setIsShaking(true);
                    setUnsuccessCount(unsuccessCount + 1)
                    if (unsuccessCount === 2) countdownStart();
                    setTimeout(() => {
                        setIsShaking(false);
                    }, 500);
                    inputRefs[0].current?.focus();

                } else {
                    console.log("c сервера: код верный, все хорошо")
                    setSuccess(true)
                    switchDivs();
                    setTimeout(() => {
                        onClose()
                    }, 5000);
                }
                console.log(response)
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                throw error;
            });
    }

    const passwordValidationAgain = () => {
        const url = 'https://roboserver.tech/isPhoneValid';
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({phone: data.phone}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                throw error;
            });
    }

    useEffect(() => {
        if (inputRefs[0].current) {
            inputRefs[0].current.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const countdownStart = () => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        setTimeout(() => {
            clearInterval(interval);
        }, 50000);
    };

    return (
        <motion.div
            className="modal-second"
            initial={{x: 100, opacity: 0}}
            animate={{x: 0, opacity: 1}}
        >
            <AnimatePresence>
                {showFirstDiv ? (
                    <motion.div className="modal-second-main" key="firstDiv"
                                initial={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: '-100%'}}
                                transition={{duration: 0.5}}>


                        <h3 className="modal-main-sign">Введите код, отправленный на номер
                            ***{data.phone.slice(13)}</h3>
                        <div className={isShaking ? "inputs-div-shaking" : "inputs-div"}>
                            <input
                                className={success ? 'sms-field success' : 'sms-field'}
                                type="tel"
                                value={smsContent1}
                                onChange={(e) => handleInputChange(0, e.target.value)}
                                ref={inputRefs[0]}
                                onKeyDown={(e) => handleSubmitFromInput(e, 0)}
                            />
                            <input
                                className={success ? 'sms-field success' : 'sms-field'}
                                type="tel"
                                value={smsContent2}
                                onChange={(e) => handleInputChange(1, e.target.value)}
                                ref={inputRefs[1]}
                                onKeyDown={(e) => handleSubmitFromInput(e, 1)}
                            />
                            <input
                                className={success ? 'sms-field success' : 'sms-field'}
                                type="tel"
                                value={smsContent3}
                                onChange={(e) => handleInputChange(2, e.target.value)}
                                ref={inputRefs[2]}
                                onKeyDown={(e) => handleSubmitFromInput(e, 2)}
                            />
                            <input
                                className='sms-field'
                                type="tel"
                                value={smsContent4}
                                onChange={(e) => handleInputChange(3, e.target.value)}
                                onKeyDown={(e) => handleSubmitFromInput(e, 3)}
                                ref={inputRefs[3]}
                            />
                        </div>
                        {(countdown < 50 && countdown > 0 && !success) &&
                            <p className='clock-locked'>Отправить SMS повторно через
                                0:{countdown < 10 && "0"}{countdown}</p>
                        }
                        {(countdown === 0 && !success) ?
                            <p className='clock-unlocked' onClick={passwordValidationAgain}>Отправить SMS повторно</p> : ""
                        }

                        <button className="signup" id="form-btn"
                                onClick={passwordValidation}>Записаться
                        </button>
                    </motion.div>
                ) : (
                    <motion.div className="modal-second-success" key="secondDiv"
                                initial={{opacity: 0, x: '100%'}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5}}>
                        <h6 id='success-sign'>Вы успешно зарегистрировались!</h6>
                        <button className="signup" id="form-btn" onClick={onClose}>Отлично!</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
};

export default SMSValidation;

