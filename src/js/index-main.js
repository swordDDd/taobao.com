require.config({
  paths: {
    jquery: './jquery.min',
    index: './lib/index',
    cookie: './cookie',
  }
})

require(['index'], function (i) {
  i.isLogin()
  i.loadingHover()
  i.render()
})