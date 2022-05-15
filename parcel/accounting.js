// open/close 新增交易
$('#accounting #everyday_earn img').click(function(){
  $('#add_deals').css("display", "flex")
  setTimeout(() => {
      $('#add_deals').css("transform", "translateX(0%)")
  }, 100)
})

$('#add_deals .bar img').click(function(){
  $('#add_deals').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#add_deals').css("display", "none")
  }, 500)
})