

(function () {
    try {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;


        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {
        console.error('Theme initialization error:', e);
    }
})();


function enableDarkTheme() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon();
}

function enableLightTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateThemeIcon();
}


window.toggleTheme = function () {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }
};


function updateThemeIcon() {

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        const isDark = document.documentElement.classList.contains('dark');

        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
}


document.addEventListener('DOMContentLoaded', updateThemeIcon);