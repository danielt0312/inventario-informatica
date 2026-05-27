/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        "./index.html",
    ],
    theme: {
        extend: {
            colors: {
                sand: {
                    DEFAULT: '#D4C092',
                    dark: '#AC9366',
                }
            }
        },
        container: {
            padding: {
                DEFAULT: '1rem',
            },
        },
    }
}
