// 將主要邏輯放在這裡，確保所有外部腳本都已載入
// 平滑滾動至頂部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 滾動追蹤 (ScrollSpy) 功能 ---
const sections = document.querySelectorAll('section, footer#contact');
const navLinks = document.querySelectorAll('#desktop-nav .nav-link');

function updateActiveNav() {
    let current = "";
    const offset = 100; // 滾動偏移量補償

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - offset && window.pageYOffset < sectionTop + sectionHeight - offset) {
            current = section.getAttribute('id');
        }
    });

    // 修正：當滾動到頁面最底部時，強制選中最後一個選項 (聯絡)
    if ((window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 20) {
        current = 'contact';
    }

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// --- 滾動揭露效果 (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 側邊選單控制
function toggleMobileMenu(isOpen) {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (isOpen) {
        menu.classList.add('active');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.remove('active');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// --- 作品集 Modal 控制 ---
function toggleWorksModal(show) {
    const modal = document.getElementById('works-modal');
    const backdrop = document.getElementById('works-modal-backdrop');
    const panel = document.getElementById('works-modal-panel');

    if (!modal || !backdrop || !panel) {
        alert('錯誤：作品集視窗元件遺失！\n請確認 js/works-modal.js 檔案是否正確載入。');
        console.error("Modal element(s) not found! Check if js/works-modal.js is loaded correctly.");
        return;
    }

    if (show) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 鎖定背景滾動

        // 動畫進場
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('opacity-0', 'scale-95');
            panel.classList.add('opacity-100', 'scale-100');
        }, 10);
    } else {
        // 動畫退場
        backdrop.classList.add('opacity-0');
        panel.classList.remove('opacity-100', 'scale-100');
        panel.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            // 每次關閉時重置回作品網格視圖
            if (typeof showWorksGrid === 'function') {
                showWorksGrid();
            }
        }, 300); // 等待 transition 結束
    }
}

// --- 生日倒計時邏輯 ---
function updateBirthdayCountdown() {
    const birthdayMonth = 3; // 3月
    const birthdayDay = 25;  // 25日

    const now = new Date();
    let year = now.getFullYear();
    let nextBirthday = new Date(year, birthdayMonth - 1, birthdayDay);

    // 如果今年生日已過，計算明年的生日
    if (now > nextBirthday) {
        nextBirthday = new Date(year + 1, birthdayMonth - 1, birthdayDay);
    }

    const diff = nextBirthday - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

// 每秒更新一次
setInterval(updateBirthdayCountdown, 1000);
updateBirthdayCountdown();

// 初始化主題與語言
(function init() {
    // 初始化選單高亮
    updateActiveNav();
})();

// 導覽列捲動效果
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

// --- 語言切換動畫封裝 ---
// 攔截原始 changeLang 函數以添加過渡動畫
(function wrapLanguageSwitcher() {
    // 等待原始 changeLang 函數載入
    if (typeof window.changeLang !== 'function') {
        console.error("Original changeLang function not found. Animation wrapper will not be applied.");
        return;
    }

    const originalChangeLang = window.changeLang;

    // --- 1. 決定初始語言 ---
    // 優先從 localStorage 讀取用戶先前的選擇
    let initialLang = localStorage.getItem('lang');
    if (!initialLang) {
        // 若無，則偵測瀏覽器語言
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            if (browserLang.toLowerCase() === 'zh-cn' || browserLang.toLowerCase() === 'zh-sg') {
                initialLang = 'zh-Hans'; // 簡體中文
            } else {
                initialLang = 'zh'; // 繁體中文 (zh-TW, zh-HK, etc.)
            }
        } else if (browserLang.startsWith('en')) {
            initialLang = 'en'; // 英文
        } else if (browserLang.startsWith('ja')) {
            initialLang = 'ja'; // 日文
        } else {
            initialLang = 'zh'; // 預設回退到繁體中文
        }
    }
    // --- 2. 設置初始語言 (無動畫) ---
    originalChangeLang(initialLang);
    let currentLang = initialLang;

    // 動畫執行函數
    const runAnimation = (targetLang, direction, callback) => {
        const elements = document.querySelectorAll('[data-t]');
        const outClass = direction === 'down' ? 'lang-anim-out-down' : 'lang-anim-out-up';
        const inClass = direction === 'down' ? 'lang-anim-in-down' : 'lang-anim-in-up';

        elements.forEach(el => el.classList.add(outClass));

        setTimeout(() => {
            originalChangeLang(targetLang);
            elements.forEach(el => {
                el.classList.remove(outClass);
                el.classList.add(inClass);
            });
            setTimeout(() => {
                elements.forEach(el => el.classList.remove(inClass));
                if (callback) callback();
            }, 300);
        }, 200);
    };

    window.changeLang = function (lang) {
        // 如果語言未變，或為初次載入，直接更新文字不加動畫
        if (lang === currentLang) {
            originalChangeLang(lang);
            return;
        }

        const fromLang = currentLang;
        const toLang = lang;

        // 判斷切換邏輯
        if (fromLang === 'zh' && toLang === 'zh-Hans') { // 繁體中文 > 簡體中文的動畫
            runAnimation('zh-Hans', 'down');
        } else if (fromLang === 'zh' && toLang === 'en') { // 繁體中文 > 英文的動畫
            runAnimation('zh-Hans', 'down', () => {
                runAnimation('en', 'down');
            });
        } else if (fromLang === 'zh' && toLang === 'ja') { // 繁體中文 > 日文的動畫
            runAnimation('zh-Hans', 'down', () => {
                runAnimation('en', 'down', () => {
                    runAnimation('ja', 'down');
                });
            });
        } else if (fromLang === 'zh-Hans' && toLang === 'zh') { // 簡體中文 -> 繁體中文: 上翻
            runAnimation('zh', 'up');
        } else if (fromLang === 'zh-Hans' && toLang === 'en') { // 簡體中文 -> 英文: 下翻
            runAnimation('en', 'down');
        } else if (fromLang === 'zh-Hans' && toLang === 'ja') { // 簡體中文 -> 日文: 下翻到英文 -> 再下翻到日文
            runAnimation('en', 'down', () => {
                runAnimation('ja', 'down');
            });
        } else if (fromLang === 'en' && toLang === 'zh') { // 英文 -> 繁體中文: 上翻到簡體 -> 再上翻到繁體
            runAnimation('zh-Hans', 'up', () => {
                runAnimation('zh', 'up');
            });
        } else if (fromLang === 'en' && toLang === 'zh-Hans') { // 英文 -> 簡體中文: 上翻
            runAnimation('zh-Hans', 'up');
        } else if (fromLang === 'en' && toLang === 'ja') { // 英文 -> 日文：下翻
            runAnimation('ja', 'down');
        } else if (fromLang === 'ja' && toLang === 'en') { // 日文>英文的動畫 上翻
            runAnimation('en', 'up');
        } else if (fromLang === 'ja' && toLang === 'zh-Hans') { // 日文>簡體中文的動畫 上翻到英文再上翻到簡體
            runAnimation('en', 'up', () => {
                runAnimation('zh-Hans', 'up');
            });
        } else if (fromLang === 'ja' && toLang === 'zh') { // 日文>繁體中文的動畫 上翻到英文再上翻到簡體再上翻到繁體
            runAnimation('en', 'up', () => {
                runAnimation('zh-Hans', 'up', () => {
                    runAnimation('zh', 'up');
                });
            });
        } else {
            // 其他未定義的轉換，預設使用下翻動畫
            runAnimation(toLang, 'down');
        }

        currentLang = lang; // 更新當前語言
    };
})();