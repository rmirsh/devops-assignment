import "../css/PlusesAndFooter.css"
import tg from "../assets/footer/Telegram.svg"
import vk from "../assets/footer/Vk.svg"
import ws from "../assets/footer/Whatsapp.svg"
import React, {ChangeEvent, useState} from "react"
import ModalWindow from "./ModalWindow.tsx"
import {Link} from 'react-router-dom';
import {animationFooter} from '../animations/animations.tsx';
import {motion} from "framer-motion"
import logoonly from '../assets/footer/logotextdown.svg'
import {formatPhone} from "./features/phoneMask.ts";

const Footer = () => {

    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [isSMS, setIsSMS] = useState<boolean>(false)
    const [phoneError, setPhoneError] = useState<boolean>(false);

    const toggleModal = () => {
        setIsSMS(!isSMS);
        setName('')
        setPhone('')
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (/^[А-Яа-яA-Za-z]*$/.test(inputValue)) {
            if (inputValue.length > 30) {
                setName(inputValue.slice(0, 30));
            } else setName(inputValue)
        }
    }

    const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value)
        setPhone(formatted)
    }

    const submitFromInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitForm();
        }
        if (e.key === 'Backspace') {
            const n = phone.length;
            if (['-', ')', '('].includes(phone[n - 1])) setPhone(phone.slice(0, n - 1))
            if (n === 5) setPhone('')
        }
    }

    const submitForm = () => {
        const url = 'https://slrserver.tech/isPhoneValid';
        const btn = document.getElementById('form-btn-footer') as HTMLButtonElement;
        const nameInput = document.getElementById('footer-validation-name-closed');
        const phoneInput = document.getElementById('footer-validation-phone-closed');
        nameInput!.classList.remove('footer-validation-open')

        btn!.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
        }, 3000);
        if (name === "") {
            nameInput!.classList.add('footer-validation-open')
            return;
        }
        if (phone.length !== 18) {
            setPhoneError(false)
            phoneInput!.classList.add('footer-validation-open')
            return;
        }

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({phone: phone}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        phoneInput!.classList.add('footer-validation-open')
                        setPhoneError(true);
                    }
                    return
                }
                return response;
            })
            .then(responseData => {
                if (responseData) {
                    setIsSMS(true)
                    setName('');
                    setPhone('');
                    return responseData;
                }
            })
            .catch(error => {
                throw error;
            });
    }


    return (

        <section className="footer" aria-labelledby="Футер сайта">
            <div className="container-main">
                <motion.div className="call-form"
                            variants={animationFooter}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.2}}
                            transition={{duration: 0.9}}>
                    <div className="call-form-text">
                        <h6 className="call-form-header">Не знаете, с чего начать?</h6>
                        <span
                            className="call-form-desc">Подберем оптимальную форму обучения исходя из ваших пожеланий</span>
                    </div>
                    <div className="form-div">
                        <form method="post" action="">
                            <div className="validation-div">

                            <input type="text" placeholder="Имя..." name="name" className="form-input" value={name}
                                   onChange={handleChangeName} onKeyDown={submitFromInput}
                                   aria-label="Введите ваше имя"/>
                            <span id="footer-validation-name-closed"
                                  className='footer-input-validation'>Вы не заполнили это поле!</span>
                            </div>
                            <div className="validation-div">

                            <input type="tel" placeholder="Телефон..." name="phone" className="form-input"
                                   value={phone} onChange={handleChangePhone} onKeyDown={submitFromInput}
                                   aria-label="Введите ваш номер телефона"/>
                            <span id="footer-validation-phone-closed"
                                  className='footer-input-validation'>{!phoneError ? "Вы не заполнили это поле!" : "Этот номер уже зарегистрирован"}</span>
                            </div>
                            <input type="button" value="Заказать звонок" className="form-btn" onClick={submitForm}
                                   title="Отправить запрос на звонок" aria-label="Отправить запрос на звонок" id={"form-btn-footer"}/>
                        </form>
                        <p className="politicy-span" id="contacts">Нажимая на кнопку, вы соглашаетесь с <a
                            href="/privacy">обработкой персональных данных</a></p>
                    </div>
                </motion.div>
                <motion.div className="call-form cont"
                            variants={animationFooter}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.2}}
                            transition={{duration: 0.9}}>
                    <div className="contacts-div">
                        <mark><h6 className="contacts-text">ул. Героя Пешкова, 14</h6></mark>
                        <mark><h6 className="contacts-text phone">+7 (918) - 123 - 05 - 93</h6></mark>
                    </div>
                    <div className="icons-footer">
                        <a href="https://t.me/ROBOTIKKRD_BOT" target="_blank"><img src={tg} alt="telegram"
                                                                                   className="social-icon"
                                                                                   loading="lazy"
                                                                                   rel="noopener noreferrer"
                                                                                   aria-label="Телеграмм-бот"/></a>
                        <a href="https://vk.com/club224483268" target="_blank"><img src={vk} alt="vkontakte" className="social-icon" loading="lazy"
                                                         rel="noopener noreferrer" aria-label="Группа Вконтакте"/></a>
                        <a href="#" target="_blank"><img src={ws} alt="whatsapp" className="social-icon" loading="lazy"
                                                         rel="noopener noreferrer" aria-label="WhatsApp"/></a>
                    </div>

                </motion.div>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Adc36c1edc98ca4d8d885ab666600305f1cbb4df8e201b23de0efbc24cf7e4e1e&amp;source=constructor;theme=light"
                    width="940" height="271" loading="lazy" title="yandex-map"/>

                <footer className="footer-info">
                    <a href="/public" id="logo-a"><img src={logoonly} alt="logo" id="logo-footer" loading="lazy"/></a>
                    <div className="socials">
                        <a href="https://t.me/ROBOTIKKRD_BOT" target="_blank"><img src={tg} alt=""
                                                                                   className="social-icon"
                                                                                   loading="lazy"
                                                                                   rel="noopener noreferrer"
                                                                                   aria-label="Телеграмм-бот"/></a>
                        <a href="https://vk.com/club224483268" target="_blank"><img src={vk} alt="" className="social-icon" loading="lazy"
                                                         rel="noopener noreferrer" aria-label="Группа Вконтакте"/></a>
                        <a href="#" target="_blank"> <img src={ws} alt="" className="social-icon" loading="lazy"
                                                          rel="noopener noreferrer" aria-label="WhatsApp"/></a>
                    </div>
                    <div className="documents">
                        <Link to="/privacy#privacy" className="doc-text">Политика конфиденциальности </Link>
                        <Link to="/privacy#agreement" className="doc-text">
                            Пользовательское соглашение
                        </Link>

                    </div>
                </footer>
            </div>
            {isSMS && <ModalWindow onClose={() => toggleModal()} selectedDirection="Консультация" isVisible={false}
                                   info={{name, phone}}/>}
        </section>
    )
}

export default Footer;