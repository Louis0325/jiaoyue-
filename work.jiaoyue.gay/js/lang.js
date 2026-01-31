// 整合所有語言檔
window.translations = {
    'zh': typeof translationsZh !== 'undefined' ? translationsZh : {},
    'zh-cn': typeof translationsZhCn !== 'undefined' ? translationsZhCn : {},
    'en': typeof translationsEn !== 'undefined' ? translationsEn : {},
    'ja': typeof translationsJa !== 'undefined' ? translationsJa : {},
    'ko': typeof translationsKo !== 'undefined' ? translationsKo : {}
};

// 偵測瀏覽器語言
function getBrowserLanguage() {
    const lang = (navigator.language || navigator.userLanguage).toLowerCase();
    if (lang.startsWith('zh')) {
        // 判斷簡體中文 (zh-CN, zh-SG)
        if (lang.includes('cn') || lang.includes('sg')) {
            return 'zh-cn';
        }
        // 其他繁體中文 (zh-TW, zh-HK, zh-MO, zh)
        return 'zh';
    }
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('ko')) return 'ko';

    return 'zh'; // 預設語言
}

// 初始化當前語言
window.currentLang = localStorage.getItem('lang') || getBrowserLanguage();

// 切換語言函式
window.changeLanguage = function (lang) {
    window.currentLang = lang;
    localStorage.setItem('lang', lang); // 保存語言選擇

    const t = window.translations[lang];

    // 更新網頁標題
    if (t && t['website_title']) {
        document.title = t['website_title'];
    }

    // 更新 HTML lang 屬性
    const langMap = { 'zh': 'zh-Hant', 'zh-cn': 'zh-Hans' };
    document.documentElement.lang = langMap[lang] || lang;

    // 更新靜態文字 (data-i18n)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t && t[key]) el.innerText = t[key];
    });

    // 更新 aria-label (data-i18n-aria)
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (t && t[key]) el.setAttribute('aria-label', t[key]);
    });

    // 更新下拉選單
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = lang;

    // 觸發自定義事件通知 script.js 更新作品列表
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
};