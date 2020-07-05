define(['jquery', 'cookie', 'index'], function ($, cookie, index) {
  if (cookie.get('loginInfo')) {
    return {
      load: function () {
        index.isLogin()
        index.loadingHover()
      },
      renderC: function () {
        let shop = cookie.get('shop');
        if (shop) {
          shop = JSON.parse(shop)
          let idList = shop.map(elm => elm.id).join()

          $.ajax({
            type: "get",
            url: `${baseUrl}/interface/get-cart.php`,
            data: {
              id: idList
            },
            dataType: "json",
            success: function (res) {
              let tempCart = '';
              res.forEach(elm => {
                let pic = JSON.parse(elm.pro_img)

                let arr = shop.filter(val => val.id == elm.pro_id)

                tempCart += `
                  <ul class="item-content clearfix">
                    <li class="td td-chk">
                      <div class="td-inner">
                        <div style="height: 82px;">
                          <div class="cart-checkbox">
                            <input type="checkbox" class="J_CheckBoxItem">
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="td td-item">
                      <div class="td-inner">
                        <div class="item-pic">
                          <a href="${baseUrl}/src/html/detail.html?id=${arr[0].id}">
                            <img src="${baseUrl}/src/img/${pic[0].src}" alt="">
                          </a>
                        </div>
                        <div class="item-info">
                          <div class="item-basic-info">
                            <a href="${baseUrl}/src/html/detail.html?id=${arr[0].id}" class="item-title">
                              ${elm.pro_title}</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="td td-info">
                      <div class="item-props item-props-can">
                        <p class="sku-line">颜色分类</p>
                      </div>
                    </li>
                    <li class="td td-price">
                      <div class="td-inner">
                        <div class="item-price price-promo-">
                          <div class="price-content">
                            <div class="price-line">
                              <em class="price-original">￥${elm.pro_price}</em>
                            </div>
                            <div class="price-line">
                              <em class="price-now">￥${elm.pro_tPrice}</em>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="td td-amount">
                      <div class="td-inner">
                        <div class="amount-wrapper">
                          <div class="item-amount">
                            <a href="#" class="J_Minus no-minus">-</a>
                            <input type="text" class="text text-amount" min="1" value="${arr[0].num}" max="${elm.pro_nums}">
                            <a href="#" class="J_Plus plus">+</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="td td-sum">
                      <div class="td-inner">
                        <em class="number" tabindex="0">￥${arr[0].num*elm.pro_tPrice}</em>
                      </div>
                    </li>
                    <li class="td td-op">
                      <div class="td-inner">
                        <a href="javascript:;" class="btn-fav">移入收藏夹</a>
                        <a href="javascript:;" class="btn-fav">删除</a>
                      </div>
                    </li>
                  </ul>
                `
              })
              $('.item-body').append(tempCart)
            },
            complete: function () {
              $('input[name=select-all]').on('click', function () {
                if ($(this).is(':checked') == true) {
                  $('input[name=select-all]').each(function () {
                    $(this).attr('checked', true)
                  })
                  console.log($('input[name=select-all]'))
                  $('.J_CheckBoxItem').each(function () {
                    $(this).attr('checked', true)
                  })
                } else {
                  $('input[name=select-all]').each(function () {
                    $(this).attr('checked', false)
                  })
                  $('.J_CheckBoxItem').each(function () {
                    $(this).attr('checked', false)
                  })
                  // console.log($('input[name=select-all]'))
                }
              })
            }
          });
        }
      },
      cartOp: function () {
        $('.item-body').on('click', '.J_CheckBoxItem', function () {
          // console.log($('.J_CheckBoxItem').length)
          if ($(this).is(':checked') == true) {} else {}

          if ($('.J_CheckBoxItem:checked').length === $('.J_CheckBoxItem').length) {
            $('input[name=select-all]').attr('checked', true)
          } else {
            $('input[name=select-all]').attr('checked', false)
          }
        })


      }
    }
  } else {
    location.href = `${baseUrl}/src/html/login.html`
  }
})