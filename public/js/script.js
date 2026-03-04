document.addEventListener('DOMContentLoaded', function() {
    // ===== ЕЛЕМЕНТИ =====
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

    // ===== ДРОПДАУН ДЛЯ КОМАНДИ =====
    if (teamBtn && dropdownContent) {
        teamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Закриваємо інші відкриті дропдауни
            document.querySelectorAll('.dropdown-content.show').forEach(el => {
                if (el !== dropdownContent) {
                    el.classList.remove('show');
                }
            });
            
            // Перемикаємо поточний
            dropdownContent.classList.toggle('show');
            teamBtn.classList.toggle('active');
        });

        // Закриття при кліку поза дропдауном
        document.addEventListener('click', function(e) {
            if (!teamBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show');
                teamBtn.classList.remove('active');
            }
        });

        // Закриття при натисканні Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownContent.classList.remove('show');
                teamBtn.classList.remove('active');
            }
        });
    }
    
    // Відкриття форми
    if (formOpenBtn) {
        formOpenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            golovna.classList.add('show');
            formContainer.classList.add('show-login');
            formContainer.classList.remove('show-signup');
        });
    }

    // Закриття форми
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            golovna.classList.remove('show');
        });
    }

    // Закриття при кліку на оверлей
    if (golovna) {
        golovna.addEventListener('click', function(e) {
            if (e.target === golovna || e.target.classList.contains('form-overlay')) {
                golovna.classList.remove('show');
            }
        });
    }

    // Перемикання на реєстрацію
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            formContainer.classList.remove('show-login');
            formContainer.classList.add('show-signup');
        });
    }

    // Перемикання на вхід
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            formContainer.classList.remove('show-signup');
            formContainer.classList.add('show-login');
        });
    }

    // Показ/приховування пароля
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
    
    // Функція оновлення UI
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

    // Вихід
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userId');
            updateAuthUI();
            alert('Ви вийшли з акаунту');
        });
    }

    // Реєстрація
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
                // Імітація запиту до сервера
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Зберігаємо в localStorage (для демо)
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

    // Вхід
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
                // Імітація запиту до сервера
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

    // Ініціалізація
    updateAuthUI();
});