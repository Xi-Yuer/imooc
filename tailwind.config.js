module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 自定义 fontSize
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        lg: ['0.65rem', '0.75rem'],
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
      },
      height: {
        header: '72px',
        main: 'cale(100vh -72px )',
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
      },
    },
  },
  plugins: [],
}