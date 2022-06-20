// open/close accounting
import * as mod from './module.js'
$('#accounting #everyday_earn #add_deals_btn').click(function(){
  var today = new Date()
  $('#add_deals').css("display", "flex")
  
  setTimeout(() => {
      $('#add_deals').css("transform", "translateX(0%)")
      $('#fin input[name=date]').val(`${mod.datetransfer(today.getMonth()+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`)
  }, 100)
})

$('#add_deals .bar #back').click(function(){
  $('#add_deals').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#add_deals').css("display", "none")
  }, 500)
})
/*
$('#accounting .bar #back').click(function(){
  $('#accounting').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#accounting').css("display", "none")
    $('#mainpage').css("display","flex")
    $('#mainpage').css("transform", "translateX(0%)")
    $('#accounting').css("transform", "translateX(0%)")
  }, 100)
})*/

