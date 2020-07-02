requirejs.config({
  paths: {
    jquery: '../js/jquery.min',
    reg: '../js/lib/reg',
    shake: '../js/shake',
    md5: './jquery.md5'
  },
  shim: {
    md5: ['jquery']
  }
})

require(['md5', 'reg'], function (md5, r) {
  r.check()
  r.reg_check()
})