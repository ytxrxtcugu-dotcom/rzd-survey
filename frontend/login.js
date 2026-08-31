// Учетные данные администратора (в реальном приложении это должно быть на сервере)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'rzd2024'
};

// Функция для обработки входа
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Проверяем учетные данные
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Сохраняем сессию
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUsername', username);
        
        // Перенаправляем на панель администратора
        window.location.href = '/admin.html';
    } else {
        // Показываем ошибку
        errorMessage.style.display = 'block';
        
        // Скрываем ошибку через 3 секунды
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
        
        // Очищаем поля
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

// Проверяем, не авторизован ли уже администратор
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = '/admin.html';
    }
}

// Вызываем проверку при загрузке страницы
checkAuth();