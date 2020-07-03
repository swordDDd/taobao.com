require.config({
  paths: {
    jquery: './jquery.min',
    detail: './lib/detail',
    index: './lib/index',
    cookie: './cookie'
  }
})

require(['detail'], function (d) {
  d.load()
  d.renderD()
  d.leftTabs()
})