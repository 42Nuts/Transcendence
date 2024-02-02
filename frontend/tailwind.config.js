/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8EEED',
          road: '#FFFFFA',
          rogo: '#EF283B',
          button: '#98BFBF',
          button_hover: '#FDCA6B',
          text: '#3E4244',
          card_background: '#FFFFF9',
          button_text: '#FFFFFF',
          inner_card_top: '#EFF0ED',
          inner_card_board: '#F6F7F6',
          color1: '#3A82AF',
          color2: '#FCBE5B',
          color3: '#FE4A65',
          color4: '#1FCF7F',
        },
      }
    },
  },
  plugins: [],
}

