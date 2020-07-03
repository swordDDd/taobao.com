define(['jquery', 'index'], function ($, index) {
  return {
    load: function () {
      index.isLogin()
      index.loadingHover()
    },
    renderD: function () {
      let id = location.search.split('=')[1]

      $.ajax({
        type: "get",
        url: `${baseUrl}/interface/get-detail.php`,
        data: {
          id: id
        },
        dataType: "json",
        success: function (res) {
          let pImg = JSON.parse(res.pro_img)
          let pClassify = JSON.parse(res.pro_classify)

          let temp1 = `
                    <div class="tb-booth tb-pic tb-main-pic tb-pic-mode">
                      <a href="javascript:;">
                        <span>
                          <img src="${baseUrl}/src/img/${pImg[1].src}" alt="">
                          <span class="ks-imagezoom-lens"></span>
                        </span>
                      </a>
                      <div class="tb-loupe hide">
                        <img src="${baseUrl}/src/img/${pImg[1].src}" class="bigImg">
                      </div>
                    </div>
                    <ul class="tb-thumb tb-clearfix">
                      <li class="tb-selected">
                        <div class="tb-pic tb-s50">
                          <a href="javascript:;">
                            <img src="${baseUrl}/src/img/${pImg[1].src}" alt="">
                          </a>
                        </div>
                      </li>
                      <li>
                        <div class="tb-pic tb-s50">
                          <a href="javascript:;">
                            <img src="${baseUrl}/src/img/${pImg[2].src}" alt="">
                          </a>
                        </div>
                      </li>
                      <li>
                        <div class="tb-pic tb-s50">
                          <a href="javascript:;">
                            <img src="${baseUrl}/src/img/${pImg[3].src}" alt="">
                          </a>
                        </div>
                      </li>
                      <li>
                        <div class="tb-pic tb-s50">
                          <a href="javascript:;">
                            <img src="${baseUrl}/src/img/${pImg[4].src}" alt="">
                          </a>
                        </div>
                      </li>
                      <li>
                        <div class="tb-pic tb-s50">
                          <a href="javascript:;">
                            <img src="${baseUrl}/src/img/${pImg[5].src}" alt="">
                          </a>
                        </div>
                      </li>
                    </ul>`
          $('.tb-gallery').append(temp1)

          let temp2 = `
                      <div class="tb-title">
                        <h3 class="tb-main-title">
                          ${res.pro_title}
                        </h3>
                      </div>
                      <ul class="tb-meta tb-promo-meta">
                        <li class="tb-detail-price tb-clear J_PriceItem">
                          <span class="tb-property-type">价格</span>
                          <div class="tb-property-cont">
                            <strong style="font-size: 14px;
                            color: rgb(60, 60, 60);
                            font-weight: 400;
                            text-decoration: line-through;">
                              <em class="tb-rmb">￥</em>
                              <em class="tb-rmb-num">${res.pro_price}</em>
                            </strong>
                          </div>
                        </li>
                        <li class="tb-detail-price tb-promo-price tb-clear">
                          <span class="tb-property-type">淘宝价</span>
                          <div class="tb-property-cont">
                            <div class="tb-promo-mod">
                              <div class="tb-promo-hd tb-promo-item">
                                <div class="tb-promo-item-bd">
                                  <strong class="tb-promo-price">
                                    <em class="tb-rmb">￥</em>
                                    <em class="tb-rmb-num">${res.pro_tPrice}</em>
                                  </strong>
                                  <span class="tb-promo-type">心动价</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="tb-detail-price tb-currency-price">
                          <strong class="tb-property-cont">约 USD ${(res.pro_tPrice/7.065).toFixed(2)}</strong>
                        </li>
                        <li class="tb-counter">
                          <div class="tb-counter-bd">
                            <div class="tb-rate-counter">
                              <a href="javascript:;">
                                <strong>${res.pro_comment}</strong>
                                <span>累计评论</span>
                              </a>
                            </div>
                            <div class="tb-sell-counter">
                              <a href="javascript:;">
                                <strong>${res.pro_sales}</strong>
                                <span>交易成功</span>
                              </a>
                            </div>
                          </div>

                        </li>
                      </ul>
                      <div id="J_logistic">
                        <div class="tb-logistic tb-clearfix">
                          <span class="tb-name tb-property-type">配送</span>
                          <div class="tb-logistic-info">
                            <div class="wl-areainfo clearfix">
                              <span class="wl-areacon">
                                <span>浙江金华</span> 至
                                <span>浙江杭州</span>
                              </span>
                            </div>
                            <div class="wl-serviceinfo">
                              <span class="wl-servicetitle"> 快递免运费</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-key tb-key-sku">
                        <div class="tb-skin">
                          <dl class="J_Prop tb-prop tb-clear  J_Prop_Color ">
                            <dt class="tb-property-type">颜色分类</dt>
                            <dd>
                              <ul class="tb-img tb-clearfix"">
                                <li>
                                  <a href=" javascript:;"
                                style="background: url('${baseUrl}/src/img/${pClassify[0].src}')center no-repeat;">
                                <span>${pClassify[0].des}</span>
                                </a>
                                </li>
                                <li>
                                  <a href=" javascript:;"
                                style="background: url('${baseUrl}/src/img/${pClassify[1].src}')center no-repeat;">
                                <span>${pClassify[1].des}</span>
                                </a>
                                </li>
                                <li>
                                  <a href=" javascript:;"
                                style="background: url('${baseUrl}/src/img/${pClassify[2].src}')center no-repeat;">
                                <span>${pClassify[2].des}</span>
                                </a>
                                </li>
                                <li>
                                  <a href=" javascript:;"
                                style="background: url('${baseUrl}/src/img/${pClassify[3].src}')center no-repeat;">
                                <span>${pClassify[3].des}</span>
                                </a>
                                </li>
                                <li>
                                  <a href=" javascript:;"
                                style="background: url('${baseUrl}/src/img/${pClassify[4].src}')center no-repeat;">
                                <span>${pClassify[4].des}</span>
                                </a>
                                </li>
                              </ul>
                            </dd>
                          </dl>
                          <dl class="tb-amount tb-clear">
                            <dt class="tb-property-type">数量</dt>
                            <dd>
                              <span class="tb-stock">
                                <a href="javascript:;" class="tb-reduce J_Reduce tb-disable-reduce">-</a>
                                <input type="text" value="1" maxlength="8" min="1">
                                <a href="javascript:;" class="tb-increase J_Increase">+</a>件
                              </span>
                              <em> (库存
                                <span class="tb-count">${res.pro_nums}</span>
                                件)</em>
                            </dd>
                          </dl>
                          <div class="tb-action tb-clearfix ">
                            <div class="tb-btn-buy">
                              <a href="javascript:;">立即购买</a>
                            </div>
                            <div class="tb-btn-add">
                              <a href="javascript:;">加入购物车</a>
                            </div>
                          </div>
                        </div>
                      </div>`
          $('.tb-wrap-newshop').append(temp2)
          $('title').html(res.pro_title)
        }
      });
    },
    leftTabs: function () {
      $('.tb-gallery').on('mouseenter', '.tb-thumb li', function () {
        $(this).addClass('tb-selected').siblings().removeClass('tb-selected')
        $('.tb-booth img').attr('src', $(this).find('img').attr('src'))
      })
    },
    loupe: function () {

    }

  }
})