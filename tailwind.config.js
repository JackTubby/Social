/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
          colors: {
            white: "#F2F2F2",
            black: "#1C1C1C",
            darkGrey: "#232222",
            meidumGrey: "#3E3F3E",
            lightGrey: "#4C4C4C",
            purple: "#9E6DF1",
            pink: "#832E4B",
    },
  },
  plugins: [],
}
