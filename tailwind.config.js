module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

    options: {
      whitelistPatterns: [
        "/bg-coolGray$/",
        "/bg-red$/",
        "/bg-amber$/",
        "/bg-emerald$/",
        "/bg-blue$/",
        "/bg-indigo$/",
        "/bg-violet$/",
        "/bg-pink$/",
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
