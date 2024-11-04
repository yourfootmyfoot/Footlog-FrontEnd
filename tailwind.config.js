/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#16C79A",
        cardBackground: "#f9f9f9",
      },
      animation: {
        'bounce-custom': 'bounce-custom 1s infinite ease-in-out',
      },
      keyframes: {
        'bounce-custom': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' }, 
        }
      },
    },
  },
  plugins: [],
};
