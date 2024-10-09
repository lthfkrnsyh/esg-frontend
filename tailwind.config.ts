import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: {
          50: '#F0F6FE',
          100: '#F0F6FE',
          200: '#F0F6FE',
          300: '#F0F6FE',
          400: '#F0F6FE',
          500: '#F0F6FE',
          600: '#F0F6FE',
          700: '#F0F6FE',
          800: '#F0F6FE',
          900: '#F0F6FE',
        },
        darkGreen: {
          50: '#005975',
          100: '#005975',
          200: '#005975',
          300: '#005975',
          400: '#005975',
          500: '#005975',
          600: '#005975',
          700: '#005975',
          800: '#005975',
          900: '#005975',
        },
        darkBlue: '#005975',
        tahunGreen: '#4395B8',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  },
};
export default config;