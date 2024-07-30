import "../css/ModalWindow.css"
import React, {useState, ChangeEvent, useEffect, useRef} from 'react';
import {motion, useAnimation} from "framer-motion";
import SMSValidation from "./SMSValidation";
import {formatPhone} from "./features/phoneMask.ts";

interface LessonRegistrationModalProps {
    onClose: () => void;
    selectedDirection: string;
    isVisible: boolean;
    info: { name: string, phone: string };
}


const ModalWindow: React.FC<LessonRegistrationModalProps> = ({onClose, selectedDirection, isVisible, info}) => {
    const initialDir: string = selectedDirection;

    const [name, setName] = useState<string>(info.name);
    const [surname, setSurname] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>(info.phone)
    const [selected, setSelected] = useState<string>(initialDir);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isModalFirstVisible, setIsModalFirstVisible] = useState<boolean>(isVisible);
    const [phoneError, setPhoneError] = useState<boolean>(false);

    const inputRefs = useRef<HTMLInputElement | null>(null);
    const options = ["Робототехника", "Программирование", "Разработка игр", "Подготовка к ОГЭ (математика)", "Подготовка к ОГЭ (информатика)", "Проведение праздников"];
    const milliseconds = Date.now();



    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^[А-Яа-яA-Za-z]*$/.test(inputValue)) {
            if (inputValue.length > 30) setName(inputValue.slice(0, 30));
            else setName(inputValue)
        }
    };

    const handleSurNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^[А-Яа-яA-Za-z]*$/.test(inputValue)) {
            if (inputValue.length > 50) setSurname(inputValue.slice(0, 50));
            else setSurname(inputValue)
        }
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value)
        setPhoneNumber(formatted);
    };

    const controls = useAnimation();

    const animateForm = () => {
        setIsModalFirstVisible(false);
        controls.start({x: -400, opacity: 0, transition: {duration: 0.5}});
    };

    const formDataPostFromInput = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            formDataPost()
        }
        if (e.key === 'Backspace') {
            const n = phoneNumber.length;
            if (phoneNumber[n - 1] === '-' || phoneNumber[n - 1] === ')' || phoneNumber[n - 1] === '(') setPhoneNumber(phoneNumber.slice(0, phoneNumber.length - 1))
            if (n === 5) setPhoneNumber('')
        }
    }
    const formDataPost = () => {
        const btn = document.getElementById('form-btn') as HTMLButtonElement;
        const nameInput = document.getElementById('validation-name-closed');
        const surNameInput = document.getElementById('validation-surname-closed');
        const phoneInput = document.getElementById('validation-phone-closed');

        nameInput!.classList.remove('validation-open');
        surNameInput!.classList.remove('validation-open');
        btn!.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
        }, 3000);

        const url = 'https://roboserver.tech/isPhoneValid';

        if (name === "") {
            nameInput!.classList.add('validation-open');
            return
        }
        if (surname === "") {
            surNameInput!.classList.add('validation-open');
            return
        }

        if (phoneNumber.length !== 18 || phoneNumber === '') {
            setPhoneError(false);
            phoneInput!.classList.add('validation-open');
            return
        }
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ phone: phoneNumber }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        setPhoneError(true);
                        phoneInput!.classList.add('validation-open');
                    }
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(responseData => {
                if (responseData) {
                    animateForm();
                    setIsModalFirstVisible(false);
                    return responseData;
                }
            })
            .catch(error => {
                throw error;
            });

    }

    useEffect(() => {
        document.body.classList.add('modal-open');
        inputRefs.current?.focus();

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <motion.div className="modal-overlay" onClick={onClose}>
            <motion.div className="modal" onClick={(e) => e.stopPropagation()} title="Запись на занятие">
                {isModalFirstVisible && <motion.div className="modal-first" animate={controls}>
                    <h3 className="modal-main-sign">Заполните форму для записи на интересующее направление</h3>
                    <div className="inputs">
                        <input type="text" value={name} onChange={handleNameChange} name="name" className="input-field"
                               placeholder="Имя..." ref={inputRefs} aria-label="Введите свое имя" required/>
                        <span id="validation-name-closed" className='input-validation'>Вы не заполнили это поле!</span>
                        <input type="text" value={surname} onChange={handleSurNameChange} name="surname"
                               className="input-field" placeholder="Фамилия..." aria-label="Введите свою фамилию"
                               required/>
                        <span id="validation-surname-closed"
                              className='input-validation'>Вы не заполнили это поле!</span>
                        <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} name="phone"
                               className="input-field" placeholder="Телефон..." required
                               onKeyDown={formDataPostFromInput} aria-label="Введите свой номер телефона"/>
                        <span id="validation-phone-closed"
                              className='input-validation'>{!phoneError ?  "Вы не заполнили это поле!" : "Этот номер уже зарегистрирован"}</span>

                        <div className="dropdown-form">
                            <div className="dropdown-form-btn" onClick={() => setIsActive(!isActive)}>
                                {selected}
                                <span className="fas fa-caret-down"></span>
                            </div>
                            {isActive && (
                                <div className="dropdown-form-content">
                                    {options.map((option) => (
                                        <div
                                            onClick={() => {
                                                setSelected(option);
                                                setIsActive(false);
                                            }}
                                            className="dropdown-form-item"
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>

                            )}
                        </div>
                        <button onClick={formDataPost} className="signup" id="form-btn"
                                title="Записаться на занятие" aria-label="Отправить данные для записи">Записаться
                        </button>
                    </div>
                </motion.div>}
                {!isModalFirstVisible && <SMSValidation onClose={onClose} data={{
                    name,
                    surname, phone: phoneNumber, direction: selected, date: new Date(milliseconds + 3 * 60 * 60 * 1000).toISOString()}}/>}
            </motion.div>
        </motion.div>
    );
};
export default ModalWindow;




