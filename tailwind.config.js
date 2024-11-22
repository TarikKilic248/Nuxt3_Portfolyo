module.exports = {
  content: ['./components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    extend: {
      backgroundImage: {
        main: 'url(\'/default.jpg\')', // Çift tırnak kullanıldı
      },
    },
  },
  plugins: [],
}
