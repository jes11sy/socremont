// Phone input mask
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('.phone-input');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('8')) {
                value = '7' + value.slice(1);
            }
            if (value.startsWith('7')) {
                let formatted = '+7 (';
                if (value.length > 1) {
                    formatted += value.slice(1, 4);
                }
                if (value.length >= 4) {
                    formatted += ') ';
                }
                if (value.length > 4) {
                    formatted += value.slice(4, 7);
                }
                if (value.length >= 7) {
                    formatted += '-';
                }
                if (value.length > 7) {
                    formatted += value.slice(7, 9);
                }
                if (value.length >= 9) {
                    formatted += '-';
                }
                if (value.length > 9) {
                    formatted += value.slice(9, 11);
                }
                e.target.value = formatted;
            } else if (value.length > 0) {
                e.target.value = '+7 (' + value.slice(0, 3);
                if (value.length > 3) {
                    e.target.value += ') ' + value.slice(3, 6);
                }
                if (value.length > 6) {
                    e.target.value += '-' + value.slice(6, 8);
                }
                if (value.length > 8) {
                    e.target.value += '-' + value.slice(8, 10);
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && e.target.value.length <= 4) {
                e.target.value = '';
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    let isMenuOpen = false;
    
    // Функция для закрытия меню
    const closeMenu = function() {
        mobileMenu.classList.remove('header__mobile-menu--active');
        document.body.classList.remove('no-scroll');
        isMenuOpen = false;
    };
    
    // Функция для открытия меню
    const openMenu = function() {
        mobileMenu.classList.add('header__mobile-menu--active');
        document.body.classList.add('no-scroll');
        isMenuOpen = true;
    };
    
    // Обработчик клика на кнопку меню
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        console.log('Button clicked, isMenuOpen:', isMenuOpen);
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }, true);
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.header__mobile-link, .header__mobile-service, .header__mobile-callback');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside (но не на кнопку) - используем setTimeout чтобы не мешать клику по кнопке
    document.addEventListener('click', function(e) {
        if (isMenuOpen) {
            // Даем время обработчику кнопки сработать первым
            setTimeout(function() {
                if (isMenuOpen) {
                    const clickedButton = e.target.closest('.mobile-menu-btn');
                    const clickedInsideMenu = mobileMenu.contains(e.target);
                    
                    if (!clickedInsideMenu && !clickedButton) {
                        closeMenu();
                    }
                }
            }, 0);
        }
    });
}

// Modal for callback
function initModal() {
    // Кнопки, которые должны открывать модалку обратного звонка
    const callbackBtns = document.querySelectorAll('.btn-callback');
    const mobileCallbackBtn = document.querySelector('.header__mobile-callback');
    const modal = document.getElementById('callbackModal');
    const successModal = document.getElementById('successModal');
    
    const openModal = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeModal = function(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Делегируем клик, чтобы отработали и динамические элементы (например, клоны Swiper)
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.btn-callback, .masters-slider__button, [data-modal-target="callbackModal"]');
        if (target) {
            openModal(e);
        }
    });
    
    // Закрытие всех модалок по кнопке закрытия
    document.querySelectorAll('.custom-modal__close-button, .modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalParent = this.closest('.modal');
            closeModal(modalParent);
        });
    });
    
    // Закрытие модалок по клику на overlay
    document.querySelectorAll('.modal').forEach(modalElement => {
        modalElement.addEventListener('click', function(e) {
            if (e.target === modalElement) {
                closeModal(modalElement);
            }
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-item__header');
        
        if (header) {
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('faq-item--active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('faq-item--active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('faq-item--active');
                } else {
                    item.classList.add('faq-item--active');
                }
            });
        }
    });
}

// Specialists Carousel
function initCarousel() {
    const slider = document.getElementById('specialistsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    let scrollAmount = 0;
    const cardWidth = 330; // 300px card + 30px gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    prevBtn.addEventListener('click', function() {
        scrollAmount = Math.max(0, scrollAmount - cardWidth);
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        scrollAmount = Math.min(maxScroll, scrollAmount + cardWidth);
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update scroll amount on manual scroll
    slider.addEventListener('scroll', function() {
        scrollAmount = slider.scrollLeft;
    });
}

// Функция отправки уведомления в Telegram
async function sendTelegramNotification(formData) {
    // Проверяем наличие конфигурации
    if (typeof telegramConfig === 'undefined' || !telegramConfig.botToken || !telegramConfig.chatId) {
        console.error('Telegram конфигурация не найдена. Проверьте config.js');
        return false;
    }
    
    try {
        const url = `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: formData.message,
                parse_mode: 'HTML'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.ok === true;
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        return false;
    }
}

// Функция определения типа формы
function getFormType(form) {
    if (form.classList.contains('hero__form')) {
        return 'Основная форма';
    } else if (form.classList.contains('discount-form__form') || form.classList.contains('contact-form__form')) {
        return 'Форма скидки 15%';
    } else if (form.classList.contains('custom-modal__form') || form.closest('.modal')) {
        return 'Форма обратного звонка';
    }
    return 'Основная форма';
}

// Функция определения названия страницы
function getPageName() {
    const path = window.location.pathname;
    const pageNames = {
        'index.html': 'Главная страница',
        'remont-stiralnoj-mashiny.html': 'Ремонт стиральной машины',
        'remont-holodilnika.html': 'Ремонт холодильника',
        'remont-sushilnoj-mashiny.html': 'Ремонт сушильной машины',
        'remont-posudomoechnoj-mashiny.html': 'Ремонт посудомоечной машины',
        'remont-vodonagrevatelya.html': 'Ремонт водонагревателя',
        'remont-kofemashiny.html': 'Ремонт кофемашины'
    };
    
    const fileName = path.split('/').pop() || 'index.html';
    return pageNames[fileName] || fileName.replace('.html', '').replace(/-/g, ' ');
}

// Форматирование даты и времени
function formatDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
}

// Form submission handlers
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = form.querySelector('input[type="text"]');
            const phoneInput = form.querySelector('.phone-input') || form.querySelector('input[type="tel"]');
            const agreementCheckbox = form.querySelector('input[type="checkbox"][name="agreement"]');
            
            const name = nameInput?.value.trim();
            const phone = phoneInput?.value.trim();
            
            // Валидация
            if (!name || !phone) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Проверка согласия на обработку данных (если есть чекбокс)
            if (agreementCheckbox && !agreementCheckbox.checked) {
                alert('Пожалуйста, согласитесь с обработкой персональных данных');
                return;
            }
            
            // Получаем город из системы городов
            const currentCity = getCurrentCity();
            const cityName = cityConfig[currentCity]?.name || 'Не определен';
            
            // Определяем тип формы
            const formType = getFormType(form);
            
            // Определяем название страницы
            const pageName = getPageName();
            
            // Формируем сообщение для Telegram
            const message = `🔔 Новая заявка с социальный-ремонт.рф (${cityName})\n\n` +
                          `📄 Страница: ${pageName}\n\n` +
                          `👤 Имя: ${name}\n\n` +
                          `📞 Телефон: ${phone}\n\n` +
                          `📋 Тип заявки: ${formType}\n\n` +
                          `⏰ Время: ${formatDateTime()}`;
            
            // Отправляем в Telegram
            const telegramSent = await sendTelegramNotification({ message });
            
            // Закрываем форму если она в модалке
            const modal = form.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
            
            // Показываем модалку успеха
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            if (!telegramSent) {
                console.log('Данные формы:', { name, phone, city: cityName, formType, pageName });
            }
            
            // Reset form
            form.reset();
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Why Choose Tabs functionality
function initWhyChooseTabs() {
    const tabButtons = document.querySelectorAll('.why-choose__tab-button');
    const tabPanels = document.querySelectorAll('.why-choose__tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('why-choose__tab-button--active');
            });
            
            // Add active class to clicked button
            this.classList.add('why-choose__tab-button--active');
            
            // Hide all panels
            tabPanels.forEach(panel => {
                panel.classList.remove('why-choose__tab-panel--active');
            });
            
            // Show target panel
            const targetPanel = document.querySelector(`.why-choose__tab-panel[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('why-choose__tab-panel--active');
            }
        });
    });
}

// Why Choose Accordion functionality
function initWhyChooseAccordion() {
    const accordionButtons = document.querySelectorAll('.why-choose__accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionItem = this.closest('.why-choose__accordion-item');
            const accordionContent = accordionItem.querySelector('.why-choose__accordion-content');
            const isActive = accordionItem.classList.contains('why-choose__accordion-item--active');
            
            // Close all accordion items
            document.querySelectorAll('.why-choose__accordion-item').forEach(item => {
                item.classList.remove('why-choose__accordion-item--active');
                const content = item.querySelector('.why-choose__accordion-content');
                const btn = item.querySelector('.why-choose__accordion-button');
                if (content) content.classList.remove('why-choose__accordion-content--active');
                if (btn) btn.classList.remove('why-choose__accordion-button--active');
            });
            
            // Toggle current item
            if (!isActive) {
                accordionItem.classList.add('why-choose__accordion-item--active');
                accordionContent.classList.add('why-choose__accordion-content--active');
                this.classList.add('why-choose__accordion-button--active');
            }
        });
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPhoneMask();
    initMobileMenu();
    initModal();
    initFAQ();
    initCarousel();
    initForms();
    initSmoothScroll();
    initHeaderScroll();
    initWhyChooseTabs();
    initWhyChooseAccordion();
});

// Lazy loading for images (optional optimization)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Initialize Masters Slider (Swiper)
function initMastersSlider() {
    const mastersSlider = document.querySelector('.masters-slider__swiper');
    if (!mastersSlider) return;
    
    const prevBtn = document.querySelector('.masters-slider__arrow--prev');
    const nextBtn = document.querySelector('.masters-slider__arrow--next');
    const pagination = document.querySelector('.masters-slider__pagination');
    
    new Swiper(mastersSlider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        pagination: {
            el: pagination,
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            980: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });
}

// Initialize Certificates Slider (Swiper)
function initCertificatesSlider() {
    const certificatesSlider = document.querySelector('.certificates-slider');
    if (!certificatesSlider) return;
    
    const pagination = certificatesSlider.querySelector('.certificates-slider__pagination');
    
    new Swiper(certificatesSlider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: pagination,
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            980: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}

// Initialize Reviews Slider (Swiper)
function initReviewsSlider() {
    const reviewsSlider = document.querySelector('.reviews__slider');
    if (!reviewsSlider) return;
    
    const pagination = reviewsSlider.querySelector('.reviews__pagination');
    
    new Swiper(reviewsSlider, {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: pagination,
            clickable: true,
        },
    });
}

// Initialize repair services slider
function initRepairServicesSlider() {
    const slider = document.querySelector('.repair-services__swiper');
    if (!slider) return;
    
    const nextBtn = document.querySelector('.repair-services__arrow--next');
    const prevBtn = document.querySelector('.repair-services__arrow--prev');
    
    new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            860: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
}

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
        initMastersSlider();
        initCertificatesSlider();
        initReviewsSlider();
        initRepairServicesSlider();
    }
});

// ============================================
// Система работы с городами для Яндекс Директ
// ============================================
// 
// ИНСТРУКЦИЯ ПО НАСТРОЙКЕ:
// 1. Добавьте города в объект cityConfig ниже
// 2. Ключ города должен совпадать с префиксом в URL (например, 'ulyanovsk' для /ulyanovsk/)
// 3. Укажите номер телефона для отображения (phone) и для ссылки tel: (phoneLink)
// 4. phoneLink должен содержать только цифры после +7 (без пробелов, скобок, дефисов)
// 
// ПРИМЕР ИСПОЛЬЗОВАНИЯ:
// Если пользователь переходит по ссылке /ulyanovsk/remont-stiralnoj-mashiny.html,
// то все номера телефонов заменятся на номер для Ульяновска,
// а все ссылки получат префикс /ulyanovsk/
//
// ============================================

// Конфигурация городов с номерами телефонов
const cityConfig = {
    // Ульяновск
    'ulyanovsk': {
        phone: '+7 (984) 500-48-30',      // Номер для отображения на сайте
        phoneLink: '+79845004830',         // Номер для ссылки tel: (только цифры после +7)
        name: 'Ульяновск'
    },
    // Саратов
    'saratov': {
        phone: '+7 (958) 563-51-81',
        phoneLink: '+79585635181',
        name: 'Саратов'
    },
    // Добавьте другие города по необходимости
    // ВАЖНО: ключ города должен совпадать с префиксом в URL!
    
    // Город по умолчанию (используется если город не найден в URL или localStorage)
    'default': {
        phone: '+7 (812) 426-93-26',
        phoneLink: '+78124269326',
        name: 'Санкт-Петербург'
    }
};

// Определение города из URL
function getCityFromUrl() {
    // Вариант 1: Проверяем query-параметр (например, ?city=saratov)
    const urlParams = new URLSearchParams(window.location.search);
    const cityFromQuery = urlParams.get('city');
    if (cityFromQuery) {
        const citySlug = cityFromQuery.toLowerCase();
        if (cityConfig[citySlug]) {
            return citySlug;
        }
    }
    
    // Вариант 2: Проверяем префикс в пути (например, /saratov/index.html)
    const path = window.location.pathname;
    const match = path.match(/\/([^\/]+)\//);
    if (match && match[1]) {
        const citySlug = match[1].toLowerCase();
        // Проверяем, есть ли такой город в конфигурации
        if (cityConfig[citySlug]) {
            return citySlug;
        }
    }
    
    return null;
}

// Получение текущего города (из URL или localStorage)
function getCurrentCity() {
    // Сначала проверяем URL
    const cityFromUrl = getCityFromUrl();
    if (cityFromUrl) {
        // Сохраняем в localStorage
        localStorage.setItem('selectedCity', cityFromUrl);
        return cityFromUrl;
    }
    
    // Если в URL нет города, проверяем localStorage
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity && cityConfig[savedCity]) {
        return savedCity;
    }
    
    // Если ничего не найдено, используем дефолтный город
    return 'default';
}

// Получение конфигурации города
function getCityConfig(citySlug) {
    return cityConfig[citySlug] || cityConfig['default'];
}

// Замена номеров телефонов на странице
function replacePhoneNumbers(citySlug) {
    const config = getCityConfig(citySlug);
    
    // Паттерн для поиска номеров телефонов в разных форматах
    // Поддерживает: +7 (812) 426-93-26, +7(812)426-93-26, +7 812 426 93 26 и т.д.
    const phonePattern = /\+7\s*\(?\d{3,4}\)?\s*\d{3}[\s-]?\d{2}[\s-]?\d{2}/g;
    
    // 1. Находим и заменяем все ссылки с tel:
    // ВАЖНО: Это должно быть первым шагом, чтобы сохранить кликабельность
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        // Заменяем href на правильный номер
        link.setAttribute('href', 'tel:' + config.phoneLink);
        
        // Заменяем текст номера телефона, сохраняя структуру ссылки
        const linkText = link.textContent.trim();
        if (phonePattern.test(linkText)) {
            // Заменяем только текст внутри ссылки, не трогая структуру
            link.textContent = linkText.replace(phonePattern, config.phone);
        } else {
            // Если текста нет или он не содержит номер, устанавливаем номер
            link.textContent = config.phone;
        }
        
        // Убеждаемся, что ссылка остается кликабельной
        link.style.cursor = 'pointer';
        link.setAttribute('aria-label', 'Позвонить по номеру ' + config.phone);
    });
    
    // 2. Находим все текстовые упоминания номеров телефонов в документе
    // Используем TreeWalker для обхода всех текстовых узлов
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Пропускаем текстовые узлы внутри ссылок с tel: (они уже обработаны)
                const parent = node.parentElement;
                if (parent && parent.tagName === 'A' && parent.getAttribute('href')?.startsWith('tel:')) {
                    return NodeFilter.FILTER_REJECT;
                }
                // Пропускаем скрипты и стили
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        const text = node.textContent;
        // Проверяем, содержит ли текстовый узел номер телефона
        if (phonePattern.test(text)) {
            textNodes.push(node);
        }
    }
    
    // 3. Заменяем номера в найденных текстовых узлах
    // Упрощенная версия - просто заменяем текст, не создаем ссылки
    // (ссылки tel: уже обработаны выше)
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const parent = textNode.parentElement;
        
        // Пропускаем текстовые узлы внутри ссылок, кнопок, инпутов
        if (parent && (
            parent.tagName === 'A' || 
            parent.tagName === 'BUTTON' || 
            parent.tagName === 'INPUT' ||
            parent.classList && parent.classList.contains('phone-input')
        )) {
            return; // Уже обработано выше
        }
        
        // Просто заменяем текст номера
        textNode.textContent = text.replace(phonePattern, config.phone);
    });
    
    // 4. Дополнительно проверяем элементы с data-атрибутами или специальными классами
    // ВАЖНО: Не трогаем элементы, которые содержат ссылки tel: - они уже обработаны выше
    const elementsWithPhone = document.querySelectorAll('[data-phone], .phone-number');
    elementsWithPhone.forEach(element => {
        // Пропускаем элементы, которые содержат ссылки tel: (они уже обработаны)
        const hasTelLink = element.querySelector('a[href^="tel:"]');
        if (hasTelLink) {
            return;
        }
        
        const text = element.textContent;
        if (phonePattern.test(text)) {
            element.textContent = text.replace(phonePattern, config.phone);
        }
        // Если есть атрибут data-phone, обновляем его
        if (element.hasAttribute('data-phone')) {
            element.setAttribute('data-phone', config.phoneLink);
        }
    });
    
    // 5. Обрабатываем элементы .phone отдельно, но только если они НЕ содержат ссылок tel:
    // ВАЖНО: Элементы .phone, которые содержат ссылки tel:, уже обработаны в пункте 1
    // Здесь мы НЕ трогаем их, чтобы сохранить кликабельность
    const phoneElements = document.querySelectorAll('.phone');
    phoneElements.forEach(element => {
        // КРИТИЧНО: Если внутри есть ссылка tel:, она уже обработана выше - НЕ ТРОГАЕМ!
        const telLink = element.querySelector('a[href^="tel:"]');
        if (telLink) {
            // Ссылка уже обработана в пункте 1, ничего не делаем
            // Это гарантирует, что ссылка останется кликабельной
            return;
        }
        
        // Только если нет ссылки tel:, но есть текст с номером, можно создать ссылку
        const text = element.textContent.trim();
        if (phonePattern.test(text) && !element.querySelector('a')) {
            // Сохраняем существующие дочерние элементы (например, иконки)
            const imgElements = Array.from(element.querySelectorAll('img'));
            
            // Создаем ссылку tel: если её нет
            const phoneLink = document.createElement('a');
            phoneLink.href = 'tel:' + config.phoneLink;
            phoneLink.textContent = config.phone;
            phoneLink.style.cursor = 'pointer';
            
            // Очищаем элемент и добавляем сохраненные элементы + ссылку
            element.innerHTML = '';
            imgElements.forEach(img => element.appendChild(img.cloneNode(true)));
            element.appendChild(phoneLink);
        }
    });
}

// Добавление метки города к ссылкам
function addCityPrefixToLinks(citySlug) {
    // Если город дефолтный, не добавляем метку
    if (citySlug === 'default') {
        return;
    }
    
    // Режим работы: 'query' (метка ?city=) или 'path' (префикс /city/)
    // 'query' - проще, не требует настройки сервера
    // 'path' - лучше для SEO, но требует настройки .htaccess
    const linkMode = 'query'; // Измените на 'path' если используете .htaccess
    
    const cityPrefix = '/' + citySlug;
    
    // Находим все внутренние ссылки (только те, которые еще не обработаны)
    const links = document.querySelectorAll('a[href]:not([data-city-processed])');
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Пропускаем внешние ссылки, якоря и специальные ссылки
        if (href.startsWith('http://') || 
            href.startsWith('https://') || 
            href.startsWith('#') || 
            href.startsWith('tel:') || 
            href.startsWith('mailto:') ||
            href.startsWith('/policy') ||
            href === 'policy.html' ||
            href.endsWith('policy.html') ||
            href.startsWith('/map-html') ||
            href.startsWith('/otzyvy') ||
            href.startsWith('/masters/') ||
            href.startsWith('/price') ||
            href.startsWith('/about') ||
            href.startsWith('/contacts')) {
            return;
        }
        
        let newHref = href;
        
        if (linkMode === 'query') {
            // Режим с query-параметрами (?city=saratov)
            // Если ссылка уже содержит параметр city, заменяем его
            // Если параметра нет, добавляем его
            
            // Разбираем ссылку на части
            const urlParts = href.split('?');
            const basePath = urlParts[0].split('#')[0];
            const hash = href.includes('#') ? '#' + href.split('#')[1].split('?')[0] : '';
            
            // Обрабатываем существующие параметры
            let searchParams = new URLSearchParams();
            if (urlParts[1]) {
                const existingParams = urlParts[1].split('#')[0];
                searchParams = new URLSearchParams(existingParams);
            }
            
            // Устанавливаем или заменяем параметр city
            searchParams.set('city', citySlug);
            
            // Собираем новую ссылку
            const queryString = searchParams.toString();
            newHref = basePath + (queryString ? '?' + queryString : '') + hash;
        } else {
            // Режим с префиксом в пути (/saratov/index.html)
            // Если ссылка уже содержит префикс города, пропускаем
            if (href.startsWith(cityPrefix + '/') || href === cityPrefix || href.startsWith(cityPrefix + '#')) {
                return;
            }
            
            // Проверяем, не содержит ли ссылка префикс другого города
            const otherCityMatch = href.match(/^\/([^\/]+)\//);
            if (otherCityMatch && otherCityMatch[1] !== citySlug && cityConfig[otherCityMatch[1]]) {
                // Заменяем префикс другого города на текущий
                newHref = href.replace(/^\/[^\/]+\//, cityPrefix + '/');
                link.setAttribute('href', newHref);
                return;
            }
            
            // Если это index.html или index.html#anchor
            if (href === 'index.html' || href.startsWith('index.html#')) {
                newHref = cityPrefix + '/' + href;
            }
            // Если это относительная ссылка на файл (remont-*.html)
            else if (href.includes('.html')) {
                // Проверяем, есть ли якорь
                const parts = href.split('#');
                if (parts.length > 1) {
                    newHref = cityPrefix + '/' + parts[0] + '#' + parts[1];
                } else {
                    newHref = cityPrefix + '/' + href;
                }
            }
            // Если это ссылка начинающаяся с / (но не специальная)
            else if (href.startsWith('/') && !href.startsWith('//')) {
                // Добавляем префикс города перед первым слешем
                newHref = cityPrefix + href;
            }
        }
        
        // Обновляем ссылку
        if (newHref !== href) {
            link.setAttribute('href', newHref);
            // Помечаем ссылку как обработанную, чтобы не обрабатывать её повторно
            link.setAttribute('data-city-processed', 'true');
        }
    });
}

// Инициализация системы городов
function initCitySystem() {
    const currentCity = getCurrentCity();
    
    // Если город определен из URL (метка или префикс), сохраняем его
    const cityFromUrl = getCityFromUrl();
    if (cityFromUrl) {
        localStorage.setItem('selectedCity', cityFromUrl);
    }
    
    // Заменяем номера телефонов на номера для текущего города
    replacePhoneNumbers(currentCity);
    
    // Добавляем метку города к ссылкам (чтобы при переходе город сохранялся)
    addCityPrefixToLinks(currentCity);
    
    // Если пользователь зашел на страницу без метки, но есть сохраненный город,
    // можно добавить метку в URL (опционально, для красоты URL)
    // Раскомментируйте, если хотите, чтобы URL всегда содержал метку города:
    /*
    if (!cityFromUrl && currentCity !== 'default' && linkMode === 'query') {
        const currentUrl = new URL(window.location);
        if (!currentUrl.searchParams.has('city')) {
            currentUrl.searchParams.set('city', currentCity);
            window.history.replaceState({}, '', currentUrl);
        }
    }
    */
    
    // Обработка кликов по ссылкам с меткой города
    // Это нужно для правильной работы навигации
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Проверяем query-параметр city
        if (href.includes('?city=')) {
            const urlParams = new URL(href.split('?')[1]?.split('#')[0] || '');
            const citySlug = urlParams.get('city') || new URLSearchParams(href.split('?')[1] || '').get('city');
            if (citySlug && cityConfig[citySlug]) {
                localStorage.setItem('selectedCity', citySlug);
            }
        }
        
        // Проверяем префикс в пути (например, /saratov/index.html)
        const cityMatch = href.match(/^\/(saratov|ulyanovsk)\/(.+)$/);
        if (cityMatch) {
            const citySlug = cityMatch[1];
            // Сохраняем город в localStorage
            localStorage.setItem('selectedCity', citySlug);
        }
    });
    
    // Наблюдаем за изменениями DOM для обработки динамически добавляемых элементов
    // Это полезно, если номера телефонов добавляются через AJAX или другие динамические методы
    // Флаг для предотвращения бесконечных циклов
    let isUpdating = false;
    let updateTimeout = null;
    
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            // Предотвращаем рекурсивные вызовы
            if (isUpdating) {
                return;
            }
            
            // Очищаем предыдущий таймер (debounce)
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }
            
            let shouldUpdate = false;
            
            mutations.forEach(function(mutation) {
                // Проверяем, были ли добавлены новые узлы
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Пропускаем элементы, которые мы сами создали
                            if (node.classList && (
                                node.classList.contains('phone-link') ||
                                node.hasAttribute('data-city-processed')
                            )) {
                                return;
                            }
                            
                            // Проверяем, содержит ли новый элемент номера телефонов или ссылки
                            const hasPhoneLinks = node.querySelectorAll && node.querySelectorAll('a[href^="tel:"]').length > 0;
                            const hasPhoneText = node.textContent && /\+7\s*\(?\d{3,4}\)?\s*\d{3}[\s-]?\d{2}[\s-]?\d{2}/.test(node.textContent);
                            const hasLinks = node.querySelectorAll && node.querySelectorAll('a[href]:not([data-city-processed])').length > 0;
                            
                            if (hasPhoneLinks || hasPhoneText || hasLinks) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            
            // Если были найдены новые элементы с номерами или ссылками, обновляем с задержкой (debounce)
            if (shouldUpdate) {
                updateTimeout = setTimeout(function() {
                    if (isUpdating) {
                        return;
                    }
                    
                    isUpdating = true;
                    try {
                        replacePhoneNumbers(currentCity);
                        addCityPrefixToLinks(currentCity);
                    } finally {
                        // Используем setTimeout чтобы дать браузеру время обработать изменения
                        setTimeout(function() {
                            isUpdating = false;
                        }, 200);
                    }
                }, 300); // Debounce 300ms
            }
        });
        
        // Начинаем наблюдение за изменениями в body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initCitySystem();
});

// Также вызываем после полной загрузки страницы (на случай, если что-то загружается асинхронно)
window.addEventListener('load', function() {
    const currentCity = getCurrentCity();
    replacePhoneNumbers(currentCity);
    addCityPrefixToLinks(currentCity);
});

