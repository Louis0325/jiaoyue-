// c:\Users\yumin\OneDrive\Desktop\網站\js\lang.js

// 確保 translations 物件存在 (防止載入順序問題)
window.translations = window.translations || {};

// --- 語言選單點擊控制 ---
function toggleLangDropdown(event) {
    if (event) event.stopPropagation(); // 防止冒泡
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// --- 切換語言功能 ---
function changeLang(lang) {
    // 從全域變數獲取翻譯資料
    const t = window.translations[lang];
    if (!t) {
        console.warn(`Language '${lang}' not found.`);
        return;
    }

    // 更新所有帶有 data-t 屬性的元素
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) el.textContent = t[key];
    });

    // 更新當前語言標籤
    const currentLangLabel = document.getElementById('current-lang-label');
    if (currentLangLabel) {
        currentLangLabel.textContent = t.current_lang;
    }

    // 儲存設定
    localStorage.setItem('lang', lang);

    // 嘗試關閉手機版選單
    if (typeof toggleMobileMenu === 'function') {
        toggleMobileMenu(false);
    }

    // 關閉語言下拉選單
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.remove('active');
}

// --- 初始化語言設定 ---
document.addEventListener('DOMContentLoaded', () => {
    // 讀取儲存的語言或預設為中文
    const savedLang = localStorage.getItem('lang') || 'zh';

    // 稍微延遲執行以確保語言檔已載入 (雖然放在 body 底部通常沒問題)
    setTimeout(() => {
        changeLang(savedLang);
    }, 0);

    // 點擊頁面其他地方關閉語言選單
    document.addEventListener('click', () => {
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    });
});