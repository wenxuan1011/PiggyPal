// open/close accounting
$('#accounting #everyday_earn #add_deals_btn').click(function(){
  $('#add_deals').css("display", "flex")
  setTimeout(() => {
      $('#add_deals').css("transform", "translateX(0%)")
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

