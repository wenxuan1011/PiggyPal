import ID from './signup.js'

// type bar (change border-bottom)
$('#project #type_bar p:nth-child(1)').click(function(){
  $('#project #type_bar p:nth-child(1)').css("border-bottom", "2px solid #410ADF")
  $('#personal_project_list').css("display", "none")
  for(let i=0;i<4;i++){
    if(i+1!==1){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})

$('#project #type_bar p:nth-child(2)').click(function(){
  $('#project #type_bar p:nth-child(2)').css("border-bottom", "2px solid #410ADF")
  $('#personal_project_list').css("display", "flex")
  for(let i=0;i<4;i++){
    if(i+1!==2){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})

$('#project #type_bar p:nth-child(3)').click(function(){
  $('#project #type_bar p:nth-child(3)').css("border-bottom", "2px solid #410ADF")
  $('#personal_project_list').css("display", "none")
  for(let i=0;i<4;i++){
    if(i+1!==3){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})

$('#project #type_bar p:nth-child(4)').click(function(){
  $('#project #type_bar p:nth-child(4)').css("border-bottom", "2px solid #410ADF")
  $('#personal_project_list').css("display", "none")
  for(let i=0;i<4;i++){
    if(i+1!==4){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})


// open/close add_project page
$('#mainpage #project_view .add_project .planned_speed img').click(function(){
  $('#add_project').css("display", "flex")
  setTimeout(() => {
    $('#add_project').css("transform", "translateX(0%)")
  }, 100)
})

$('#personal_project_list #add_project_btn').click(function(){
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
$('.personal_project').click(function(){
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


$(document).ready(function() {
  // the project have set or not
  $('#navbar img:nth-child(5)').click((event) => {
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
        $('#personal_project_list .personal_project').css("display", "flex")
        $('#personal_project_list #no_project').css("display", "none")
      }
      else{
        $('#personal_project_list .personal_project').css("display", "none")
        $('#personal_project_list #no_project').css("display", "flex")
      }
    });
  })


  // add personal project
  $('#person_project button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./person_project', {
      id: ID,
      project_personal: $('#person_project input[name=project_personal]').val(),
      start_year: $('#person_project input[name=start_year]').val(),
      start_month: $('#person_project input[name=start_month]').val(),
      start_day: $('#person_project input[name=start_day]').val(),
      end_year: $('#person_project input[name=end_year]').val(),
      end_month: $('#person_project input[name=end_month]').val(),
      end_day: $('#person_project input[name=end_day]').val(),
      target_number: $('#person_project input[name=target_number]').val(),
    }, (data) => {
      $("#person_project-output").html(`${data}`);
    });
  })

});






