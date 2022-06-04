import ID from './signup.js'
import mod from './module.js'
var COLOR = '#F6A93B'  // project color
var PERSONAL_OR_JOINT = false  // personal = false, joint = true
var SHOW_PERSONAL_OR_JOINT = 'false'
var MEMBER = [ID]
var TIME = new Date()


// type bar (change border-bottom)
for(let i=1;i<5;i++){
  $('#project #type_bar p:nth-child('+`${i}`+')').click(function(){
    $('#project #type_bar p:nth-child('+`${i}`+')').css("border-bottom", "2px solid #410ADF")
    if(i===2){
      SHOW_PERSONAL_OR_JOINT = 'false'
      $('#project_list').css("display", "flex")
      $('#project #add_project_btn').css("display", "block")
    }
    else if(i===3){
      SHOW_PERSONAL_OR_JOINT = 'true'
      $('#project_list').css("display", "flex")
      $('#project #add_project_btn').css("display", "block")
    }
    else{
      $('#project_list').css("display", "none")
      $('#project #add_project_btn').css("display", "none")
    }
    for(let j=1;j<5;j++){
      if(j!==i){
        $('#project #type_bar p:nth-child('+`${j}`+')').css("border-bottom", "none")
      }
    }
  })
}

// open/close add_project page
$('#mainpage #project_view .add_project .planned_speed img').click(function(){
  MEMBER = [ID]
  $('#add_project').css("display", "flex")
  setTimeout(() => {
    $('#add_project').css("transform", "translateX(0%)")
  }, 100)
})

$('#project #add_project_btn').click(function(){
  MEMBER = [ID]
  $('#add_project').css("display", "flex")
  setTimeout(() => {
    $('#add_project').css("transform", "translateX(0%)")
  }, 100)
})

$('#add_project .bar img').click(function(){
  $('#add_project').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#add_project').css("display", "none")
  }, 500)
})


// open/close personal/joint project page
var hi = function open_project(){
  console.log(1)
  $('#show_personal_project').css("display", "flex")
  setTimeout(() => {
    $('#show_personal_project').css("transform", "translateX(0%)")
  }, 100)
  //showProjectDetail(project_name)
}


// close personal_project page (project detail page)
$('#show_personal_project .bar img').click(function(){
  $('#show_personal_project').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#show_personal_project').css("display", "none")
  }, 500)
})




// open/close color_select_box
$('#add_project .box:nth-child(2) .color_selector').click(function(){
  $('.color_select_box').css("display", "flex")
  setTimeout(() => {
    $('.color_select_box').css("transform", "translateY(0%)")
    document.addEventListener("click", clickHidden);
  }, 100)
})

function clickHidden(eve){
  if( eve.target.class != "color_select_box" ){
    $('.color_select_box').css("transform", "translateY(100%)")
    setTimeout(() => {
      $('.color_select_box').css("display", "none")
    }, 500)
  }
  document.removeEventListener("click", clickHidden);
}


// setting project color
const ColorCode = ['#F42850', '#F6A93B', '#F4EC28', '#7ED321', '#4A90E2', '#8E5FF4', '#FC75CE']
const ColorImgSrc = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
for(let i=1;i<8;i++){
  $('.color_select_box #color_bar img:nth-child('+`${i}`+')').click(function(){
    COLOR = ColorCode[i-1]
    $('#add_project .box:nth-child(2) .color_selector img:nth-child(1)').attr("src", "./image/project/Project_colordot_"+`${ColorImgSrc[i-1]}`+".png")
  })
}


// open/close selector_box
// not yet


// open/close add_member
$('#add_project .box:nth-child(5) #add_mem').click(function(){
  $('#add_member').css("display", "flex")
  $('#add_member #id_box input[name=userid]').val('')
  $('#add_member #result').css("display", "none");
  $('#add_member #wrong').css("display", "none");
  setTimeout(() => {
    $('#add_member').css("transform", "translateX(0%)")
  }, 100)
})

$('#add_member .bar img').click(function(){
  $('#add_member').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#add_member').css("display", "none")
  }, 500)
})


function showProjectDetail(project_name){
  console.log('show1')
  $.get('./getProjectDetail',{
    id: ID,
    name: project_name,
  },(data)=>{
    console.log('show2')
    if(data !== false){
      $('#show_personal_project #project_detail #title #item').html(`${data[0]}`)
      let percent = data[9]/data[8]/100
      percent = Math.round(percent, -1)
      $('#show_personal_project #project_detail #percent').html(`${percent}%`)
      let date = `${data[2]}.${data[3]}.${data[4]} - ${data[5]}.${data[6]}.${data[7]}`
      $('#show_personal_project #project_detail #date_box #date').html(date)
      let money = '$' + `${data[8]}`
      $('#show_personal_project #project_detail #planned_speed_graph #money').html(money)
      $('#show_personal_project #project_detail #target_money #money').html(money)
    }
    else{
    }
  })
}

// show personal/joint project box
$('#navbar img:nth-child(5), #project #type_bar').click((event) => {
  event.preventDefault()
  getallproject(SHOW_PERSONAL_OR_JOINT)
})

function getallproject(TF){
  var show_no_project = true
  $.get('./getProject',{
    ID: ID,
  },(data)=>{
      if(data != "nothing"){
          const container = document.querySelector('#main #project #project_list')
          container.innerHTML=`<div></div>`
          var project_list = []
          for (var i in data){
              var project_name = mod.gettabledata(data,'project_name', i)
              var color = mod.gettabledata(data, 'color',i)
              var start_year = mod.gettabledata(data, 'start_year', i)
              var start_month = mod.gettabledata(data, 'start_month', i)
              var start_day = mod.gettabledata(data, 'start_day', i)
              var end_year = mod.gettabledata(data, 'end_year', i)
              var end_month = mod.gettabledata(data, 'end_month', i)
              var end_day = mod.gettabledata(data, 'end_day', i)
              var percent = mod.StringtoInt(mod.gettabledata(data, 'saved_money', i))/mod.StringtoInt(mod.gettabledata(data, 'target_number', i))/100
              percent = Math.round(percent, -1)
              var type = mod.gettabledata(data, 'personal_or_joint', i)
              project_list[i] = project_name
              if(type !== TF){
                continue;
              }
              //create element
              const container = document.querySelector('#main #project #project_list')
              const block = document.createElement('div')
              const infor_1 = document.createElement('div')
              const infor_2 = document.createElement('div')
              const dot = document.createElement('img')
              const name = document.createElement('p')
              const date = document.createElement('p')
              const infor_3 = document.createElement('div')
              const speed = document.createElement('p')
              const bar = document.createElement('img')
              const btn = document.createElement('img')
              //set text
              name.textContent = `${project_name}`
              date.textContent = `${start_year}.${start_month}.${start_day}-${end_year}.${end_month}.${end_day}`
              speed.textContent = `${percent}%`
              //set attribute
              block.setAttribute('class', 'project_block')
              block.setAttribute('id', `${project_name}`)
              infor_1.setAttribute('class', 'project_infor')
              infor_2.setAttribute('class', 'type_and_date')
              infor_3.setAttribute('class', 'plannd_speed_infor')
              dot.setAttribute('src', `./image/project/Project_colordot_${mod.getColor(color)}.png`)
              dot.setAttribute('height', '35%')
              bar.setAttribute('src', './image/project/Project_progressBar-bg.png')
              bar.setAttribute('width', '100%')
              btn.setAttribute('src', './image/btn/btn_arrow_right.png')
              btn.setAttribute('height', '17%')
              btn.setAttribute('id', 'right_btn')
              name.setAttribute('id', 'item')
              speed.setAttribute('id', 'percent')
              //append child
              container.appendChild(block)
              block.appendChild(infor_1)
              block.appendChild(btn)
              infor_1.appendChild(infor_2)
              infor_1.appendChild(infor_3)
              infor_1.appendChild(bar)
              infor_2.appendChild(dot)
              infor_2.appendChild(name)
              infor_2.appendChild(date)
              infor_3.appendChild(speed)
              // display no_project box or not
              show_no_project = false
          }
          ////////// big problem ////////// (done)
          for(let i=0;i<project_list.length;i++){
            $("#"+`${project_list[i]}`).click(function(e){
              $('#show_personal_project').css("display", "flex")
              setTimeout(() => {
                $('#show_personal_project').css("transform", "translateX(0%)")
              }, 100)
              event.preventDefault()  // I'm not sure is it right or not
              showProjectDetail(project_list[i])
            })
          }
      }
      if(show_no_project===true){
        $('#no_project').css("display", "flex")
      }
      else{
        $('#no_project').css("display", "none")
      }
  })
}


$(document).ready(function() {
  // add project
  $('#project_form button[type="submit"]').click((event) => {
    event.preventDefault()
    if(MEMBER.length>1){
      PERSONAL_OR_JOINT = true
    }
    else{
      PERSONAL_OR_JOINT = false
    }
    $.get('./project', {
      id: ID,
      project_name: $('#project_form input[name=project_name]').val(),
      color: COLOR,
      start_date: $('#project_form input[name=start_date]').val(),
      end_date: $('#project_form input[name=end_date]').val(),
      target_number: $('#project_form input[name=target_number]').val(),
      member: MEMBER,
      distribute: '均分',
      note: $('#project_form textarea[name=note]').val(),
      personal_or_joint : PERSONAL_OR_JOINT,
      
    }, (data) => {
      if(data === '0'){
        $('#project_form input[name=project_name]').val('')
        $('#add_project .box:nth-child(2) .color_selector img:nth-child(1)').attr("src", "./image/project/Project_colordot_orange.png")
        COLOR = '#F6A93B'
        $('#project_form input[name=start_date]').val('')
        $('#project_form input[name=end_day]').val('')
        $('#project_form input[name=target_number]').val('')
        MEMBER = [ID]
        // 還沒加入均分
        $('#project_form textarea[name=note]').val('')
        $("#add_project_-output").html(`${data}`);
      }
      else{
        mod.PopUpMessage(data)
      }
    });
  })


  // clean the input value in the add_project page
  $('#project_list #add_project_btn, #mainpage #project_view .add_project .planned_speed img').click((event)=> {
    $('#project_form input[name=project_name]').val(''),
      $('#add_project .box:nth-child(2) .color_selector img:nth-child(1)').attr("src", "./image/project/Project_colordot_orange.png")
      COLOR = '#F6A93B'
      $('#project_form input[name=start_date]').val('')
      $('#project_form input[name=end_date]').val('')
      $('#project_form input[name=target_number]').val('')
      // 還沒加入均分
      $('#project_form textarea[name=note]').val('')
  })


  // search member username
  $('#add_member #id_box img').click((event) => {
    event.preventDefault()
    $.get('./username', {
      id: $('#add_member #id_box input[name=userid]').val(),
    }, (data) => {
      if(data !== "failed,try again"){
        $('#add_member #result').css("display", "flex");
        $('#add_member #result p').html(`${data}`);
        $('#add_member #wrong').css("display", "none");
      }
      else{
        $('#add_member #result').css("display", "none");
        $('#add_member #wrong').css("display", "flex");
      }
    });
  })

  // add member in project
  $('#add_member #result #add_mem_btn').click((event) => {
    MEMBER.push($('#add_member #id_box input[name=userid]').val())
    console.log(MEMBER)
  })

});

$(function(){
  $(".calendar").datepicker();
});