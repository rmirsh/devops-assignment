package com.example.app1;

import com.example.app1.*;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.Optional;
import java.util.Properties;
import java.util.Random;

@Service
public class WebService {

    private final CodeRepository codeRepository;
    private final UserRepository userRepository;

    @Autowired
    public WebService(UserRepository userRepository, CodeRepository codeRepository) {
        this.userRepository = userRepository;
        this.codeRepository = codeRepository;}

    public boolean isNumberExists(String phone) {return userRepository.existsById(phone);}

    public void saveUser(User user) {userRepository.save(user);}

    public void saveNumber(String phone, int code) {
        Cod userInfo = new Cod();
        userInfo.setPhone(phone);
        userInfo.setCode(code);
        codeRepository.save(userInfo);
    }

    public Optional<Cod> getCode(String phone){
        return codeRepository.findById(phone);
    }

    public static int getRandomCode(){
        Random random = new Random();
        int min = 1000;
        int max = 9999;
        return random.nextInt((max - min) + 1) + min;
    }
    public static String buildMessageSubmit(String name, String surname, String phone, String direction){
        return "Имя: " + name + "\nФамилия: " + surname + "\nНомер телефона: " + phone + "\nИнтересующее направление: " + direction;
    }

    public static void sendVerification(int code, String  phone) throws Exception {
        String url = "https://ayupovkamil%40gmail.com:zI3SEJijoecBtXxsgxl6L10u-SnZNaP7@gate.smsaero.ru/v2/sms/send?number=" + phone + "&text=Ваш код для сайта robotick.ru: " + code + "&sign=SMS%20Aero";
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        System.setProperty("webdriver.chrome.driver", "usr/local/bin/chromedriver");
        WebDriver driver = new ChromeDriver(options);
        driver.get(url);
        driver.quit();
    }
    public static void sendEmail(String subject, String message) throws Exception {
        // Настройки для подключения к серверу SMTP
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.mail.ru");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        // Адрес отправителя и пароль
        final String username = "technorobotikkrd@mail.ru";
        String to = "e.mila-23@mail.ru";
        String password = "k9urWFJkkK5xhMDgHV2q";
        // Создание сессии для отправки сообщения
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        // Создание сообщения
        MimeMessage emailMessage = new MimeMessage(session);
        emailMessage.setFrom(new InternetAddress(username));
        emailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
        emailMessage.setSubject(subject);
        emailMessage.setText(message);
        Transport.send(emailMessage);
    }
}
