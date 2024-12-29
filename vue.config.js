module.exports = {
  css: {
    loaderOptions: {
      scss: {
        api: 'modern',
        sassOptions: {
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
        },
        additionalData: `@import "./styles/theme.scss";`,
      },
    },
  },
}
