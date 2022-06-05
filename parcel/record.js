import ID from './signup.js'
import * as mod from './module.js'

var money="";
// 0支出 1收入
var click_op = 0;
//spend
var t = document.getElementById("spend");
//name
var n = document.getElementById("na");
//date
var d = document.getElementById("da")

var today = new Date()


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
    $('#fin ')
    //use this in date:`${mod.datetransfer(mod.StringtoInt(today.getMonth())+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`
  })

  $('#accounting #everyday_earn #add_deals_btn').click((event)=> {
    event.preventDefault()
    t.value = ""
    n.value = ""
    d.value = "05/13/2022"
  })
  
  $('#add_deals .bar').click((event) => {
    event.preventDefault()
    console.log(3)
    $('#accounting').css("display", "flex")
    setTimeout(function(){       
        $('#add_deals').css("display", "none")
        $('#add_deals').css("transform", "translateX(100%)")
    },100)
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


$('#navbar').click((event) => {
  event.preventDefault()
  getdetailincome()
  getdetailexpenditure()
})

function getdetailincome(){
  var today= new Date()
  $.get('./getmainpagedetail',{
      id:ID,
      date: today.getDate(),
      month: today.getMonth()+1,
      year: today.getFullYear()
  },(data)=>{
      if(data!="nothing"){
          const container = document.querySelector('#main #accounting .income')
          container.innerHTML=`<p></p>`
          for (var i in data){
              var item= mod.gettabledata(data,'items',i)
              var value = mod.gettabledata(data, 'cost',i)
              var type = mod.gettabledata(data, 'type', i)
              //console.log(item, value, type)
              if(item == ''||value == ''|| type === '0'){
                  continue;
              }
              //create element
              const container = document.querySelector('#main #accounting .income')
              const box= document.createElement('a')
              const paragraphone = document.createElement('P')
              const paragraphtwo = document.createElement('P')
              //set text
              paragraphone.textContent= `${item}`
              paragraphtwo.textContent=`+${value}`
              //set attribute
              box.setAttribute('id','a')
              paragraphone.setAttribute('class','text')
              paragraphtwo.setAttribute('class','text')
              //append child
              container.appendChild(box)
              box.appendChild(paragraphone)
              box.appendChild(paragraphtwo)
          }
      }
      else{

      }
  }
  )
}
function getdetailexpenditure(){
  var today= new Date()
  $.get('./getmainpagedetail',{
      id:ID,
      date: today.getDate(),
      month: today.getMonth()+1,
      year: today.getFullYear()
  },(data)=>{
      if(data!="nothing"){
          const container = document.querySelector('#main #accounting .expenditure')
          container.innerHTML=`<p></p>`
          for (var i in data){
              var item= mod.gettabledata(data,'items',i)
              var value = mod.gettabledata(data, 'cost',i)
              var type = mod.gettabledata(data, 'type', i)
              //console.log(type)
              if(item == ''||value == ''|| type === '1'){
                  continue;
              }
              //create element
              const container = document.querySelector('#main #accounting .expenditure')
              const box= document.createElement('a')
              const paragraphone = document.createElement('P')
              const paragraphtwo = document.createElement('P')
              //set text
              paragraphone.textContent= `${item}`
              paragraphtwo.textContent=`-${value}`
              //set attribute
              box.setAttribute('id','a')
              paragraphone.setAttribute('class','text')
              paragraphtwo.setAttribute('class','text')
              //append child
              container.appendChild(box)
              box.appendChild(paragraphone)
              box.appendChild(paragraphtwo)
          }
      }
      else{

      }
  }
  )
}

$('#popup #background #box #confirm').click(function(){
  $('#popup').css('display', 'none')
})