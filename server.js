const express = require('express');
const app = express();
const port = 3000;

// Налаштування EJS
app.set('view engine', 'ejs');

// Папка 'public' для статичних файлів (CSS, JS, картинки)
app.use(express.static('public'));

// БАЗА ДАНИХ
const teamMembers = {
    'kashyn': {
        name: 'Кашин Олександр',
        role: 'Виправляти те, що начудили😅',
        age: 18,
        hobby: 'Ігри, читання книжок, волейбол',
        photo: '/img/kashyn.jpg'
    },
    'kolchin': {
        name: 'Колчін Владислав',
        role: 'Спостерігати, щоб ніхто нічого не начудив!👀',
        age: 19,
        hobby: 'Настільний теніс, музика, акваріумістика',
        photo: '/img/kolchin.jpg'
    },
    'lukianchykova': {
        name: 'Лук\'янчикова Анна',
        role: 'Настав час щось чудити)😇',
        age: 21,
        hobby: 'Читання книг, комп\'ютерні та настільні ігри, чаювання)',
        photo: '/img/lukianchykova.jpg'
    },
    'ponomarenko': {
        name: 'Пономаренко Анжеліка',
        role: 'Абсолютна чемпіонка clash royal',
        age: 18,
        hobby: 'Концерти, театр, крипта, бомжтріпи',
        photo: '/img/ponomarenko.jpg' },
    'romaniuk': {
        name: 'Романюк Андрій',
        role: 'A Non-Player Character',
        age: 19,
        hobby: 'Художнє мяукання, полювання за привидами, дебати з голубами',
        photo: '/img/Romanyuk.jpg' }
};

// Головна сторінка EJS
app.get('/', (req, res) => {
    res.render('index');
});

// Динамічна сторінка EJS
app.get('/member/:id', (req, res) => {
    const memberId = req.params.id;
    const member = teamMembers[memberId];

    if (member) {
        // Рендеринг шаблону і передача даних
        res.render('member', { member: member });
    } else {
        res.status(404).send('Учасника не знайдено');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущено: http://localhost:${port}`);
});