define([], function () {
  return {
    fn: function (callback, wait) {
      let timer = null
      return function () {
        let args = arguments
        if (timer) clearTimeout(timer)

        timer = setTimeout(
          function () {
            callback.apply(this, args)
          }.bind(this),
          wait
        )
      }
    }
  }
})
