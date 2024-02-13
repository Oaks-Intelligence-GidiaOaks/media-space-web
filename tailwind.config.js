/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/lib/esm/**/*.js',],
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
        "primary-red": "#FF3A29"
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
        "step-active": "#3D7100"
      },
    },
  },
  plugins: [ require('tailwind-scrollbar'), require('flowbite/plugin')],
};
