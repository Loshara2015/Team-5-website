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
    const headerActions = document.querySelector('.header-actions');
    
    // Дані товарів (оригінальний масив З XML)
    const products = [
      { "id": 1, "categoryId": 21, "name": "Холодильник BOSCH KGN39VI306", "price": 32499, "description": "Чудовий холодильник з системою No Frost, VitaFresh", "image": "https://content1.rozetka.com.ua/goods/images/big/135486112.jpg" },
      { "id": 101, "categoryId": 21, "name": "Холодильник Samsung RB33J3420SA", "price": 18999, "description": "Енергоефективний, тихий, об'єм 330 л", "image": "https://images.prom.ua/4051694378_w600_h600_4051694378.jpg" },
      { "id": 102, "categoryId": 21, "name": "Холодильник LG GC-B247SLUV", "price": 42999, "description": "З вбудованим телевізором та льодогенератором", "image": "https://content1.rozetka.com.ua/goods/images/big/178727051.jpg" },
      { "id": 103, "categoryId": 21, "name": "Морозильна камера Liebherr GN 3023", "price": 21999, "description": "Окрема морозильна камера, місткість 300 л", "image": "https://images.prom.ua/4604099748_w600_h600_liebherr-gn-3023.jpg" },
      { "id": 104, "categoryId": 21, "name": "Холодильник Gorenje RK60359KW", "price": 15999, "description": "Класичний дизайн, сухе заморожування", "image": "https://content2.rozetka.com.ua/goods/images/big/271316763.jpg" },
      { "id": 105, "categoryId": 22, "name": "Пральна машина Bosch Serie 4 WAN28281", "price": 17999, "description": "Фронтальне завантаження, 8 кг", "image": "https://content1.rozetka.com.ua/goods/images/big/240479668.jpg" },
      { "id": 106, "categoryId": 22, "name": "Пральна машина Samsung WW90T404CEE", "price": 15999, "description": "З парою, EcoBubble, 9 кг", "image": "https://content1.rozetka.com.ua/goods/images/big/177725449.jpg" },
      { "id": 107, "categoryId": 22, "name": "Пральна машина LG F2J3HS0W", "price": 13999, "description": "Прямий привід, 7 кг", "image": "https://content2.rozetka.com.ua/goods/images/big/172668835.jpg" },
      { "id": 108, "categoryId": 22, "name": "Пральна машина Indesit IWUB 4105", "price": 8999, "description": "Вузька, 4 кг, бюджетний варіант", "image": "https://images.prom.ua/2730000399_w600_h600_indesit-iwub-4105.jpg" },
      { "id": 109, "categoryId": 22, "name": "Сушарка для білизни Beko DS7333PA", "price": 20999, "description": "Окрема сушильна машина, 7 кг", "image": "https://content1.rozetka.com.ua/goods/images/big/299940622.jpg" },
      { "id": 110, "categoryId": 23, "name": "Газова плита Gorenje GI 6321 XF", "price": 12999, "description": "Залежна, газ-контроль", "image": "https://content2.rozetka.com.ua/goods/images/big/249304087.jpg" },
      { "id": 111, "categoryId": 23, "name": "Варочна поверхня Electrolux EHH 3920 BKK", "price": 8999, "description": "Індукційна, 4 конфорки", "image": "https://content1.rozetka.com.ua/goods/images/big/126753450.jpg" },
      { "id": 112, "categoryId": 23, "name": "Духова шафа Bosch HBG634BS1", "price": 28999, "description": "З функцією піци та підігріву", "image": "https://content2.rozetka.com.ua/goods/images/big/169454727.jpg" },
      { "id": 113, "categoryId": 23, "name": "Мікрохвильова піч Samsung ME83KR", "price": 3999, "description": "Окремо стояча, 23 л", "image": "https://content1.rozetka.com.ua/goods/images/big/150434451.jpg" },
      { "id": 124, "categoryId": 201, "name": "Смартфон Apple iPhone 13", "price": 35000, "description": "Популярний смартфон від Apple", "image": "https://content2.rozetka.com.ua/goods/images/big/244241020.jpg" },
      { "id": 125, "categoryId": 201, "name": "Смартфон Samsung Galaxy S23", "price": 28999, "description": "Потужний камерафон", "image": "https://content1.rozetka.com.ua/goods/images/big/346369302.jpg" },
      { "id": 126, "categoryId": 201, "name": "Смартфон Xiaomi Redmi Note 12", "price": 8999, "description": "Відмінний бюджетний варіант", "image": "https://content2.rozetka.com.ua/goods/images/big/337435175.jpg" },
      { "id": 134, "categoryId": 401, "name": "iPad Pro 11 (2022)", "price": 38999, "description": "З чіпом M2", "image": "https://content1.rozetka.com.ua/goods/images/big/282557162.jpg" },
      { "id": 138, "categoryId": 501, "name": "Ноутбук Apple MacBook Air M1", "price": 32999, "description": "8/256 GB, Gold", "image": "https://content1.rozetka.com.ua/goods/images/big/196058008.jpg" },
      { "id": 146, "categoryId": 701, "name": "Дриль Bosch GSB 13 RE", "price": 2199, "description": "Ударний, 650 Вт", "image": "https://content2.rozetka.com.ua/goods/images/big/10048728.jpg" }
    ];
    
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

    // Функціонал кошика
    let cart = JSON.parse(localStorage.getItem('pompi_cart')) || [];

    function updateCartUI() {
        let cartBtn = document.getElementById('cart-open-btn');
        if (!cartBtn) {
            cartBtn = document.createElement('button');
            cartBtn.className = 'userlogin';
            cartBtn.id = 'cart-open-btn';
            cartBtn.style.marginRight = '10px';
            headerActions.insertBefore(cartBtn, formOpenBtn);
        }
        cartBtn.innerHTML = `<i class="fas fa-shopping-basket"></i> Кошик (${cart.length})`;
        cartBtn.onclick = () => toggleCartModal(true);
        localStorage.setItem('pompi_cart', JSON.stringify(cart));
    }

    function toggleCartModal(show) {
        let modal = document.getElementById('cart-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'cart-modal';
            modal.className = 'golovna'; 
            modal.innerHTML = `
                <div class="form-overlay"></div>
                <div class="form_container" style="max-width: 450px;">
                    <i class="fas fa-times form_close" id="cart-close"></i>
                    <h2 style="margin-bottom:20px; text-align:center;">Ваш кошик</h2>
                    <div id="cart-items-list" style="max-height: 300px; overflow-y: auto; margin-bottom: 20px;"></div>
                    <div id="cart-summary" style="font-weight: bold; font-size: 18px; border-top: 2px solid #eee; padding-top: 15px;"></div>
                    <button class="submit-btn" style="margin-top:20px;">Оформити замовлення</button>
                    <button id="empty-cart" style="width:100%; background:none; border:none; color:#888; cursor:pointer; margin-top:10px;">Очистити кошик</button>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#cart-close').onclick = () => modal.classList.remove('show');
            modal.querySelector('.form-overlay').onclick = () => modal.classList.remove('show');
            modal.querySelector('#empty-cart').onclick = () => { cart = []; updateCartUI(); modal.classList.remove('show'); };
        }

        if (show) {
            const list = modal.querySelector('#cart-items-list');
            list.innerHTML = cart.length === 0 ? '<p style="text-align:center;">Кошик порожній</p>' : '';
            let total = 0;
            cart.forEach((item, index) => {
                total += parseInt(item.price);
                list.innerHTML += `
                    <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #f0f0f0;">
                        <span>${item.name}</span>
                        <span><b>${item.price} ₴</b> <i class="fas fa-trash-alt" style="color:#ff4757; margin-left:10px; cursor:pointer;" onclick="window.removeCartItem(${index})"></i></span>
                    </div>`;
            });
            modal.querySelector('#cart-summary').innerText = `Сума: ${total} ₴`;
            modal.classList.add('show');
        } else {
            modal.classList.remove('show');
        }
    }

    window.removeCartItem = (index) => {
        cart.splice(index, 1);
        updateCartUI();
        toggleCartModal(true);
    };

    // Оригінальні функції відображення (з XML)
    function showCatalog() {
        const existingCatalog = document.querySelector('.catalog-container');
        const existingProducts = document.querySelector('.products-container');
        if (existingCatalog) existingCatalog.remove();
        if (existingProducts) existingProducts.remove();
        
        const catalogContainer = document.createElement('div');
        catalogContainer.className = 'catalog-container';
        
        const title = document.createElement('h2');
        title.className = 'catalog-title';
        title.innerHTML = '<i class="fas fa-bars"></i> Каталог товарів';
        catalogContainer.appendChild(title);
        
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
        catalogContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showProductsByCategory(categoryId, categoryName) {
        let filteredProducts = [];
        if (categoryId === 1) filteredProducts = products.filter(p => p.categoryId === 201 || p.categoryId === 202);
        else if (categoryId === 5) filteredProducts = products.filter(p => p.categoryId === 501);
        else if (categoryId === 10) filteredProducts = products.filter(p => p.categoryId === 21 || p.categoryId === 22 || p.categoryId === 23);
        else filteredProducts = products.slice(0, 6);
        
        const existingCatalog = document.querySelector('.catalog-container');
        if (existingCatalog) existingCatalog.remove();
        const existingProducts = document.querySelector('.products-container');
        if (existingProducts) existingProducts.remove();
        
        renderProducts(filteredProducts, categoryName);
    }
    
    function renderProducts(productsToRender, title = "Рекомендовані товари") {
        let container = document.querySelector('.products-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'products-container';
            main.appendChild(container);
        }
        container.innerHTML = '';
        
        const titleEl = document.createElement('h2');
        titleEl.className = 'products-section-title';
        titleEl.innerHTML = `<i class="fas fa-tags"></i> ${title}`;
        container.appendChild(titleEl);
        
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-catalog-btn';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Повернутись до каталогу';
        backBtn.addEventListener('click', () => showCatalog());
        container.appendChild(backBtn);
        
        const grid = document.createElement('div');
        grid.className = 'products-grid';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200'">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price">₴ ${product.price.toLocaleString()}</div>
                    <button class="buy-btn" data-id="${product.id}">Купити</button>
                </div>
            `;
            grid.appendChild(productCard);
        });
        container.appendChild(grid);

        // Обробник для кнопок "Купити"
        grid.querySelectorAll('.buy-btn').forEach(btn => {
            btn.onclick = () => {
                const prod = productsToRender.find(p => p.id == btn.dataset.id);
                if (prod) {
                    cart.push({ name: prod.name, price: prod.price });
                    updateCartUI();
                    alert(`"${prod.name}" у кошику!`);
                }
            };
        });
    }
    
    function showHomePage() {
        const existingWelcome = document.querySelector('.welcome-section');
        const existingCatalog = document.querySelector('.catalog-container');
        const existingProducts = document.querySelector('.products-container');
        if (existingWelcome) existingWelcome.remove();
        if (existingCatalog) existingCatalog.remove();
        if (existingProducts) existingProducts.remove();
        
        const welcomeSection = document.createElement('div');
        welcomeSection.className = 'welcome-section';
        welcomeSection.innerHTML = `
            <h1>Ласкаво просимо до Помпі!</h1>
            <p>Найкращий магазин електроніки та побутової техніки</p>
            <button class="catalog-promo-btn">Переглянути каталог</button>
        `;
        main.appendChild(welcomeSection);
        
        const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
        renderProducts(randomProducts, "Популярні товари");
        
        welcomeSection.querySelector('.catalog-promo-btn').onclick = () => showCatalog();
    }

    // Перехід до каталогу
    document.querySelectorAll('.catalog-btn').forEach(btn => {
        btn.onclick = (e) => { 
            // Якщо ми не на головній сторінці, просто переходимо на сторінку каталогу
            if (window.location.pathname !== '/') {
                window.location.href = '/catalog';
            } else {
                e.preventDefault(); 
                showCatalog(); 
            }
        };
    });
    
    const logo = document.querySelector('.nav_logo');
    if (logo) {
        logo.onclick = (e) => { 
            // Якщо ми не на головній сторінці, дозволяємо звичайний перехід по href="/"
            if (window.location.pathname === '/') {
                e.preventDefault(); 
                showHomePage(); 
            }
        };
    }
    
    // Логіка UI та авторизації
    if (teamBtn && dropdownContent) {
        teamBtn.onclick = (e) => {
            e.preventDefault(); e.stopPropagation();
            dropdownContent.classList.toggle('show');
            teamBtn.classList.toggle('active');
        };
        document.onclick = (e) => {
            if (!teamBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show'); teamBtn.classList.remove('active');
            }
        };
    }
    
    if (formOpenBtn) formOpenBtn.onclick = (e) => {
        e.preventDefault(); golovna.classList.add('show'); formContainer.classList.add('show-login');
    };
    if (closeBtn) closeBtn.onclick = () => golovna.classList.remove('show');
    if (signupBtn) signupBtn.onclick = (e) => {
        e.preventDefault(); formContainer.classList.remove('show-login'); formContainer.classList.add('show-signup');
    };
    if (loginBtn) loginBtn.onclick = (e) => {
        e.preventDefault(); formContainer.classList.remove('show-signup'); formContainer.classList.add('show-login');
    };

    pwShowHide.forEach(icon => {
        icon.onclick = function() {
            const input = this.parentElement.querySelector('input');
            input.type = input.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');
        };
    });
    
    function updateAuthUI() {
        const userId = localStorage.getItem('userId');
        if (formOpenBtn) formOpenBtn.style.display = userId ? 'none' : 'flex';
        if (logoutBtn) logoutBtn.style.display = userId ? 'flex' : 'none';
    }

    if (logoutBtn) logoutBtn.onclick = (e) => {
        e.preventDefault(); localStorage.removeItem('userId'); updateAuthUI(); alert('Ви вийшли');
    };

    const loginForm = document.getElementById('formLogin');
    if (loginForm) loginForm.onsubmit = (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        localStorage.setItem('userId', email); updateAuthUI();
        golovna.classList.remove('show'); alert('Вхід успішний!');
    };

    // Ініціалізація
    updateAuthUI();
    updateCartUI();
    // Запускаємо генерацію головної сторінки тільки якщо ми знаходимось на кореневому маршруті '/'
    if (window.location.pathname === '/') {
        showHomePage();
    }
});