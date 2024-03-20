/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E8EEED",
          road: "#FFFFFA",
          logo: "#EF283B",
          button: "#98BFBF",
          button_hover: "#FDCA6B",
          text: "#3E4244",
          card_background: "#FFFFF9",
          button_text: "#FFFFFF",
          inner_card_top: "#EFF0ED",
          inner_card_board: "#F6F7F6",
          color1: "#3A82AF",
          color2: "#FCBE5B",
          color3: "#FE4A65",
          color4: "#1FCF7F",
          color5: "#FABC04",
          bronze_from: "#C9A67F",
          bronze_to: "#E0BB92",
          sliver_from: "#C3CFD9",
          sliver_to: "#E2E9EF",
          gold_from: "#EFC146",
          gold_to: "#FBEC7C",
          diamond_from: "#AADBDC",
          diamond_to: "#C1F9F7",
          ruby_from: "#CE5C59",
          ruby_to: "#EF8E89",
        },
        secondary: {
          DEFAULT: "#272A2D",
          text: "#EEEBDE",
          button: "#5B7072",
          card_background: "#3D434A",
          inner_card_top: "#677076",
          inner_card_board: "#F6F7F6",
        },
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 50%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
