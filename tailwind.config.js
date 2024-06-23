/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: { "raspberry": '#ff3366', "serverbg": '#141414', "rasinblack": "#27292E", "shamrockgreen": "#239C56" }, },
  },
  plugins: [],
}

