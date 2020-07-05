let sum = 0
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
                            <a href="javascript:;" class="J_Minus no-minus">-</a>
                            <input type="text" class="text text-amount" min="1" value="${arr[0].num}" max="${elm.pro_nums}">
                            <a href="javascript:;" class="J_Plus plus">+</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="td td-sum">
                      <div class="td-inner">
                        <em class="number" tabindex="0">￥${(arr[0].num*elm.pro_tPrice).toFixed(2)}</em>
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
                $('.J_CheckBoxItem,input[name=select-all]').prop('checked', $(this).prop('checked'))
              })

              // console.log($('.text-amount').val())
              $('.text-amount').each(function () {
                if ($(this).val() > 1) {
                  $(this).siblings().eq(0).removeClass('no-minus').addClass('minus')
                } else {
                  $(this).siblings().eq(0).removeClass('minus').addClass('no-minus')
                }
              })
            }
          });
        }
      },
      cartOp: function () {
        $('.item-body').on('click', '.J_CheckBoxItem', function () {
          if ($('.J_CheckBoxItem:checked').length === $('.J_CheckBoxItem').length) {
            $('input[name=select-all]').each(function () {
              $(this).prop('checked', true)
            })
          } else {
            $('input[name=select-all]').each(function () {
              $(this).prop('checked', false)
            })
          }

          if ($(this).prop('checked')) {
            $('#J_SelectedItemsCount').html(Number($('#J_SelectedItemsCount').html()) + 1)
            $('.submit-btn').removeClass('submit-btn-disabled')

            sum += Number($(this).parents().filter('.item-content').find('.td-sum').find('em').html().slice(1))
            $('#J_Total')[0].innerText = ` ￥ ${sum.toFixed(2)}`
          } else {
            if ($('.J_CheckBoxItem:checked').length == 0) {
              $('.submit-btn').addClass('submit-btn-disabled')
            }
            $('#J_SelectedItemsCount').html(Number($('#J_SelectedItemsCount').html()) - 1)

            sum -= Number($(this).parents().filter('.item-content').find('.td-sum').find('em').html().slice(1))
            $('#J_Total')[0].innerText = ` ￥ ${sum.toFixed(2)}`
          }
        })
      },
      rAndA: function () {
        $('.item-body').on('click', '.J_Minus', function () {
          if ($(this).siblings().eq(0).val() > 1) {
            $(this).siblings().eq(0).val(Number($(this).siblings().eq(0).val()) - 1)
            $(this).parents().filter('.item-content').find('.td-sum').find('em')
              .html(`￥${($(this).siblings().eq(0).val() * $(this).parents().filter('.item-content').find('.price-now')
                .html().slice(1)).toFixed(2)}`)

            if ($(this).parents().filter('.item-content').find('.J_CheckBoxItem').prop('checked')) {
              sum -= Number($(this).parents().filter('.item-content').find('.price-now')
                .html().slice(1))
              $('#J_Total')[0].innerText = ` ￥ ${sum.toFixed(2)}`
            }

            if ($(this).siblings().eq(0).val() == 1) {
              $(this).removeClass('minus').addClass('no-minus')
            }
          }
        })

        $('.item-body').on('click', '.J_Plus', function () {
          if (Number($(this).siblings().eq(1).val()) < Number($(this).siblings().eq(1).attr('max'))) {

            $(this).siblings().eq(1).val(Number($(this).siblings().eq(1).val()) + 1)

            $(this).parents().filter('.item-content').find('.td-sum').find('em')
              .html(`￥${($(this).siblings().eq(1).val() * $(this).parents().filter('.item-content').find('.price-now')
                .html().slice(1)).toFixed(2)}`)

            if ($(this).parents().filter('.item-content').find('.J_CheckBoxItem').prop('checked')) {
              sum += Number($(this).parents().filter('.item-content').find('.price-now')
                .html().slice(1))
              $('#J_Total')[0].innerText = ` ￥ ${sum.toFixed(2)}`
            }
          }

          if ($(this).prev().val() > 1) {
            $(this).prev().prev().removeClass('no-minus').addClass('minus')
          } else if ($(this).prev().val() == 1) {
            $(this).prev().prev().removeClass('minus').addClass('no-minus')
          }
        })

        $('.item-body').on('input', '.text-amount', function () {
          if ($(this).val() != '' && Number($(this).val()) < Number($(this).attr('max'))) {
            console.log()
            $(this).parents().filter('.item-content').find('.td-sum').find('em').html(`￥${($(this).val()*$(this).parents().filter('.item-content').find('.price-now')
            .html().slice(1)).toFixed(2)}`)

          }
          if ($(this).val() > 1) {
            $(this).prev().removeClass('no-minus').addClass('minus')
          } else if ($(this).val() == 1) {
            $(this).prev().removeClass('minus').addClass('no-minus')
          }
        })
      }

    }
  } else {
    location.href = `${baseUrl}/src/html/login.html`
  }
})