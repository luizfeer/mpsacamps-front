module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00040f',
        secondary: '#00f6ff',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)'
      },
      fontFamily: {
        poppins: ['Rajdhani', 'sans-serif']
      }
    }
  },
  plugins: []
}
