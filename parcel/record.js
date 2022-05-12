import ID from './signup.js'

var money="";
// 0支出 1收入
var click_op = 0;
//spend
var t = document.getElementById("spend");
//name
var n = document.getElementById("na");
//date
var d = document.getElementById("da")


$(document).ready(function() {
  
  $('#save').click((event)=> {
    event.preventDefault()
    $.get('./record', {
      id: ID,
      items: $('#fin input[name=items]').val(),
      cost: $('#fin input[name=cost]').val(),
      date: $('#fin input[name=date]').val(),
      type: click_op
    });
    t.value = ""
    n.value = ""
    d.value = "05/13/2022"
  })
  
});

$('#expend').click((event)=> {
  $('#expend').css("border-bottom", "0.3px solid #410ADF")
  $('#income').css("border-bottom", "none")
  event.preventDefault()
  click_op=0
})
$('#income').click((event)=> {
  $('#income').css("border-bottom", "0.3px solid #410ADF")
  $('#expend').css("border-bottom", "none")
  event.preventDefault()
  click_op=1
})

$('#zero').click(function(){
  money = money + "0"
  t.value = money;
})

$('#one').click(function(){
  money = money + "1"
  t.value = money;
})

$('#two').click(function(){
  money = money + "2"
  t.value = money;
})

$('#three').click(function(){
  money = money + "3"
  t.value = money;
})

$('#four').click(function(){
  money = money + "4"
  t.value = money;
})

$('#five').click(function(){
  money = money + "5"
  t.value = money;
})

$('#six').click(function(){
  money = money + "6"
  t.value = money;
})

$('#seven').click(function(){
  money = money + "7"
  t.value = money;
})

$('#eight').click(function(){
  money = money + "8"
  t.value = money;
})

$('#nine').click(function(){
  money = money + "9"
  t.value = money;
})

$('#backspace').click(function(){
  money = money.slice(0, -1)
  t.value = money;
})

$('#spend').click(function(){
  $('#keyboard').css("display", "flex")
  $('#ok').show();
  $('#backspace').show();
  document.activeElement.blur()
})

$('#ok').click(function(){
  $('#keyboard').hide();
  $('#ok').hide();
  $('#backspace').hide();
})

$(function(){
  $("#da").datepicker();
});