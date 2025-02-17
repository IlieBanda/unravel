// Наблюдатель за появлением секций
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // Секция станет видимой, когда 10% её содержимого появится в viewport
});

// Находим все секции и добавляем их в наблюдатель
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Получаем высоту навигационной панели
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        
        // Вычисляем позицию элемента с учётом высоты навигации
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Анимация навигационной панели при прокрутке
let lastScrollTop = 0;
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Добавляем тень и непрозрачность при прокрутке
    if (scrollTop > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Анимация для фонового видео
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.background-video');
    if (video) {
        // Устанавливаем начальное время воспроизведения на 0 секунд
        video.currentTime = 0;
        
        // При каждом новом цикле воспроизведения начинаем с 0 секунд
        video.addEventListener('timeupdate', () => {
            // Если видео закончилось, начинаем снова с 0 секунд
            if (video.currentTime >= video.duration - 0.1) {
                video.currentTime = 0;
            }
        });
    }
});

// Мобильное меню
const logo = document.querySelector('.logo');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

// Добавляем кнопку для мобильного меню
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = `
    <span class="menu-icon"></span>
`;

// Добавляем кнопку только на мобильных устройствах
if (window.innerWidth <= 768) {
    logo.after(mobileMenuButton);
}

// Обработчик клика по кнопке мобильного меню
mobileMenuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinks.style.display = isMenuOpen ? 'flex' : 'none';
    mobileMenuButton.classList.toggle('active');
});

// Закрываем меню при клике по ссылке на мобильных устройствах
navLinks.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && e.target.tagName === 'A') {
        isMenuOpen = false;
        navLinks.style.display = 'none';
        mobileMenuButton.classList.remove('active');
    }
});

// Обновляем стили при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        if (mobileMenuButton.parentElement) {
            mobileMenuButton.parentElement.removeChild(mobileMenuButton);
        }
    } else {
        if (!mobileMenuButton.parentElement) {
            logo.after(mobileMenuButton);
        }
        navLinks.style.display = isMenuOpen ? 'flex' : 'none';
    }
}); 