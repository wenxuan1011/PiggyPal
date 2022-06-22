//import ID from './signup.js'
import * as mod from './module.js'
var ID = localStorage.getItem("ID")
//need to export to signup.js
var TYPE = 0

// open/close personal page
$('#mainpage .personal_btn_bg').click(function(){
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

// open/close financial_list_page
$('#personal_page #financial_setting .list li').click(function(){
  $('#financial_list_page').css("display", "flex")
  setTimeout(() => {
    $('#financial_list_page').css("transform", "translateX(0%)")
  }, 100)
})

$('#financial_list_page .bar img').click(function(){
  $('#financial_list_page').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#financial_list_page').css("display", "none")
  }, 500)
})


// open/close add_financial_page
$('#financial_list_page #add_financial_btn').click(function(){
  $('#add_financial_page').css("display", "flex")
  setTimeout(() => {
    $('#add_financial_page').css("transform", "translateX(0%)")
  }, 100)
})

$('#add_financial_page .bar img').click(function(){
  $('#add_financial_page').css("transform", "translateX(100%)")
  //$("#financial-output").html('')
  setTimeout(() => {
    $('#add_financial_page').css("display", "none")
  }, 500)
})

// delete data --> PopUpMessage(5)
$('#personal_page #account_setting .list li:nth-child(3)').click(function(){
  mod.PopUpMessage(6)
})


// change the title of the financial_list_page and add_financial_page
const TitleArray = [['固定收入', '收入項目', '入帳日期', '收入金額', '請新增一筆固定收入'],
                    ['固定支出', '支出項目', '支出日期', '支出金額', '請新增一筆固定支出'],
                    ['固定儲蓄', '儲蓄項目', '儲蓄日期', '儲蓄金額', '請新增一筆固定儲蓄']]

for(let i=0;i<3;i++){
  $(`#personal_page #financial_setting .list li:nth-child(${i+1})`).click(function(){
    $('#financial_list_page .bar p').html(TitleArray[i][0])
    $('#add_financial_page .bar p').html(TitleArray[i][0])
    $('#add_financial_page #financial .box:nth-child(1) p').html(TitleArray[i][1])
    $('#add_financial_page #financial .box:nth-child(2) p').html(TitleArray[i][2])
    $('#add_financial_page #financial .box:nth-child(3) p').html(TitleArray[i][3])
    $('#financial_list_page #no_financial').html(TitleArray[i][4])
    TYPE = i
    ShowFinancialList(TYPE)
  })
}

// function ReportFileStatus(filespec) {
//   var fso, s = filespec;
//   fso = new ActiveXObject("Scripting.FileSystemObject");
//   if (fso.FileExists(filespec))
//      s += " exists.";
//   else 
//      s += " doesn't exist.";
//   return(s);
// }

//改大頭貼
$('#personal_page #photo_and_name img').click(function(){
  $('#change_personal_page').css("display", "flex")
  setTimeout(() => {
    $('#change_personal_page').css("transform", "translateX(0%)")
  }, 100)
  //console.log(ReportFileStatus('../dist/image/personal_pic/F64081127.jpg'))
})

$('#change_personal_page .bar img:nth-child(1)').click(function(){
  $('#change_personal_page').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#change_personal_page').css("display", "none")
  }, 500)
})

// $('#change_personal_page .bar img:nth-child(2)').click(function(){
  
// })

// use jquery calendar
$(function(){
  $("#fin_date").datepicker();
});


// clean the input value of the add_financial_page
$('#financial_list_page #add_financial_btn').click((event) => {
  $('#add_financial_page #financial .box:nth-child(1) input').val('')
  $('#add_financial_page #financial .box:nth-child(2) input').val('')
  $('#add_financial_page #financial .box:nth-child(3) input').val('')
  $('#add_financial_page #financial .box:nth-child(4) .repeat_div #repeat').text('每月')
})

// create ShowFinancialDetail function
function ShowFinancialDetail(name, type){
  $.get('./getFinancialDetail',{
    id: ID,
    name: name,
    type: type,
  },(data)=>{
    if(data !== false){
      console.log('1')
      $('#add_financial_page #financial .box:nth-child(1) input').val(mod.gettabledata(data,'item', 0))
      let date = `${mod.gettabledata(data,'month', 0)}/${mod.gettabledata(data,'day', 0)}/${mod.gettabledata(data,'year', 0)}`
      $('#add_financial_page #financial .box:nth-child(2) input').val(date)
      $('#add_financial_page #financial .box:nth-child(3) input').val(mod.gettabledata(data,'money', 0))
      $('#add_financial_page #financial .box:nth-child(4) .repeat_div #repeat').text(mod.gettabledata(data,'repeats', 0))
    }
    else{
    }
  })
}


// create ShowFinancialList function
function ShowFinancialList(type){
  $.get('./getFinancial',{
    id: ID,
    type: type,
  },(data)=>{
    if(data != "nothing"){
      const container = document.querySelector('#financial_list_page #financial_list')
      container.innerHTML=`<div></div>`
      var financial_list = []
      for (var i in data){
        var financial_name = mod.gettabledata(data,'item', i)
        financial_list[i] = financial_name
        //create element
        const block = document.createElement('div')
        const title = document.createElement('p')
        const name = document.createElement('p')
        //set text
        name.textContent = `${financial_name}`
        if(type==0){ title.textContent = '收入項目' }
        else if(type==1){ title.textContent = '支出項目' }
        else{ title.textContent = '儲蓄項目' }
        //set attribute
        block.setAttribute('class', 'financial_box')
        block.setAttribute('id', `${financial_name}`)
        //append child
        container.appendChild(block)
        block.appendChild(title)
        block.appendChild(name)
      }
      for(let i=0;i<financial_list.length;i++){
        $(`#${financial_list[i]}`).click(function(e){
          $('#add_financial_page').css("display", "flex")
          setTimeout(() => {
            $('#add_financial_page').css("transform", "translateX(0%)")
          }, 100)
          event.preventDefault()  // I'm not sure is it right or not
          ShowFinancialDetail(financial_list[i], type)
        })
      }
      $('#financial_list').css("display", "flex")
      $('#no_financial').css("display", "none")
    }
    else{
      $('#financial_list').css("display", "none")
      $('#no_financial').css("display", "flex")
    }
  })
}




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
      repeat: $('#financial #repeat').text(),
    }, (data) => {
      if(data === '0'){
        $('#add_financial_page #financial .box:nth-child(1) input').val('')
        $('#add_financial_page #financial .box:nth-child(2) input').val('')
        $('#add_financial_page #financial .box:nth-child(3) input').val('')
        $('#add_financial_page #financial .box:nth-child(4) .repeat_div #repeat').text('每月')
        mod.PopUpMessage(4)
      }
      else{
        mod.PopUpMessage(2)
      }
    });
  })
});
