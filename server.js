const express = require('express');
const pool = require('./config/db');
const catalogService = require('./services/catalogService');
const catalogRoutes = require('./routes/catalogRoutes');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/catalog', catalogRoutes);

const teamMembers = {
    kashyn: {
        name: 'Кашин Олександр',
        role: 'Виправляти те, що начудили😅',
        age: 18,
        hobby: 'Ігри, читання книжок, волейбол',
        photo: '/img/kashyn.jpg'
    },
    kolchin: {
        name: 'Колчін Владислав',
        role: 'Спостерігати, щоб ніхто нічого не начудив!👀',
        age: 19,
        hobby: 'Настільний теніс, музика, акваріумістика',
        photo: '/img/kolchin.jpg'
    },
    lukianchykova: {
        name: 'Лук\'янчикова Анна',
        role: 'Настав час щось чудити)😇',
        age: 21,
        hobby: 'Читання книг, комп\'ютерні та настільні ігри, чаювання)',
        photo: '/img/lukianchykova.jpg'
    },
    ponomarenko: {
        name: 'Пономаренко Анжеліка',
        role: 'Абсолютна чемпіонка clash royal',
        age: 18,
        hobby: 'Концерти, театр, крипта, бомжтріпи',
        photo: '/img/ponomarenko.jpg'
    },
    romaniuk: {
        name: 'Романюк Андрій',
        role: 'A Non-Player Character',
        age: 19,
        hobby: 'Художнє мяукання, полювання за привидами, дебати з голубами',
        photo: '/img/Romanyuk.jpg'
    }
};

app.get('/', async (req, res) => {
    try {
        const allProducts = await catalogService.getAllProducts();
        const featuredProducts = [...allProducts]
            .sort(() => 0.5 - Math.random())
            .slice(0, 8);

        res.render('index', { featuredProducts });
    } catch (error) {
        console.error('Failed to load home page', error);
        res.render('index', { featuredProducts: [] });
    }
});

app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const searchResults = await catalogService.searchProducts(query);

        res.render('index', {
            featuredProducts: searchResults,
            searchQuery: query
        });
    } catch (error) {
        console.error('Failed to search products', error);
        res.status(500).send('Помилка сервера під час пошуку');
    }
});

app.get('/member/:id', (req, res) => {
    const memberId = req.params.id;
    const member = teamMembers[memberId];

    if (!member) {
        return res.status(404).send('Учасника не знайдено');
    }

    res.render('member', { member });
});

const startServer = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('PostgreSQL connection established successfully');
        app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to PostgreSQL', error);
        process.exit(1);
    }
};

startServer();