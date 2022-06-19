import ID from './signup.js'
import mod from './module.js'
import sel from './selectormodule.js'
var PERSONAL_OR_JOINT = false  // personal = false, joint = true
var SHOW_PERSONAL_OR_JOINT = false
var MEMBER = [ID]
var TIME = new Date()



// $('#project #type_bar p:nth-child(1)').click(function(){
//   $('#project #type_bar p:nth-child(1)').css("border-bottom", "2px solid #410ADF")
//   $('#project #type_bar p:nth-child(1)').css("color", "#0D0E10")
//   $('#project #type_bar p:nth-child(2)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(3)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(4)').css("color", "#BEBEBF")
//   $('#normal_save_money_list').css("display", "flex")
//   $('#personal_project_list').css("display", "none")
//   for(let i=0;i<4;i++){
//     if(i+1!==1){
//       $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
//     }
//   }
// })

// $('#project #type_bar p:nth-child(2)').click(function(){
//   $('#project #type_bar p:nth-child(2)').css("border-bottom", "2px solid #410ADF")
//   $('#project #type_bar p:nth-child(2)').css("color", "#0D0E10")
//   $('#project #type_bar p:nth-child(1)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(3)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(4)').css("color", "#BEBEBF")
//   $('#normal_save_money_list').css("display", "none")
//   $('#personal_project_list').css("display", "flex")
//   for(let i=0;i<4;i++){
//     if(i+1!==2){
//       $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
//     }
//   }
// })

// $('#project #type_bar p:nth-child(3)').click(function(){
//   $('#project #type_bar p:nth-child(3)').css("border-bottom", "2px solid #410ADF")
//   $('#project #type_bar p:nth-child(3)').css("color", "#0D0E10")
//   $('#project #type_bar p:nth-child(1)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(2)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(4)').css("color", "#BEBEBF")
//   $('#normal_save_money_list').css("display", "none")
//   $('#personal_project_list').css("display", "none")
//   for(let i=0;i<4;i++){
//     if(i+1!==3){
//       $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")
//     }
//   }
// })

// $('#project #type_bar p:nth-child(4)').click(function(){
//   $('#project #type_bar p:nth-child(4)').css("border-bottom", "2px solid #410ADF")
//   $('#project #type_bar p:nth-child(4)').css("color", "#0D0E10")
//   $('#project #type_bar p:nth-child(1)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(2)').css("color", "#BEBEBF")
//   $('#project #type_bar p:nth-child(3)').css("color", "#BEBEBF")
//   $('#normal_save_money_list').css("display", "none")
//   $('#personal_project_list').css("display", "none")
//   for(let i=0;i<4;i++){
//     if(i+1!==4){
//       $('#project #type_bar p:nth-child('+`${i+1}`+')').css("border-bottom", "none")


// type bar (change border-bottom)
for(let i=1;i<5;i++){
  $('#project #type_bar p:nth-child('+`${i}`+')').click(function(){
    $('#project #type_bar p:nth-child('+`${i}`+')').css("border-bottom", "2px solid #410ADF")
    if(i===2){
      SHOW_PERSONAL_OR_JOINT = false
      $('#project_list').css("display", "flex")
      $('#project #add_project_btn').css("display", "block")
    }
    else if(i===3){
      SHOW_PERSONAL_OR_JOINT = true
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


// close personal_project page (project detail page)
$('#show_personal_project .bar img').click(function(){
  $('#show_personal_project').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#show_personal_project').css("display", "none")
  }, 500)
})

// open/close normal_save_money page


// $('.normal_save_money').click(function(){
//   $('#show_normal_save_money').css("display", "flex")
//   setTimeout(() => {
//     $('#show_normal_save_money').css("transform", "translateX(0%)")
//   }, 100)
// })

// $('#show_normal_save_money .bar img').click(function(){
//   $('#show_normal_save_money').css("transform", "translateX(100%)")
//   setTimeout(() => {
//     $('#show_normal_save_money').css("display", "none")
//   }, 500)
// })

// $(document).ready(function() {
//   // the project have set or not
//   $('#navbar img:nth-child(5)').click((event) => {
//     event.preventDefault()
//     $.get('./project_or_not', {
//       id: ID,
//     }, (data) => {
//       if(data !== false){
//         $('.project_infor .type_and_date #item').html(`${data[0]}`)
//         $('#show_personal_project #project_detail #title #item').html(`${data[0]}`)
//         let date = `${data[1]}` + '.' + `${data[2]}` + '.' + `${data[3]}` + '-' + `${data[4]}` + '.' + `${data[5]}` + '.' + `${data[6]}`
//         $('.project_infor .type_and_date #date').html(date)
//         $('#show_personal_project #project_detail #date_box #date').html(date)
//         let money = '$' + `${data[7]}`
//         $('#show_personal_project #project_detail #planned_speed_graph #money').html(money)
//         $('#show_personal_project #project_detail #target_money #money').html(money)
//         $('#personal_project_list .personal_project').css("display", "flex")
//         $('#normal_save_money_list .normal_save_money').css("display", "flex")
//         $('#personal_project_list #no_project').css("display", "none")
//         $('#normal_save_money_list #no_normal_save_money').css("display", "none")
//       }
//       else{
//         $('#personal_project_list .personal_project').css("display", "none")
//         $('#normal_save_money_list .normal_save_money').css("display", "none")
//         $('#personal_project_list #no_project').css("display", "flex")
//         $('#normal_save_money_list #no_normal_save_money').css("display", "none")
// close joint_project page (project detail page)


$('#show_joint_project .bar img').click(function(){
  $('#show_joint_project').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#show_joint_project').css("display", "none")
  }, 500)
})


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


function showProjectDetail(project_name, personal_or_joint){
  $.get('./getProjectDetail',{
    id: ID,
    name: project_name,
  },(data)=>{
    let page_tag = `#show_${personal_or_joint}_project`
    if(data !== false){
      $(`${page_tag} .project_detail .title #item`).html(`${data[0]}`)
      let percent = data[9]/data[8]/100
      percent = Math.round(percent, -1)
      $(`${page_tag} .project_detail #percent`).html(`${percent}%`)
      let date = `${data[2]}.${data[3]}.${data[4]} - ${data[5]}.${data[6]}.${data[7]}`
      $(`${page_tag} .project_detail .date_box #date`).html(date)
      let money = '$' + `${data[8]}`
      $(`${page_tag} .project_detail .planned_speed_graph #money`).html(money)
      $(`${page_tag} .project_detail .target_money #money`).html(money)
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

// create getallproject function
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
              if(type !== `${TF}`){
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
          for(let i=0;i<project_list.length;i++){
            if(SHOW_PERSONAL_OR_JOINT === false){
              $("#"+`${project_list[i]}`).click(function(e){
                $('#show_personal_project').css("display", "flex")
                setTimeout(() => {
                  $('#show_personal_project').css("transform", "translateX(0%)")
                }, 100)
                event.preventDefault()  // I'm not sure is it right or not
                showProjectDetail(project_list[i], 'personal')
              })
            }
            else{
              $("#"+`${project_list[i]}`).click(function(e){
                $('#show_joint_project').css("display", "flex")
                setTimeout(() => {
                  $('#show_joint_project').css("transform", "translateX(0%)")
                }, 100)
                event.preventDefault()  // I'm not sure is it right or not
                showProjectDetail(project_list[i], 'joint')
              })
            }
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
      //color: COLOR,
      color: sel.transmitCOLOR,
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
        //COLOR = '#F6A93B'
        sel.InitialColor()
        $('#project_form input[name=start_date]').val('')
        $('#project_form input[name=end_day]').val('')
        $('#project_form input[name=target_number]').val('')
        MEMBER = [ID]
        // 還沒加入均分
        $('#project_form textarea[name=note]').val('')
        $("#add_project_-output").html(`${data}`);
      }
      else{
        mod.PopUpMessage(2)
      }
    });
  })


  // clean the input value in the add_project page
  $('#project #add_project_btn, #mainpage #project_view .add_project .planned_speed img').click((event)=> {
    $('#project_form input[name=project_name]').val(''),
    $('#add_project .box:nth-child(2) .color_selector img:nth-child(1)').attr("src", "./image/project/Project_colordot_orange.png")
    //COLOR = '#F6A93B'
    sel.InitialColor()
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
