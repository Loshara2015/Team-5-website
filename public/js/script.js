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

    // Перехід до каталогу
    document.querySelectorAll('.catalog-btn').forEach(btn => {
        btn.onclick = (e) => { 
            window.location.href = '/catalog'; // Завжди просто переходимо на сторінку
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
    const adminLink = document.getElementById('admin-link');
    
    if (formOpenBtn) formOpenBtn.style.display = userId ? 'none' : 'flex';
    if (logoutBtn) logoutBtn.style.display = userId ? 'flex' : 'none';
    
    // Якщо email адміна — показуємо посилання на панель
    if (adminLink) {
        adminLink.style.display = (userId === 'admin@pompi.com') ? 'flex' : 'none';
        }
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

    // Оновлений обробник для кнопок "Купити"
    // Використовуємо делегування подій на випадок, якщо товари довантажуються динамічно
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('buy-btn')) {
            const name = e.target.getAttribute('data-name');
            const price = e.target.getAttribute('data-price');
            
            if (name && price) {
                cart.push({ name: name, price: price });
                updateCartUI();
                alert(`"${name}" додано у кошик!`);
            }
        }
    });

    // Видали ці рядки в самому кінці скрипта, вони більше не потрібні:
    // if (window.location.pathname === '/') {
    //    showHomePage();
    // }
});