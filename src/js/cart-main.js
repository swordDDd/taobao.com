require.config({
  paths: {
    jquery: './jquery.min',
    index: './lib/index',
    cart: './lib/cart',
    cookie: './cookie'
  }
})

require(['cart'], function (cart) {
  cart.load()
  cart.renderC()
  cart.cartOp()
  cart.rAndA()
  cart.delete()
})