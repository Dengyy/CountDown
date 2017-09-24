module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html', 'react'
  ],
  env: {
    browser: true,
  },
  // add your custom rules here
  'rules': {
    // "global-require": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'dev' ? 0 : 2,
    // allow unused variables
    'no-unused-vars': 0
  }
}
