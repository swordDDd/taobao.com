define(['jquery', 'cookie'], function ($, cookie) {
  return {
    isLogin: function () {
      let lS = JSON.parse(cookie.get('loginInfo'))
      if (lS.loginStatus) {
        $('.site-nav-sign').css('display', 'none')
        $('.site-nav-user').css('display', 'block')
        $('.site-nav-login-info-nick').html(`${lS.username}`)
        $('.J_MemberNick').html(`${lS.username}`)

        $('.site-nav-login').hover(function () {
          $(this).addClass('site-nav-menu-hover')
          $($(this).children()[1]).css('display', 'block')
        }, function () {
          $(this).removeClass('site-nav-menu-hover')
          $($(this).children()[1]).css('display', 'none')
        })

        $('.member-logout').css('display', 'none')
        $('.member-login').css('display', 'block')
      }
    },
    loadingHover: function () {
      // 首部导航栏特效
      $('.site-nav-switch , .site-nav-mytaobao , .site-nav-cart , .site-nav-favor , .site-nav-seller , .site-nav-sitemap').hover(function () {
        $(this).addClass('site-nav-menu-hover')
        // $('.site-nav-region-list').css('display', 'block')
        $($(this).children()[1]).css('display', 'block')
      }, function () {
        $(this).removeClass('site-nav-menu-hover')
        $($(this).children()[1]).css('display', 'none')
      })

      // 关闭广告
      $('.icon-guanbi1').on('click', function () {
        $(this).parent().parent().remove()
      })

      // 左侧导航栏
      $('.service-bd li').hover(function () {
        $(this).addClass('on')
      }, function () {
        $(this).removeClass('on')
      })

      $('.service-bd li').on('mouseenter', function () {
        $(this).parent().siblings().css('display', 'block').children().
        eq($(this).index() % 2).css('display', 'block')

        $(this).parent().siblings().css('display', 'block').hover(function () {
          $(this).css('display', 'block').children().eq(0).css('display', 'block')
        }, function () {
          $(this).css('display', 'none').children().eq(0).css('display', 'none')
        })
      })
      $('.service-bd li').on('mouseleave', function () {
        $(this).parent().siblings().css('display', 'none').children().
        eq($(this).index() % 2).css('display', 'none')
      })

      // 右侧选项卡
      $('.notice-hd li').on('mouseenter', function () {
        let index = $(this).index()
        $(this).addClass('selected').siblings().removeClass('selected')

        $('.notice-bd ul').eq(index).addClass('display').removeClass('hide')
          .siblings().removeClass('display').addClass('hide')
      })

      // 右侧app和二维码
      $('li.nav a').hover(function () {
        console.log(1)
        $(this).siblings().css('display', 'block')
      }, function () {
        $(this).siblings().css('display', 'none')
      })
    }

  }


})