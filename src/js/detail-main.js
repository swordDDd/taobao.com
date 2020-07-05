require.config({
  paths: {
    jquery: './jquery.min',
    detail: './lib/detail',
    index: './lib/index',
    cookie: './cookie'
  }
})

require(['jquery', 'detail'], function ($, d) {
  d.load()
  d.renderD(function (id) {
    $('.tb-btn-add a').on('click', function () {
      d.addItem(id, $('.tb-stock input').val())
    })
  })
  d.leftTabs()
  d.loupe()
  d.addReduce()
})