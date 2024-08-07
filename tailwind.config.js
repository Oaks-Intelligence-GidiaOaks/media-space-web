/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      Inter: ["Inter", "san-serif"],
      Montserrat: ["Montserrat", "san-serif"],
    },
    extend: {
      textColor: {
        "primary-dark-green": "#3D7100",
        "primary-bright-green": "#7ADD02",
        "primary-light-green": "#94FC83",
        "primary-gray": "#AEAEAE",
        "primary-light-gray": "#ADADAD",
        "primary-dark-gray": "#4D4D4D",
        "primary-red": "#FF3A29",
        "secondary-white": "#7C8DB5",
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, #CAFFC6 0%, #F9FBFF 100%)',
        'gradient-custom2': 'linear-gradient(to bottom, #FFFFE0 0%, #F9FBFF 100%)',
        'gradient-custom3': 'linear-gradient(to bottom, #FBE9FF 0%, #F9FBFF 100%)',
        'gradient-custom4': 'linear-gradient(to bottom, #FFF4EF 0%, #F9FBFF 100%)',
        'gradient-custom5': 'linear-gradient(to bottom, #7ADD0280 0%, #294D0080 100%)',
      },
      borderColor: {
        "primary-dark-green": "#3D7100",
        "primary-bright-green": "#7ADD02",
        "primary-light-green": "#94FC83",
      },

      backgroundColor: {
        "primary-dark-green": "#3D7100",
        "primary--bright-green": "#7ADD02",
        "primary-gray": "#AEAEAE",
        "primary-black": "#091001",
      },
      fontFamily: {
        "pt-serif": "'PT Serif Caption', serif",
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      boxShadow: {
        "primary-dark": "5px 7px 12px rgba(0,0,0,0.3)",
        "primary-dark-hovered": "7px 9px 14px rgba(0,0,0,0.3)",
      },

      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
