const express = require('express'); // Підключаємо фреймворк Express
const app = express();
const port = 3000; // Наш сервер буде працювати на порту 3000

app.set('view engine', 'ejs');  // Налаштовуємо EJS як шаблонізатор для динамічних сторінок

app.use(express.static('public_html')); // Вказуємо папку 'public_html' як місце для статичних файлів

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_html/index.html');
});

// Маршрут для динамічної сторінки
// За адресою '/student' будемо генерувати сторінку через EJS
app.get('/student', (req, res) => {
    const studentInfo = {      // Дані, які ми передамо з сервера прямо в HTML
        name: 'Роман',
        group: 'ІК-44', 
        team: 'Бригада № 5'
    };
    
    res.render('student', studentInfo);    // Рендеримо сторінку 'student.ejs' з папки views і передаємо їй дані
});

// Запускаємо сервер
app.listen(port, () => {
    console.log(`Сервер успішно запущено! Відкрий в браузері: http://localhost:${port}`);
});