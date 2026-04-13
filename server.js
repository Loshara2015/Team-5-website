const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Налаштування EJS
app.set('view engine', 'ejs');

// Папка 'public' для статичних файлів (CSS, JS, картинки)
app.use(express.static('public'));

// Підключення маршрутів MVC
const catalogRoutes = require('./routes/catalogRoutes');
// Всі запити, що починаються з /catalog, будуть оброблятися в catalogRoutes
app.use('/catalog', catalogRoutes);

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

const catalogService = require('./services/catalogService'); // Підключаємо сервіс

// Головна сторінка EJS
app.get('/', async (req, res) => {
    try {
        const allProducts = await catalogService.getAllProducts(); // Отримуємо всі товари
        const featuredProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 8); // Беремо 8 випадкових товарів для блоку "Популярні товари"
        
        res.render('index', { featuredProducts: featuredProducts }); // Передаємо ці товари у шаблон index.ejs
    } catch (error) {
        console.error("Помилка при завантаженні головної сторінки:", error);
        res.render('index', { featuredProducts: [] });
    }
});

// Маршрут для обробки пошуку
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q; // Отримуємо текст з параметра ?q=... в URL
        const searchResults = await catalogService.searchProducts(query);
        
        res.render('index', { 
            featuredProducts: searchResults,
            searchQuery: query 
        });
    } catch (error) {
        console.error("Помилка пошуку:", error);
        res.status(500).send('Помилка сервера під час пошуку');
    }
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