# React Slack Clone Demo

## Live Demo
Может запускаться в течении минуты\
`https://slack-clone-hope-creator.herokuapp.com/`

## Stack

Backend:
* NodeJS
* TypeScript
* Express
* Mongoose
* Multer
* Nodemailer
* Socket.io
* JWT
* Cloudinary
* Cookie-Session

Frontend:
* ReactJS
* TypeScript
* Redux
* Redux/Toolkit
* React Router
* Axios
* Material UI
* date-fns
* React Hook Form
* react-window/infinite-loader

## Установка

1. `yarn` в корневой папке проекта
2. `yarn build` в корневой папке проекта
3. установить и запустить MongoDB
4. создать файл `.env` и заполнить его по шаблону, указанному в `.env.example`
5. в папке backend выполнить `yarn dev` или `yarn nodemon`

## Получение письма подтверждения
Для работы с почтой в данном проекте используется библиотека nodemailer. Подтверждения письма в целом ни на что не влияет, лишь на поле accepted пользователя. Возможно указать свой SMTP-сервер, для локального запуска и фейк отправки используется сервис mailtrap.io

Для использования сервиса: 
1. Необходимо зарегистрироваться на mailtrap.io
2. Войта в аккакту
3. Перейти по ссылке mailtrap.io/inboxes
4. Выбрать My Inbox
5. В поле Integrations выбрать NodeJS/Nodemailer
6. Запонлить файл `.env` с данными согласно экземпляру в `.env.example`

## Загрузка файлов на Cloudinary
Для хранения изображения был использован сервис Cloudinary.
Для корректного запуска проекта необходимо зарегестрироваться на сайте cloudinary.com
Перейти в Dashboard и скопировать API-параметры. Данные параметры записать в `.env` согласно экземпляру в `.env.example`

![screen](https://user-images.githubusercontent.com/72225013/127026279-629aee3b-0eda-4c34-af24-aeb75fe74444.png)
