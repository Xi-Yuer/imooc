module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 主题
  darkMode: 'class',
  theme: {
    extend: {
      // 自定义 fontSize
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.42rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        lg: ['0.65rem', '0.75rem'],
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b',
      },
      height: {
        header: '72px',
        main: 'cale(100vh -72px )',
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
        'success-100': '#f2f9ec',
        'success-200': '#e4f2db',
        'success-300': '#7ec050',
        'warn-100': '#fcf6ed',
        'warn-200': '#f9ebd9',
        'warn-300': '#f2c9a7',
        'error-100': '#faf0f0',
        'error-200': '#f9dcdc',
        'error-300': '#f2a9a9',
      },
      // 让scrollbar支持暗黑模式
      variants: {
        scrollbar: ['dark'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
