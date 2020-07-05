(function ($) {
  $.fn.extend({
    slider: function (options) {
      // 函数式编程
      let main = null, // 主函数
        init = null, // 初始化
        start = null, // 开始动画
        stop = null, // 停止动画
        prev = null, // 上一张
        next = null, // 下一张
        select = null,
        timer = null, // 计时器
        elms = {}, // 命名空间 存储元素
        defaults = {
          speed: 500, // 动画速度
          delay: 3000 // 延迟时间  展示使用
        }

      $.extend(defaults, options) // 合并参数

      init = function () {
        // 1. 元素选取
        elms.sliderDiv = this.children('div') // 选择滑动的div
        elms.btns = this.children('span') // 选择按钮
        elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone()) // 克隆第一张图片
        //  索引 用于记录当前图片的索引
        elms.index = 1 // 第一张图片
        elms.points = this.find('ul>li') // 选择下方的点击按钮

        // 时间绑定
        this.hover(
          function () {
            stop()
          },
          function () {
            timer = setInterval(
              start.bind(null, 1),
              defaults.delay + defaults.speed
            )
          }
        )

        elms.btns.on('click', function () {
          if (elms.btns.index(this)) {
            next()
          } else {
            prev()
          }
        })

        // 给选取到的li添加绑定事件
        elms.points.on('click', function () {
          let index = elms.points.index(this) // 获取当前操作的元素的下标
          $(this).addClass('select').siblings().removeClass('select') // 给当前点击的Dom元素添加一个选中的类
          //   console.log(index)
          elms.index = index + 1 // 将命名空间的index属性赋值为当前选中的下标加一
          // 在点击到当前li,根据下标移动div的距离
          elms.sliderDiv.css(
            'left',
            `-${index * elms.sliderDiv.children('img').width()}px`
          )
        })
      }.bind(this)

      start = function (direction) {
        let left = '-=520px' // 设置移动的距离

        if (!direction) {
          left = '+=520px'
          if (elms.index === 1) {
            // 判断当前为第一张图片
            elms.index = 6 // 切换到第四张图片
            let divLeft = this.offset().left,
              imgLeft = elms.sliderDiv.children('img').last().offset().left
            elms.sliderDiv.css('left', `-${imgLeft - divLeft}px`)
          }
        }
        elms.sliderDiv.animate({
            left: left
          },
          defaults.speed,
          function () {
            if (direction) elms.index++
            else elms.index--
            if (elms.index === 6) {
              // 判断到达最后一张图片
              elms.index = 1 // 将索引设置为1
              elms.sliderDiv.css('left', 0) //  将定位设置为0
            }
            $(elms.points[elms.index - 1])
              .addClass('select')
              .siblings()
              .removeClass('select')
          }
        )
      }.bind(this)

      prev = function () {
        stop()
        start(0)
      }

      next = function () {
        stop()
        start(1)
      }

      stop = function () {
        elms.sliderDiv.stop(true, true)
        clearInterval(timer)
      }

      main = function () {
        init()
        timer = setInterval(
          start.bind(null, 1),
          defaults.speed + defaults.delay
        )
      }

      main()
    }
  })
})(jQuery)