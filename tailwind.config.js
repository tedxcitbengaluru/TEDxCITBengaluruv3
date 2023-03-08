/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'ted-red-100': '#e62b1e',
                'ted-red-200': '#e62b1e40',
                'ted-red-300': '#e62b1e1a',
                'ted-black-100': '#1f1d1d',
                'ted-black-200': '#1f1d1d40',
                'ted-black-300': '#1f1d1d1a',
                'ted-white-100': '#ffffff',
                'ted-white-200': '#ffffff40',
                'ted-white-300': '#ffffff1a'
            },
            fontFamily: {
                ted: ['SofiaPro', 'sans-serif']
            },
            animation: {
                'spin-once': 'spin 500ms ease-in-out'
            }
        }
    },
    plugins: []
};
