import jquery from 'jquery'
window.$ = window.jQuery = jquery

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
})
$('#personal_page #financial_setting .list li:nth-child(2)').click(function(){
  $('#financial_setting_page .bar p').html("固定支出")
})
$('#personal_page #financial_setting .list li:nth-child(3)').click(function(){
  $('#financial_setting_page .bar p').html("固定儲蓄")
})


$(document).ready(function() {
    // 固定輸入
    $('#financial button[type="submit"]').click((event) => {
      event.preventDefault()
      $.get('./financial', {
        item: $('#financial input[name=item]').val(),
        date: $('#financial input[name=date]').val(),
        money: $('#financial input[name=money]').val(),
        repeat: $('#financial input[name=repeat]').val(),
      }, (data) => {
        
      });
    })
});