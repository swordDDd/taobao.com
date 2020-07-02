let baseUrl = 'http://localhost/apache/taobao.com'

define(['jquery', 'shake'], function ($, s) {
  return {
    check: function () {
      $('#fm-reg-name').on(
        'input',
        s.fn(function () {
          // 用户名验证
          let reg = /^[a-zA-Z0-9_-]{4,16}$/
          if (!reg.test($(this).val())) {
            $('#reg-error').css('display', 'block')
            $('.reg-error-msg').html('用户名格式不正确')
            $('.fm-button').attr('disabled', true)
          } else {
            $('#reg-error').css('display', 'none')
            $('.fm-button').attr('disabled', false)
          }
        }, 500)
      )
      $('#fm-reg-password').on(
        'input',
        s.fn(function () {
          // 密码验证
          let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/
          if (!reg.test($(this).val())) {
            $('#reg-error').css('display', 'block')
            $('.reg-error-msg').html(
              '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字'
            )
            $('.fm-button').attr('disabled', true)
          } else {
            $('#reg-error').css('display', 'none')
            $('.fm-button').attr('disabled', false)
          }
        }, 500)
      )
      $('#fm-reg-passcheck').on(
        'input',
        s.fn(function () {
          if ($(this).val() === $('#fm-reg-password').val()) {
            $('#reg-error').css('display', 'none')
            $('.fm-button').attr('disabled', false)
          } else {
            $('#reg-error').css('display', 'block')
            $('.reg-error-msg').html('两次密码不一致')
            $('.fm-button').attr('disabled', true)
          }
        }, 500)
      )
      $('#fm-reg-phone').on(
        'input',
        s.fn(function () {
          // 用户名验证
          let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
          if (!reg.test($(this).val())) {
            $('#reg-error').css('display', 'block')
            $('.reg-error-msg').html('手机号格式不正确')
            $('.fm-button').attr('disabled', true)
          } else {
            $('#reg-error').css('display', 'none')
            $('.fm-button').attr('disabled', false)
          }
        }, 500)
      )
    },
    reg_check: function () {
      $('.fm-button').on('click', function () {
        if ($('#fm-reg-name').val() == '') {
          $('#reg-error').css('display', 'block')
          $('.reg-error-msg').html('请输入用户名')
        } else if ($('#fm-reg-password').val() == '') {
          $('#reg-error').css('display', 'block')
          $('.reg-error-msg').html('请输入密码')
        } else if ($('#fm-reg-passcheck').val() == '') {
          $('#reg-error').css('display', 'block')
          $('.reg-error-msg').html('请确认密码')
        } else if ($('#fm-reg-phone').val() == '') {
          $('#reg-error').css('display', 'block')
          $('.reg-error-msg').html('请输入手机号')
        } else if ($('#fm-reg-check').val() == '') {
          $('#reg-error').css('display', 'block')
          $('.reg-error-msg').html('请输入验证码')
        } else {
          $('#reg-error').css('display', 'none')
          $.ajax({
            type: 'get',
            url: `${baseUrl}/interface/reg-check.php`,
            data: {
              username: $('#fm-reg-name').val(),
              password: $.md5($('#fm-reg-password').val()),
              phone: $('#fm-reg-phone').val()
            },
            success: function (res) {
              alert(res)
              location.reload()
            }
          })
        }

      })
    }
  }
})