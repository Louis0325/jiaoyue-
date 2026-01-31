// 手動新增作品資料
const worksData = [
    {
        id: 'work_1',
        titleKey: 'work_1_title',
        descriptionKey: 'work_1_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_1.jpg',
        link: 'https://www.penup.com/artwork/1759028799148272?collectionEnabled=false'
    },
    {
        id: 'work_2',
        titleKey: 'work_2_title',
        descriptionKey: 'work_2_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_2.jpg',
        link: 'https://www.penup.com/artwork/1759029266151522?collectionEnabled=false'
    },
    {
        id: 'work_3',
        titleKey: 'work_3_title',
        descriptionKey: 'work_3_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_3.jpg',
        link: 'https://www.penup.com/artwork/1762044722308932?collectionEnabled=false'
    },
    {
        id: 'work_4',
        titleKey: 'work_4_title',
        descriptionKey: 'work_4_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_4.jpg',
        link: 'https://store.line.me/stickershop/product/32440569/zh-Hant'
    },
    {
        id: 'work_5',
        titleKey: 'work_5_title',
        descriptionKey: 'work_5_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_5.jpg',
        link: 'https://www.penup.com/artwork/1766814201794042?collectionEnabled=false'
    },
    {
        id: 'work_6',
        titleKey: 'work_6_title',
        descriptionKey: 'work_6_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_6.jpg',
        link: 'https://www.penup.com/artwork/1769162825237302?collectionEnabled=false'
    },
    {
        id: 'work_7',
        titleKey: 'work_7_title',
        descriptionKey: 'work_7_desc',
        tools: 'PENUP',
        imageUrl: 'images/work_7.jpg',
        link: 'https://www.penup.com/artwork/1769357171008862?ref=app'
    },
];

const itemsPerPage = 24; // 每頁顯示 24 個
let currentPage = 1;

// 監聽語言變更事件 (由 lang.js 觸發)
window.addEventListener('languageChanged', (e) => {
    // 重新渲染作品列表以更新文字
    if (document.getElementById('gallery')) renderGallery(currentPage);
});

function renderGallery(page) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = worksData.slice(start, end);

    pageItems.forEach(item => {
        const card = document.createElement('div'); // 改為 div，不再是直接連結
        card.className = 'work-card';
        card.onclick = () => openModal(item); // 點擊觸發彈窗

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.titleKey}">
            <div class="work-card-text">
                <h3>${window.translations[window.currentLang]?.[item.titleKey] || item.titleKey}</h3>
                <p>${window.translations[window.currentLang]['tools_label']}${item.tools}</p>
            </div>
        `;
        gallery.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(worksData.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderGallery(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(btn);
    }
}

// 彈窗相關變數
const modal = document.getElementById('workModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTools = document.getElementById('modalTools');
const modalLink = document.getElementById('modalLink');
const closeBtn = document.querySelector('.close-btn');

// 開啟彈窗
function openModal(item) {
    modal.style.display = 'flex';
    modalImg.src = item.imageUrl;
    modalTitle.innerText = window.translations[window.currentLang]?.[item.titleKey] || item.titleKey;
    modalDesc.innerText = window.translations[window.currentLang]?.[item.descriptionKey] || item.descriptionKey;
    modalTools.innerText = window.translations[window.currentLang]['tools_label'] + item.tools;

    // 如果有連結則顯示，否則隱藏連結按鈕
    if (item.link && item.link !== '#') {
        modalLink.href = item.link;
        modalLink.style.display = 'inline-block';
    } else {
        modalLink.style.display = 'none';
    }
}

// 關閉彈窗
function closeModal() {
    modal.style.display = 'none';
}

// 事件監聽
closeBtn.onclick = closeModal; // 點擊 X 關閉
window.onclick = (e) => { if (e.target == modal) closeModal(); }; // 點擊背景關閉
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal(); // 按 ESC 關閉
});

// --- 主題切換 ---
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}

// 監聽系統主題變更 (如果使用者沒有手動設定過，則跟隨系統)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. 應用儲存的主題或自動偵測系統主題
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(systemPrefersDark ? 'dark' : 'light');
    }
    // 2. 應用儲存的語言或預設語言
    if (window.changeLanguage) window.changeLanguage(window.currentLang);

    // 3. 更新頁尾年份
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});

// --- 手機滑動偵測 (左右滑動關閉彈窗/回到首頁) ---
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 75; // 滑動觸發門檻 (px)
    // 如果滑動距離超過門檻，且彈窗是開啟的，則關閉彈窗 (回到作品列表)
    if (Math.abs(touchEndX - touchStartX) > swipeThreshold) {
        if (modal.style.display === 'flex') {
            closeModal();
        }
    }
}