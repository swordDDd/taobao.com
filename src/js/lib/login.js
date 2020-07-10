let baseUrl = 'http://localhost/apache/taobao.com'

define(['jquery', 'cookie'], function ($, cookie) {
  return {
    check: function () {
      $('.fm-button').on('click', function () {
        let info = JSON.parse(cookie.get('loginInfo'))
        $.ajax({
          type: "post",
          url: `${baseUrl}/interface/login-check.php`,
          data: {
            username: $('#fm-login-id').val(),
            password: $.md5($('#fm-login-password').val())
          },
          dataType: "json",
          success: function (res) {
            if (res.length) {
              alert('用户名或密码错误，请重新输入')
              location.reload()
            } else {
              let loginInfo = {
                loginStatus: true,
                username: res.user_name
              }
              cookie.set('loginInfo', JSON.stringify(loginInfo), 1)
              if ($('#fm-login-id').val() == info.username) {
                alert('当前用户名已登录')
                location.reload()
              } else {
                location.href = `./index.html`
              }

            }
          }
        });

      })
    }
  }
})