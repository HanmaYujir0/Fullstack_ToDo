const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
app.use(cors())

app.use(express.json());
app.use(require('./routes/toDo.route'))




mongoose.connect('mongodb+srv://Emin1:1221@cluster0.4kuhk6r.mongodb.net/TodoBack')
    .then(() => console.log('Успешно соединились с сервером MongoDB'))
    .catch(() => console.log('Ошибка при соединении с сервером MongoDB'));


const port = 4100;

app.listen(port, () => {
    console.log('Сервер успешно запущен')
});