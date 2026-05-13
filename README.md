При першому запуску проекту в терміналі потрібно прописати "npm install", щоб скачати залежності (node_modules).
Команда в терміналі "node server.js", або "npm start" - запуск сервера.
Ctrl+C у вікні терміналу - зупинити сервер.
Сайт буде на http://localhost:3000.


Щоб увійти в **аккаунт адміна** використовуйте пошту admin@pompi.com та будь-який пароль.


## Запуск з PostgreSQL (4 лаба)
При *першому* запуску проекту потрібно:

1. Створити базу даних pompi_catalog. Або через "pgAdmin", або через SQL код:
   psql -U postgres -d postgres -f sql/create_database.sql

2. Створити таблиці для БД. Або через "pgAdmin", використовуючи код файла "schema.sql", або виконати SQL зі створення таблиць:
   psql -U postgres -d pompi_catalog -f sql/schema.sql

3. Створити ".env" на основі ".env.example" і вписати свій пароль PostgreSQL.

4. Встановити залежності (з'явились нові):
   npm install

5. Заповнити БД тестовими даними:
   npm run seed

6. Запустити сервер:
   npm start

7. Якщо все правильно, то в консолі має з'явитися повідомлення:
   *
   PostgreSQL connection established successfully via Sequelize
   Server started: http://localhost:3000
   *