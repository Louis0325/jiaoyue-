window.tailwind = {
    config: {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {

                    dark: {
                        bg: 'rgb(var(--dark-bg) / <alpha-value>)',
                        card: 'rgb(var(--dark-card) / <alpha-value>)',
                        border: 'rgb(var(--dark-border) / <alpha-value>)',
                    },

                    light: {
                        bg: 'rgb(var(--light-bg) / <alpha-value>)',
                        card: 'rgb(var(--light-card) / <alpha-value>)',
                        border: 'rgb(var(--light-border) / <alpha-value>)',
                    },
                    accentBlue: 'rgb(var(--accent-blue) / <alpha-value>)',
                }
            }
        }
    }
}