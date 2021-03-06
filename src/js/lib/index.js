let baseUrl = 'http://localhost/apache/taobao.com'

define(['jquery', 'cookie'], function ($, cookie) {
  return {
    isLogin: function () {
      if (cookie.get('loginInfo')) {
        let lS = JSON.parse(cookie.get('loginInfo')),
          proInfo = JSON.parse(cookie.get('shop'))

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

          $('#U_Exit').on('click', function () {
            cookie.remove('loginInfo')
            location.reload()
          })

          if (proInfo.length) {
            $('#miniCartNum').html(proInfo.length)
            $('.mini-cart-ft p').html(`您的购物车里有${proInfo.length}件商品`)
          }
        }
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
        $(this).siblings().css('display', 'block')
      }, function () {
        $(this).siblings().css('display', 'none')
      })
    },
    render: function () {
      $.ajax({
        type: "get",
        url: `${baseUrl}/interface/get-product.php`,
        dataType: "json",
        success: function (res) {

          let temp = ''
          res.forEach(elm => {

            let imgSrc = JSON.parse(elm.pro_img)[0].src
            temp += `<div class="item">
            <a href="${baseUrl}/src/html/detail.html?id=${elm.pro_id}" class="hotsale-item">
              <div class="img-wrapper">
                <img src="${baseUrl}/src/img/${imgSrc}" alt="">
              </div>
              <h4>${elm.pro_title}</h4>
            </a>
            <p class="info">
              <span class="price">
                <em>￥</em>
                ${elm.pro_tPrice}
              </span>
              <span class="sales">销量:${elm.pro_sales}</span>
            </p>
            <a href="javascript:;" class="item-more">
              <p class="similar">
                <i class="iconfont icon-xinaixin"></i>
                找相似
              </p>
              <p>
                发现更多相似的宝贝 &gt;
              </p>
            </a>
          </div>`
          })
          $('.list').append(temp)
          $('.list').append(temp)
        },
        complete: function () {
          $('.list .item').hover(function () {
            $(this).children().eq(2).css('display', 'block')
          }, function () {
            $(this).children().eq(2).css('display', 'none')
          })
        }
      });
    }

  }

})