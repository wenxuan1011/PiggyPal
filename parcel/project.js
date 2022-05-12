import ID from './signup.js'

// type bar (change border-bottom)
$('#project #type_bar p:nth-child(1)').click(function(){
  $('#project #type_bar p:nth-child(1)').css("border-bottom", "2px solid #410ADF")
  for(let i=0;i<4;i++){
    if(i+1!=1){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})

$('#project #type_bar p:nth-child(2)').click(function(){
  $('#project #type_bar p:nth-child(2)').css("border-bottom", "2px solid #410ADF")
  for(let i=0;i<4;i++){
    if(i+1!=2){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})

$('#project #type_bar p:nth-child(3)').click(function(){
  $('#project #type_bar p:nth-child(3)').css("border-bottom", "2px solid #410ADF")
  for(let i=0;i<4;i++){
    if(i+1!=3){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
})

$('#project #type_bar p:nth-child(4)').click(function(){
  $('#project #type_bar p:nth-child(4)').css("border-bottom", "2px solid #410ADF")
  for(let i=0;i<4;i++){
    if(i+1!=4){
      $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
    }
  }
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

