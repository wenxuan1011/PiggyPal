import ID from './signup.js'
import jquery from 'jquery'
var money="";
// 0支出 1收入
var click_op = 0;
var t = document.getElementById("spend");
window.$ = window.jQuery = jquery

$(document).ready(function() {
/*
  // sign up
  $('#signup button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./signup', {
      name: $('#signup input[name=name]').val(),
      id: $('#signup input[name=id]').val(),
      password: $('#signup input[name=password]').val(),
    }, (data) => {
      $("#signup-output").html(`${data}`);
    });
  })
  
  $('#login button[type="submit"]').click((event)=> {
    event.preventDefault()
    $.get('./login', {
      id: $('#login input[name=id]').val(),
      password: $('#login input[name=pw]').val()
    }, (data) => {
      ID=data;
    });
  })
*/
  
  $('#save').click((event)=> {
    event.preventDefault()
    $.get('./record', {
      id: ID,
      items: $('#record input[name=items]').val(),
      cost: $('#record input[name=cost]').val(),
      date: $('#record input[name=date]').val(),
      type: click_op
    });
  })
  
});

  $('#expend').click((event)=> {
    event.preventDefault()
    click_op=0
  })
  $('#income').click((event)=> {
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

$('#Display').click(function(){
  $('#record').toggle();
  $('#keyboard').hide();
  $('#ok').hide();
  $('#backspace').hide();
})

$('#spend').click(function(){
  $('#keyboard').show();
  $('#ok').show();
  $('#backspace').show();
  document.activeElement.blur()
})

$('#ok').click(function(){
  $('#keyboard').hide();
  $('#ok').hide();
  $('#backspace').hide();
})
var $j = jQuery.noConflict();
$(function(){
  $j("#da").datepicker();
});


/*
function transmit(){
  return ID
};

export default transmit
*/