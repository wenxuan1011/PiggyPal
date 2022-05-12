import ID from './signup.js'

var TYPE = 0

// open/close personal page
$('#mainpage img').click(function(){
  $('#personal_page').css("transform", "translateX(0%)")
})

$('#personal_page .bar img').click(function(){
  $('#personal_page').css("transform", "translateX(100%)")
})

// open/close financial_setting_page
$('#personal_page #financial_setting .list li').click(function(){
  $('#financial_setting_page').css("transform", "translateX(0%)")
})

$('#financial_setting_page .bar img').click(function(){
  $('#financial_setting_page').css("transform", "translateX(100%)")
})

// change the title of the financial_setting_page
$('#personal_page #financial_setting .list li:nth-child(1)').click(function(){
  $('#financial_setting_page .bar p').html("固定收入")
  $('#financial_setting_page #financial .box:nth-child(1) p').html("收入項目")
  $('#financial_setting_page #financial .box:nth-child(2) p').html("入帳日期")
  $('#financial_setting_page #financial .box:nth-child(3) p').html("收入金額")
  TYPE = 0
})
$('#personal_page #financial_setting .list li:nth-child(2)').click(function(){
  $('#financial_setting_page .bar p').html("固定支出")
  $('#financial_setting_page #financial .box:nth-child(1) p').html("支出項目")
  $('#financial_setting_page #financial .box:nth-child(2) p').html("支出日期")
  $('#financial_setting_page #financial .box:nth-child(3) p').html("支出金額")
  TYPE = 1
})
$('#personal_page #financial_setting .list li:nth-child(3)').click(function(){
  $('#financial_setting_page .bar p').html("固定儲蓄")
  $('#financial_setting_page #financial .box:nth-child(1) p').html("儲蓄項目")
  $('#financial_setting_page #financial .box:nth-child(2) p').html("儲蓄日期")
  $('#financial_setting_page #financial .box:nth-child(3) p').html("儲蓄金額")
  TYPE = 2
})


$(document).ready(function() {
    // change username
    $('#mainpage img').click((event) => {
      event.preventDefault()
      $.get('./username', {
        id: ID,
      }, (data) => {
        $('#personal_page #photo_and_name p').html(`${data}`);
      });
    })

    // update income
    $('#financial button[type="submit"]').click((event) => {
      event.preventDefault()
      $.get('./financial', {
        id: ID,
        type: TYPE,
        item: $('#financial input[name=item]').val(),
        year: $('#financial input[name=year]').val(),
        month: $('#financial input[name=month]').val(),
        day: $('#financial input[name=day]').val(),
        money: $('#financial input[name=money]').val(),
        repeat: $('#financial input[name=repeat]').val(),
      }, (data) => {
        $("#financial-output").html(`${data}`);
      });
    })

    // update information
    $('#personal_page #financial_setting .list li').click((event) => {
      event.preventDefault()
      $.get('./information', {
        id: ID,
        type: TYPE,
      }, (data) => {
        for(let i =0;i<4;i++)  //big problem
          $(`#financial_setting_page form .box:nth-child(${i+1}) input`).html("value",`${data[i+1]}`);
      });
    })
});

