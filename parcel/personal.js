import ID from './signup.js'
import * as mod from './module.js'

//need to export to signup.js
var TYPE = 0
var item = document.getElementById("financial_item")
var year = document.getElementById("financial_year")
var month = document.getElementById("financial_month")
var day = document.getElementById("financial_day")
var money = document.getElementById("financial_money")
var repeat = document.getElementById("financial_repeat")

// open/close personal page
$('#mainpage #personal_btn').click(function(){
  $('#personal_page').css("display", "flex")
  setTimeout(() => {
    $('#personal_page').css("transform", "translateX(0%)")
  }, 100)
  
})

$('#personal_page .bar img').click(function(){
  $('#personal_page').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#personal_page').css("display", "none")
  }, 500)
})

// open/close financial_setting_page
$('#personal_page #financial_setting .list li').click(function(){
  $('#financial_setting_page').css("display", "flex")
  setTimeout(() => {
    $('#financial_setting_page').css("transform", "translateX(0%)")
  }, 100)
})

$('#financial_setting_page .bar img').click(function(){
  $('#financial_setting_page').css("transform", "translateX(100%)")
  $("#financial-output").html('')
  setTimeout(() => {
    $('#financial_setting_page').css("display", "none")
  }, 500)
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

// use jquery calendar
$(function(){
  $("#fin_date").datepicker();
});


$(document).ready(function() {
    // change username
    $('#mainpage img').click((event) => {
      event.preventDefault()
      $.get('./username', {
        id: ID,
      }, (data) => {
        $('#personal_page #photo_and_name p').html(`${data}`)
      });
    })

    // update income
    $('#financial button[type="submit"]').click((event) => {
      event.preventDefault()
      $.get('./financial', {
        id: ID,
        type: TYPE,
        item: $('#financial input[name=item]').val(),
        date: $('#financial input[name=date]').val(),
        money: $('#financial input[name=money]').val(),
        repeat: $('#financial input[name=repeat]').val(),
      }, (data) => {
        if(data === '0'){
          $("#financial-output").html(`${data}`)
        }
        else{
          mod.PopUpMessage(2)
        }
        
      });
    })

    // update information
    $('#personal_page #financial_setting .list li').click((event) => {
      event.preventDefault()
      $.get('./information', {
        id: ID,
        type: TYPE,
      }, (data) => {/*
        item.value = data[0]
        year.value = data[1]
        month.value = data[2]
        day.value = data[3]
        money.value = data[4]
        repeat.value = data[5]*/
      });
    })
});
