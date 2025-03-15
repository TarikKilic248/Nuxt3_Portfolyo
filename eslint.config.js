import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-undef': 'off',
    "no-console": "off",
    "node/prefer-global/process": "off",
  },
  typescript: true,
  vue: true,

})
