requirejs.config({
  paths: {
    jquery: './jquery.min',
    login: './lib/login',
    md5: './jquery.md5'
  },
  shim: {
    md5: ['jquery']
  }
})

require(['md5', 'login'], function (md5, l) {
  l.check()
})