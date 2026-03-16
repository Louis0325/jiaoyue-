/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./js/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                darkBg: 'rgb(var(--dark-bg) / <alpha-value>)',
                darkCard: 'rgb(var(--dark-card) / <alpha-value>)',
                darkBorder: 'rgb(var(--dark-border) / <alpha-value>)',
                lightBg: 'rgb(var(--light-bg) / <alpha-value>)',
                lightCard: 'rgb(var(--light-card) / <alpha-value>)',
                lightBorder: 'rgb(var(--light-border) / <alpha-value>)',
                accentBlue: 'rgb(var(--accent-blue) / <alpha-value>)',
            }
        }
    },
    plugins: [],
}