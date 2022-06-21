import ID from './signup.js'
import * as mod from './module.js'

// 0支出 1收入
var click_op = 0;
//spend
var t = document.getElementById("spend");
//name
var n = document.getElementById("na");
//date
var d = document.getElementById("da")
//sort
var s = document.getElementById("sort")
//account
var a = document.getElementById("acc")


var today = new Date()

$(document).ready(function() {
  $('#datepick input[name=dates]').val(`${mod.datetransfer(today.getMonth()+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`)
  console.log(123)
  $('#save').click((event)=> {
    
    event.preventDefault()
    if(click_op!==2){
      $.get('./record', {
        id: ID,
        date: $('#fin input[name=date]').val(),
        cost: $('#fin input[name=cost]').val(),
        sort: $('#fin #sort').text(),
        items: $('#fin input[name=items]').val(),
        account: $('#fin #acc').text(),
        note: $('#fin input[name=deals_note]').val(),
        type: click_op
      },(data)=>{
        if(data === '0'){
          t.value = "0"
          n.value = ""
          if(click_op === 0){
            s.innerHTML = "飲食"
          }
          else{
            s.innerHTML = "薪水"
          }
          a.innerHTML = "現金"
          d.value = `${mod.datetransfer(mod.StringtoInt(today.getMonth())+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`
        }
        else{
          console.log('record: ', click_op)
          mod.PopUpMessage(2)
        }
      });
    }
    else{
      $.get('./record', {
        id: ID,
        date: $('#fin input[name=date]').val(),
        cost: $('#fin input[name=cost]').val(),
        sort: $('#fin #sort').text(),
        account: $('#fin #acc').text(),
        note: $('#fin input[name=deals_note]').val(),
        type: click_op
      },(data)=>{
        if(data === '0'){
          t.value = "0"
          n.value = ""
          if(click_op === 0){
            s.innerHTML = "飲食"
          }
          else{
            s.innerHTML = "薪水"
          }
          a.innerHTML = "現金"
          d.value = `${mod.datetransfer(mod.StringtoInt(today.getMonth())+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`
        }
        else{
          console.log('record: ', click_op)
          mod.PopUpMessage(2)
        }
      });
    }
    //use this in date:`${mod.datetransfer(mod.StringtoInt(today.getMonth())+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`
  })

  
  // --------------- what is this ? ---------------
  $('#accounting #everyday_earn #add_deals_btn').click((event)=> {
    $('#add_deals').css("display", "flex")
    setTimeout(() => {
      $('#add_deals').css("transform", "translateX(0%)")
    }, 100)
    event.preventDefault()
    t.value = "0"
    n.value = ""
    if(click_op === 0){
      s.innerHTML = "飲食"
    }
    else if(click_op === 1){
      s.innerHTML = "薪水"
    }
    else{
      s.innerHTML = "一般儲蓄"
    }
    a.innerHTML = "現金"
    d.value = `${mod.datetransfer(today.getMonth()+1)}/${mod.datetransfer(today.getDate())}/${today.getFullYear()}`
  })
  
  $('#add_deals .bar img').click((event) => {
    event.preventDefault()
    $('#add_deals').css("transform", "translateX(100%)")
    setTimeout(function(){       
      $('#add_deals').css("display", "none")
    },500)
  })
  // --------------- what is this ? ---------------

});


// type bar (change border-bottom) and change type to expend, income, saving
for(let i=1;i<5;i++){
  $(`#add_deals #type p:nth-child(${i})`).click(function(){
    if(i!==4){
      $(`#add_deals #type p:nth-child(${i})`).css("border-bottom", "2px solid #410ADF")
      if(i===1){
        event.preventDefault()
        click_op = 2
        s.innerHTML = "一般儲蓄"
        $('#add_deals #fin .box:nth-child(4)').css("display", "none")
      }
      else if(i===2){
        event.preventDefault()
        click_op = 1
        s.innerHTML = "薪水"
        $('#add_deals #fin .box:nth-child(4)').css("display", "flex")
      }
      else{
        event.preventDefault()
        click_op = 0
        s.innerHTML = "飲食"
        $('#add_deals #fin .box:nth-child(4)').css("display", "flex")
      }
      for(let j=1;j<5;j++){
        if(j!==i){
          $(`#add_deals #type p:nth-child(${j})`).css("border-bottom", "none")
        }
      }
    }
  else{
    mod.PopUpMessage(3)
  }
  })
}




// use jquery calendar
$(function(){
  $("#da").datepicker();
  $('#das').datepicker();
});


$('#login_btn, #save, .datebox').click((event) => {
  event.preventDefault()
  var count = 0
  var interval = setInterval(function(){
    if(count==4){
      count=0
      clearInterval(interval)
    }
    getdetailincome()
    getdetailexpenditure()
    showtoday()
    count++
  },1000 )
})


function getdetailincome(){
  const container = document.querySelector('#main #accounting .income')
  container.innerHTML=`<p></p>`
  var DATE = $('#datepick input[name=dates]').val()
  let YEAR = "'" + `${DATE[6]}` + `${DATE[7]}` + `${DATE[8]}` + `${DATE[9]}` + "'"
  let MONTH = "'" + `${DATE[0]}` + `${DATE[1]}` + "'"
  let DAY = "'" + `${DATE[3]}` + `${DATE[4]}` + "'" 
  $.get('./getmainpagedetail',{
      id:ID,
      date: DAY,
      month: MONTH,
      year: YEAR
  },(data)=>{
      if(data!="nothing"){
          container.innerHTML=`<p></p>`
          for (var i in data){
              var item= mod.gettabledata(data,'items',i)
              var value = mod.gettabledata(data, 'cost',i)
              var type = mod.gettabledata(data, 'type', i)
              var sort = mod.gettabledata(data, 'sort', i)
              //console.log(item, value, type)
              if(item == ''||value == ''|| type !== '1'){
                  continue;
              }
              //create element
              const container = document.querySelector('#main #accounting .income')
              const box= document.createElement('a')
              const paragraphone = document.createElement('b')
              const types = document.createElement('img')
              const word = document.createElement('p')
              const paragraphtwo = document.createElement('P')
              //set text
              word.textContent= `${item}`
              paragraphtwo.textContent=`+${value}`
              //set attribute
              box.setAttribute('id','a')
              paragraphone.setAttribute('class','boxs')
              types.setAttribute('id', 'type_pic')
              types.setAttribute('src',`./image/Accounting/${mod.detailpicture(sort, type)}_icon.png`)
              word.setAttribute('class','text')
              paragraphtwo.setAttribute('class','text')
              //append child
              container.appendChild(box)
              paragraphone.appendChild(types)
              paragraphone.appendChild(word)
              box.appendChild(paragraphone)
              box.appendChild(paragraphtwo)
          }
      }
      else{

      }
  })
}

function getdetailexpenditure(){
  var today= new Date()
  const container = document.querySelector('#main #accounting .expenditure')
  container.innerHTML=`<p></p>`
  var DATE = $('#datepick input[name=dates]').val()
  let YEAR = "'" + `${DATE[6]}` + `${DATE[7]}` + `${DATE[8]}` + `${DATE[9]}` + "'"
  let MONTH = "'" + `${DATE[0]}` + `${DATE[1]}` + "'"
  let DAY = "'" + `${DATE[3]}` + `${DATE[4]}` + "'" 
  $.get('./getmainpagedetail',{
      id:ID,
      date: DAY,
      month: MONTH,
      year: YEAR
  },(data)=>{
      if(data!="nothing"){
          container.innerHTML=`<p></p>`
          for (var i in data){
              var item= mod.gettabledata(data,'items',i)
              var value = mod.gettabledata(data, 'cost',i)
              var type = mod.gettabledata(data, 'type', i)
              var sort = mod.gettabledata(data, 'sort', i)
              //console.log(type)
              if(item == ''||value == ''|| type !== '0'){
                  continue;
              }
              //create element
              const container = document.querySelector('#main #accounting .expenditure')
              const box= document.createElement('a')
              const paragraphone = document.createElement('b')
              const types = document.createElement('img')
              const word = document.createElement('p')
              const paragraphtwo = document.createElement('P')
              //set text
              word.textContent= `${item}`
              paragraphtwo.textContent=`-${value}`
              //set attribute
              box.setAttribute('id','a')
              paragraphone.setAttribute('class','boxs')
              types.setAttribute('id', 'type_pic')
              types.setAttribute('src',`./image/Accounting/${mod.detailpicture(sort, type)}_icon.png`)
              word.setAttribute('class','text')
              paragraphtwo.setAttribute('class','text')
              //append child
              container.appendChild(box)
              paragraphone.appendChild(types)
              paragraphone.appendChild(word)
              box.appendChild(paragraphone)
              box.appendChild(paragraphtwo)
          }
      }
      else{

      }
  })
}

async function showtoday(){
  var DATE = $('#datepick input[name=dates]').val()
  let YEAR = `${DATE[6]}` + `${DATE[7]}` + `${DATE[8]}` + `${DATE[9]}`
  let MONTH = `${DATE[0]}` + `${DATE[1]}`
  let DAY = `${DATE[3]}` + `${DATE[4]}`  
  var dayExpenditure = await mod.getTodayMoney(ID,'account',YEAR,MONTH,DAY,'cost',0);
  var dayIncome = await mod.getTodayMoney(ID,'account',YEAR,MONTH,DAY,'cost',1);
  var dayToTal = dayIncome - dayExpenditure
  if((dayToTal)>=0){
      $('#main #accounting #everyday_earn #today_earn p:nth-child(2)').html(`+${dayToTal}`)
  }
  else{
      $('#main #accounting #everyday_earn #today_earn p:nth-child(2)').html(`${dayToTal}`)
  }
}

function transmitIncomeOrExpend(){
  return click_op
};

export default transmitIncomeOrExpend