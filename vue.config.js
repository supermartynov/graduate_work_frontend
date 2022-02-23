module.exports = {
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:2000'
  },
  lintOnSave: false,
  runtimeCompiler: true
}
