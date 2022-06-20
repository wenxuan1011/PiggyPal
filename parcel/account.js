import ID from './signup.js'
import * as mod from './module.js'

// open/close add_account_page
$('#account #add_account_page_btn').click(function(){
  $('#add_account_page').css("display", "flex")
  setTimeout(() => {
    $('#add_account_page').css("transform", "translateX(0%)")
  }, 100)  
})
  
$('#add_account_page .bar img').click(function(){
  $('#add_account_page').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#add_account_page').css("display", "none")
  }, 500)
})


// get account list from table
$('#navbar img:nth-child(2), #add_account_page .bar img').click(function(){
  ShowAccountList()
})

// create ShowFinancialList function
function ShowAccountList(){
  $.get('./getAccount',{
    ID: ID,
  },(data)=>{
    if(data != "nothing"){
      const container = document.querySelector('#account #account_div #account_list')
      container.innerHTML=`<div></div>`
      for (var i in data){
        var account_name = mod.gettabledata(data, 'name', i)
        var account_money = mod.gettabledata(data, 'money', i)
        //create element
        const block = document.createElement('div')
        const name = document.createElement('p')
        const money = document.createElement('p')
        //set text
        name.textContent = `${account_name}`
        money.textContent = `$${account_money}`
        //set attribute
        block.setAttribute('class', 'account_box')
        //append child
        container.appendChild(block)
        block.appendChild(name)
        block.appendChild(money)
      }
      $('#no_account').css("display", "none")
    }
    else{
      $('#no_account').css("display", "flex")
    }
  })
}



$(document).ready(function() {

  // add account
  $('#account_form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./account', {
      id: ID,
      name: $('#account_form input[name=name]').val(),
      currency: $('#account_form #currency').text(),
      money: $('#account_form input[name=money]').val(),
    }, (data) => {
      if(data === '0'){
        $('#add_account_page #account_form .box:nth-child(1) input').val('')
        $('#add_account_page #account_form .box:nth-child(2) .currency_div p').text('TWD')
        $('#add_account_page #account_form .box:nth-child(3) input').val('')
      }
      else{
        mod.PopUpMessage(2)
      }
    });
  })

});