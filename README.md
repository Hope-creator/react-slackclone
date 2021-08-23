# React Slack Clone

## Live Demo
Может запускаться в течении минуты\
`https://slack-clone-hope-creator.herokuapp.com/`

Тестовый аккаунт: \
Login: `Test@mail.com`\
Password: `Test@123`

###### Реализованный функционал
### Frontend:
* Страница логина и регистрации, регистрация реализована через отправку ссылки на почту. Пользователь может использовать полный функционал сайта без подтверждения почты.
* Весь остальной функционал реализовал на одной странице. При смене роутов меняется лишь центральная часть приложения (workspace).
 
Функционал частично скопирован с веб приложения slack. Самым главным отличием от slack является невозможность создавать разные компании, по сути компания в копированном варианте одна на всех пользователей.  

По аналогии со slack приложение условно разделено на 3 части, левая часть sidebar отвечает за навигацию, центральная часть workspace отвечает за обрабатывание всех роутов, правая часть sidebar может показывать информацию канала или пользователя.

Реализован функционал:
* Сохранения сообщений в saved items.
* Непрочитанные сообщения от пользователей в unreads.
* Все диалоги со всеми пользователями в all dialogs.
* Просмотр всех каналов компании в channel browser.
* Просмотр всех пользователей компании в people & user groups или же в members в pop-up меню кнопки компании.
* Общие и приватные каналы и их создание и редактирование, а так же появление и удаление каналов в real-time с помощью socket.io
* Появление новых пользователей компании и диалогов с ними, а так же их актуальный статус (в сети/ недоступен / не в сети) в real-time.
* Все сообщения во всех диалогах и каналах также в real-time, также в реальном времени обрабатывается удаление сообщения или же выхода пользователя из канала 
* Добавление и просмотр пользователей состоящих в канале.
* Профиль пользователя, его изменения и установку аватара.
* В сообщениях могут быть прикреплены картинки.

Все загружаемые каналы, пользователи, сообщения используют пагинацию. В просмотре пользователей канала был реализован react-window.

Адаптивная верстка.

### Backend:  
Все контроллеры реализованы по REST API для всех страниц фронтенда.  
Загрузка всех файлов использует multer и загружает все файлы сначала на cloudinary, а потом записыват ссылку с cloudinary в базу.

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
* Redux-saga
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
