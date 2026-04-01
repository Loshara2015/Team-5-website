document.addEventListener('DOMContentLoaded', function() {
    const formOpenBtn = document.getElementById('form-open');
    const golovna = document.getElementById('golovna');
    const formContainer = document.getElementById('formContainer');
    const closeBtn = document.querySelector('.form_close');
    const signupBtn = document.getElementById('signup');
    const loginBtn = document.getElementById('login');
    const pwShowHide = document.querySelectorAll('.pw_hidden');
    const teamBtn = document.getElementById('teamBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    const logoutBtn = document.getElementById('logout-btn');
    const main = document.querySelector('main');
    
    // ДАНІ ТОВАРІВ 
    const products = [
      {
        "id": 1,
        "categoryId": 21,
        "name": "Холодильник BOSCH KGN39VI306",
        "price": 32499,
        "description": "Чудовий холодильник з системою No Frost, VitaFresh",
        "image": "https://content1.rozetka.com.ua/goods/images/big/135486112.jpg"
      },
      {
        "id": 101,
        "categoryId": 21,
        "name": "Холодильник Samsung RB33J3420SA",
        "price": 18999,
        "description": "Енергоефективний, тихий, об'єм 330 л",
        "image": "https://images.prom.ua/4051694378_w600_h600_4051694378.jpg"
      },
      {
        "id": 102,
        "categoryId": 21,
        "name": "Холодильник LG GC-B247SLUV",
        "price": 42999,
        "description": "З вбудованим телевізором та льодогенератором",
        "image": "https://content1.rozetka.com.ua/goods/images/big/178727051.jpg"
      },
      {
        "id": 103,
        "categoryId": 21,
        "name": "Морозильна камера Liebherr GN 3023",
        "price": 21999,
        "description": "Окрема морозильна камера, місткість 300 л",
        "image": "https://images.prom.ua/4604099748_w600_h600_liebherr-gn-3023.jpg"
      },
      {
        "id": 104,
        "categoryId": 21,
        "name": "Холодильник Gorenje RK60359KW",
        "price": 15999,
        "description": "Класичний дизайн, сухе заморожування",
        "image": "https://content2.rozetka.com.ua/goods/images/big/271316763.jpg"
      },
      {
        "id": 105,
        "categoryId": 22,
        "name": "Пральна машина Bosch Serie 4 WAN28281",
        "price": 17999,
        "description": "Фронтальне завантаження, 8 кг",
        "image": "https://content1.rozetka.com.ua/goods/images/big/240479668.jpg"
      },
      {
        "id": 106,
        "categoryId": 22,
        "name": "Пральна машина Samsung WW90T404CEE",
        "price": 15999,
        "description": "З парою, EcoBubble, 9 кг",
        "image": "https://content1.rozetka.com.ua/goods/images/big/177725449.jpg"
      },
      {
        "id": 107,
        "categoryId": 22,
        "name": "Пральна машина LG F2J3HS0W",
        "price": 13999,
        "description": "Прямий привід, 7 кг",
        "image": "https://content2.rozetka.com.ua/goods/images/big/172668835.jpg"
      },
      {
        "id": 108,
        "categoryId": 22,
        "name": "Пральна машина Indesit IWUB 4105",
        "price": 8999,
        "description": "Вузька, 4 кг, бюджетний варіант",
        "image": "https://images.prom.ua/2730000399_w600_h600_indesit-iwub-4105.jpg"
      },
      {
        "id": 109,
        "categoryId": 22,
        "name": "Сушарка для білизни Beko DS7333PA",
        "price": 20999,
        "description": "Окрема сушильна машина, 7 кг",
        "image": "https://content1.rozetka.com.ua/goods/images/big/299940622.jpg"
      },
      {
        "id": 110,
        "categoryId": 23,
        "name": "Газова плита Gorenje GI 6321 XF",
        "price": 12999,
        "description": "Залежна, газ-контроль",
        "image": "https://content2.rozetka.com.ua/goods/images/big/249304087.jpg"
      },
      {
        "id": 111,
        "categoryId": 23,
        "name": "Варочна поверхня Electrolux EHH 3920 BKK",
        "price": 8999,
        "description": "Індукційна, 4 конфорки",
        "image": "https://content1.rozetka.com.ua/goods/images/big/126753450.jpg"
      },
      {
        "id": 112,
        "categoryId": 23,
        "name": "Духова шафа Bosch HBG634BS1",
        "price": 28999,
        "description": "З функцією піци та підігріву",
        "image": "https://content2.rozetka.com.ua/goods/images/big/169454727.jpg"
      },
      {
        "id": 113,
        "categoryId": 23,
        "name": "Мікрохвильова піч Samsung ME83KR",
        "price": 3999,
        "description": "Окремо стояча, 23 л",
        "image": "https://content1.rozetka.com.ua/goods/images/big/150434451.jpg"
      },
      {
        "id": 124,
        "categoryId": 201,
        "name": "Смартфон Apple iPhone 13",
        "price": 35000,
        "description": "Популярний смартфон від Apple",
        "image": "https://content2.rozetka.com.ua/goods/images/big/244241020.jpg"
      },
      {
        "id": 125,
        "categoryId": 201,
        "name": "Смартфон Samsung Galaxy S23",
        "price": 28999,
        "description": "Потужний камерафон",
        "image": "https://content1.rozetka.com.ua/goods/images/big/346369302.jpg"
      },
      {
        "id": 126,
        "categoryId": 201,
        "name": "Смартфон Xiaomi Redmi Note 12",
        "price": 8999,
        "description": "Відмінний бюджетний варіант",
        "image": "https://content2.rozetka.com.ua/goods/images/big/337435175.jpg"
      },
      {
        "id": 134,
        "categoryId": 401,
        "name": "iPad Pro 11 (2022)",
        "price": 38999,
        "description": "З чіпом M2",
        "image": "https://content1.rozetka.com.ua/goods/images/big/282557162.jpg"
      },
      {
        "id": 138,
        "categoryId": 501,
        "name": "Ноутбук Apple MacBook Air M1",
        "price": 32999,
        "description": "8/256 GB, Gold",
        "image": "https://content1.rozetka.com.ua/goods/images/big/196058008.jpg"
      },
      {
        "id": 146,
        "categoryId": 701,
        "name": "Дриль Bosch GSB 13 RE",
        "price": 2199,
        "description": "Ударний, 650 Вт",
        "image": "https://content2.rozetka.com.ua/goods/images/big/10048728.jpg"
      }
    ];
    
    // ДАНІ КАТЕГОРІЙ З ІКОНКАМИ
    const categories = [
        { id: 1, name: "Зв'язок і гаджети", icon: "fas fa-mobile-alt", color: "#3498db" },
        { id: 2, name: "ТВ відео", icon: "fas fa-tv", color: "#e74c3c" },
        { id: 3, name: "Клімат, опалення та водопостачання", icon: "fas fa-temperature-high", color: "#f39c12" },
        { id: 4, name: "Туризм і риболовля", icon: "fas fa-campground", color: "#27ae60" },
        { id: 5, name: "Комп'ютерна техніка", icon: "fas fa-laptop-code", color: "#9b59b6" },
        { id: 6, name: "Аудіотехніка", icon: "fas fa-headphones", color: "#1abc9c" },
        { id: 7, name: "Дитячі товари", icon: "fas fa-baby-carriage", color: "#e84393" },
        { id: 8, name: "Спорт і активний відпочинок", icon: "fas fa-bicycle", color: "#f1c40f" },
        { id: 9, name: "Офіс і канцелярія", icon: "fas fa-print", color: "#7f8c8d" },
        { id: 10, name: "Побутова техніка", icon: "fas fa-blender", color: "#2c3e50" },
        { id: 11, name: "Авто та мото", icon: "fas fa-car", color: "#e67e22" },
        { id: 12, name: "Дім і ремонт", icon: "fas fa-home", color: "#16a085" },
        { id: 13, name: "Фото і відеозйомка", icon: "fas fa-camera", color: "#8e44ad" },
        { id: 14, name: "Мала побутова техніка", icon: "fas fa-coffee", color: "#d35400" },
        { id: 15, name: "Інструмент", icon: "fas fa-tools", color: "#95a5a6" },
        { id: 16, name: "Годинники, прикраси й аксесуари", icon: "fas fa-clock", color: "#f4c542" }
    ];
    
    // ФУНКЦІЯ ПОКАЗУ КАТАЛОГУ
    function showCatalog() {
        // Видаляємо всі попередні контейнери
        const existingCatalog = document.querySelector('.catalog-container');
        const existingProducts = document.querySelector('.products-container');
        if (existingCatalog) existingCatalog.remove();
        if (existingProducts) existingProducts.remove();
        
        // Створюємо контейнер для каталогу
        const catalogContainer = document.createElement('div');
        catalogContainer.className = 'catalog-container';
        
        // Додаємо заголовок
        const title = document.createElement('h2');
        title.className = 'catalog-title';
        title.innerHTML = '<i class="fas fa-bars"></i> Каталог товарів';
        catalogContainer.appendChild(title);
        
        // Створюємо сітку категорій
        const categoriesGrid = document.createElement('div');
        categoriesGrid.className = 'categories-grid';
        
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.style.borderTop = `3px solid ${category.color}`;
            categoryCard.innerHTML = `
                <div class="category-icon" style="background: ${category.color}20; color: ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">Переглянути товари <i class="fas fa-arrow-right"></i></p>
            `;
            
            categoryCard.addEventListener('click', () => {
                showProductsByCategory(category.id, category.name);
            });
            
            categoriesGrid.appendChild(categoryCard);
        });
        
        catalogContainer.appendChild(categoriesGrid);
        main.appendChild(catalogContainer);
        
        // Прокручуємо до каталогу
        catalogContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    //ФУНКЦІЯ ПОКАЗУ ТОВАРІВ ЗА КАТЕГОРІЄЮ 
    function showProductsByCategory(categoryId, categoryName) {
        // Фільтруємо товари за категорією (для демо показуємо випадкові)
        let filteredProducts = [];
        
        if (categoryId === 1) filteredProducts = products.filter(p => p.categoryId === 201 || p.categoryId === 202);
        else if (categoryId === 5) filteredProducts = products.filter(p => p.categoryId === 501);
        else if (categoryId === 10) filteredProducts = products.filter(p => p.categoryId === 21 || p.categoryId === 22 || p.categoryId === 23);
        else if (categoryId === 11) filteredProducts = products.filter(p => p.categoryId === 801);
        else if (categoryId === 15) filteredProducts = products.filter(p => p.categoryId === 701);
        else filteredProducts = products.slice(0, 6);
        
        if (filteredProducts.length === 0) {
            filteredProducts = products.slice(0, 6);
        }
        
        // Видаляємо каталог
        const existingCatalog = document.querySelector('.catalog-container');
        if (existingCatalog) existingCatalog.remove();
        
        // Видаляємо попередні товари
        const existingProducts = document.querySelector('.products-container');
        if (existingProducts) existingProducts.remove();
        
        // Показуємо товари
        renderProducts(filteredProducts, categoryName);
    }
    
    //  ФУНКЦІЯ ПОКАЗУ ТОВАРІВ НА ГОЛОВНІЙ 
    function renderProducts(productsToRender, title = "Рекомендовані товари") {
        let container = document.querySelector('.products-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'products-container';
            main.appendChild(container);
        }
        
        container.innerHTML = '';
        
        // Додаємо заголовок
        const titleEl = document.createElement('h2');
        titleEl.className = 'products-section-title';
        titleEl.innerHTML = `<i class="fas fa-tags"></i> ${title}`;
        container.appendChild(titleEl);
        
        // Додаємо кнопку назад до каталогу
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-catalog-btn';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Повернутись до каталогу';
        backBtn.addEventListener('click', () => {
            showCatalog();
        });
        container.appendChild(backBtn);
        
        // Створюємо сітку товарів
        const grid = document.createElement('div');
        grid.className = 'products-grid';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}"
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
                    <div class="product-price">₴ ${product.price.toLocaleString()}</div>
                    <button class="buy-btn" data-id="${product.id}">Купити</button>
                </div>
            `;
            
            grid.appendChild(productCard);
        });
        
        container.appendChild(grid);
        
        // Додаємо обробники для кнопок "Купити"
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                const product = productsToRender.find(p => p.id == productId);
                if (product) {
                    alert(`Товар "${product.name}" додано до кошика!`);
                }
            });
        });
    }
    
    // ФУНКЦІЯ ПОКАЗУ ГОЛОВНОЇ СТОРІНКИ
    function showHomePage() {
        // Видаляємо каталог
        const existingCatalog = document.querySelector('.catalog-container');
        if (existingCatalog) existingCatalog.remove();
        
        // Видаляємо попередні товари
        const existingProducts = document.querySelector('.products-container');
        if (existingProducts) existingProducts.remove();
        
        // Створюємо привітання
        const welcomeSection = document.createElement('div');
        welcomeSection.className = 'welcome-section';
        welcomeSection.innerHTML = `
            <h1>Ласкаво просимо до Помпі!</h1>
            <p>Найкращий магазин електроніки та побутової техніки</p>
            <button class="catalog-promo-btn">Переглянути каталог</button>
        `;
        main.appendChild(welcomeSection);
        
        // Показуємо випадкові товари
        const shuffled = [...products];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const randomProducts = shuffled.slice(0, 8);
        renderProducts(randomProducts, "Популярні товари");
        
        // Додаємо обробник для кнопки в привітанні
        const promoBtn = document.querySelector('.catalog-promo-btn');
        if (promoBtn) {
            promoBtn.addEventListener('click', () => showCatalog());
        }
    }
    
    //  ПЕРЕХІД ДО КАТАЛОГУ 
    const catalogBtns = document.querySelectorAll('.catalog-btn');
    catalogBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showCatalog();
        });
    });
    
    // ПЕРЕХІД НА ГОЛОВНУ ПРИ КЛІКУ НА ЛОГО
    const logo = document.querySelector('.nav_logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            showHomePage();
        });
    }
    
    // ДРОПДАУН ДЛЯ КОМАНДИ 
    if (teamBtn && dropdownContent) {
        teamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            document.querySelectorAll('.dropdown-content.show').forEach(el => {
                if (el !== dropdownContent) {
                    el.classList.remove('show');
                }
            });
            
            dropdownContent.classList.toggle('show');
            teamBtn.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!teamBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show');
                teamBtn.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownContent.classList.remove('show');
                teamBtn.classList.remove('active');
            }
        });
    }
    
    // ФОРМИ ВХОДУ/РЕЄСТРАЦІЇ
    if (formOpenBtn) {
        formOpenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            golovna.classList.add('show');
            formContainer.classList.add('show-login');
            formContainer.classList.remove('show-signup');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            golovna.classList.remove('show');
        });
    }

    if (golovna) {
        golovna.addEventListener('click', function(e) {
            if (e.target === golovna || e.target.classList.contains('form-overlay')) {
                golovna.classList.remove('show');
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            formContainer.classList.remove('show-login');
            formContainer.classList.add('show-signup');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            formContainer.classList.remove('show-signup');
            formContainer.classList.add('show-login');
        });
    }

    pwShowHide.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });
    
    // ===== АВТОРИЗАЦІЯ =====
    function updateAuthUI() {
        const userId = localStorage.getItem('userId');
        if (userId) {
            if (formOpenBtn) formOpenBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'flex';
        } else {
            if (formOpenBtn) formOpenBtn.style.display = 'flex';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userId');
            updateAuthUI();
            alert('Ви вийшли з акаунту');
        });
    }

    const signupForm = document.getElementById('formSignup');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            if (password !== confirmPassword) {
                alert('Паролі не співпадають!');
                return;
            }

            if (password.length < 6) {
                alert('Пароль має містити не менше 6 символів');
                return;
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                localStorage.setItem('userId', email);
                updateAuthUI();
                alert('Реєстрація успішна!');
                golovna.classList.remove('show');
                signupForm.reset();
            } catch (error) {
                console.error('Помилка:', error);
                alert('Сталася помилка при реєстрації');
            }
        });
    }

    const loginForm = document.getElementById('formLogin');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            if (!email || !password) {
                alert('Заповніть всі поля');
                return;
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                localStorage.setItem('userId', email);
                updateAuthUI();
                alert('Вхід успішний!');
                golovna.classList.remove('show');
                loginForm.reset();
            } catch (error) {
                console.error('Помилка:', error);
                alert('Невірний email або пароль');
            }
        });
    }

    updateAuthUI();
    
    // Запускаємо головну сторінку
    showHomePage();
});