/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4f46e5', // Indigo 600
                    hover: '#4338ca', // Indigo 700
                    light: '#818cf8', // Indigo 400
                },
                secondary: {
                    DEFAULT: '#06b6d4', // Cyan 500
                    hover: '#0891b2', // Cyan 600
                },
                accent: {
                    DEFAULT: '#f59e0b', // Amber 500
                    hover: '#d97706', // Amber 600
                },
                dark: {
                    bg: '#0f172a', // Slate 900
                    card: '#1e293b', // Slate 800
                    text: '#f8fafc', // Slate 50
                },
                light: {
                    bg: '#f8fafc', // Slate 50
                    card: '#ffffff', // White
                    text: '#0f172a', // Slate 900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
