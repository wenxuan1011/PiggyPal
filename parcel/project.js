import ID from './signup.js'

var COLOR = '#F6A93B'  // project color
var PERSONAL_OR_JOINT = false  // personal = false, joint = true
var MEMBER = [ID]
var TIME = new Date()


// type bar (change border-bottom)
for(let i=1;i<5;i++){
  $('#project #type_bar p:nth-child('+`${i}`+')').click(function(){
    $('#project #type_bar p:nth-child('+`${i}`+')').css("border-bottom", "2px solid #410ADF")
    if(i===2){
      $('#project_list').css("display", "flex")
    }
    else if(i===3){
      $('#project_list').css("display", "flex")
    }
    else{
      $('#project_list').css("display", "none")
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

$('#project_list #add_project_btn').click(function(){
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


// open/close personal_project page
$('.project_block').click(function(){
  $('#show_personal_project').css("display", "flex")
  setTimeout(() => {
    $('#show_personal_project').css("transform", "translateX(0%)")
  }, 100)
})

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


$(document).ready(function() {
  // update the project box 
  $('#navbar img:nth-child(5), #project_form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./project_or_not', {
      id: ID,
    }, (data) => {
      if(data !== false){
        $('.project_infor .type_and_date #item').html(`${data[0]}`)
        $('#show_personal_project #project_detail #title #item').html(`${data[0]}`)
        let date = `${data[1]}` + '.' + `${data[2]}` + '.' + `${data[3]}` + '-' + `${data[4]}` + '.' + `${data[5]}` + '.' + `${data[6]}`
        $('.project_infor .type_and_date #date').html(date)
        $('#show_personal_project #project_detail #date_box #date').html(date)
        let money = '$' + `${data[7]}`
        $('#show_personal_project #project_detail #planned_speed_graph #money').html(money)
        $('#show_personal_project #project_detail #target_money #money').html(money)
        $('#project_list .project_block').css("display", "flex")
        $('#project_list #no_project').css("display", "none")
      }
      else{
        $('#project_list .project_block').css("display", "none")
        $('#project_list #no_project').css("display", "flex")
      }
    });
  })

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