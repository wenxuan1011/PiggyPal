//import ID from './signup.js'
import mod from './module.js'
import sel from './selectormodule.js'
import gra from './graphic.js'
import { async } from 'regenerator-runtime'
var ID = localStorage.getItem("ID")
var PERSONAL_OR_JOINT = false  // personal = false, joint = true
var SHOW_PERSONAL_OR_JOINT = false
var MEMBER = [ID]
var TIME = new Date()
var port = 6168
var last_participant = ""
var parti_num=0
//偵測有沒有圖片
function CheckImgExists(imgurl) {
  return new Promise(function(resolve, reject) {
    var ImgObj = new Image(); //判断图片是否存在
    ImgObj.src = imgurl;
    ImgObj.onload = function(res) {
      resolve(res);
    }
    ImgObj.onerror = function(err) {
      reject(err)
    }
  })
}

// type bar (change border-bottom)
for(let i=1;i<5;i++){
  $('#project #type_bar p:nth-child('+`${i}`+')').click(function(){
    $('#project #type_bar p:nth-child('+`${i}`+')').css("border-bottom", "2px solid #410ADF")
    $('#project #type_bar p:nth-child('+`${i}`+')').css("color", "#0D0E10")
    if(i===1){
      $('#project_list_all').css("display", "none")
      $('#complete_project_all').css("display", "none")
      $('#normal_save_money_list').css("display", "flex")
      //$('#normal_save_money_list .normal_save_money').css("display", "flex")
    }
    else if(i===2){
      SHOW_PERSONAL_OR_JOINT = false
      $('#project_list_all').css("display", "flex")
      $('#complete_project_all').css("display", "none")
      $('#normal_save_money_list').css("display", "none")
      //$('#normal_save_money_list .normal_save_money').css("display", "none")

    }
    else if(i===3){
      SHOW_PERSONAL_OR_JOINT = true
      $('#project_list_all').css("display", "flex")
      $('#complete_project_all').css("display", "none")
      $('#normal_save_money_list').css("display", "none")
      //$('#normal_save_money_list .normal_save_money').css("display", "none")
    }
    else{
      $('#project_list_all').css("display", "none")
      $('#complete_project_all').css("display", "flex")
      $('#normal_save_money_list').css("display", "none")
      //$('#project #no_project').css("display", "none")
      //$('#normal_save_money_list .normal_save_money').css("display", "none")

    }
    for(let j=1;j<5;j++){
      if(j!==i){
        $('#project #type_bar p:nth-child('+`${j}`+')').css("border-bottom", "none")
        $('#project #type_bar p:nth-child('+`${j}`+')').css("color", "#BEBEBF")
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

$('#show_joint_project .bar img').click(function(){
  $('#show_joint_project').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#show_joint_project').css("display", "none")
  }, 500)
})


// open/close normal_save_money page
$('.normal_save_money').click(function(){
  $('#show_normal_save_money').css("display", "flex")
  setTimeout(() => {
    $('#show_normal_save_money').css("transform", "translateX(0%)")
  }, 100)
})

$('#show_normal_save_money .bar img').click(function(){
  $('#show_normal_save_money').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#show_normal_save_money').css("display", "none")
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
  }, async(data)=>{
    let page_tag = `#show_${personal_or_joint}_project`
    if(data !== false){
      $(`${page_tag} .project_detail .title #item`).html(`${data[1]}`)
      var totalmoney = await mod.getaprojectmoney(data[0], data[1], data[2], data[9])
      var percent = totalmoney / mod.StringtoInt(data[9])*100
      percent = Math.round(percent, -1)
      // draw progress bar
      var tagposition = (percent/100)*245+30
      tagposition = Math.round(tagposition, -1)
      //console.log(tagposition)
      $(`${page_tag} .SpeedBar .ColorBar`).css("width", `${percent}%`)
      $(`${page_tag} .money_tag .TagPosition`).css("width", `${tagposition}px`)
      $(`${page_tag} .money_tag .TagPosition #PriceTag`).html(`$ ${totalmoney}`)
      $(`${page_tag} .SpeedBar .ColorBar`).css("background-color", `${data[2]}`)
      // ------------------------------------------------------------------------
      $(`${page_tag} .project_detail #percent`).html(`${percent}%`)
      let date = `${data[3]}.${data[4]}.${data[5]} - ${data[6]}.${data[7]}.${data[8]}`
      $(`${page_tag} .project_detail .date_box #date`).html(date)
      let money = `$${data[9]}`
      $(`${page_tag} .project_detail .planned_speed_graph #money`).html(money)
      $(`${page_tag} .project_detail .target_money #money`).html(money)
    }
    else{
    }
  })
}

$('#show_personal_project .planned_speed_graph .SpeedBar, #show_joint_project .planned_speed_graph .SpeedBar').click(function(){
  $('#show_personal_project .money_tag .TagPosition .PriceTag_Div, #show_joint_project .project_detail .money_tag .TagPosition .PriceTag_Div').css("display", "flex")
  setTimeout(() => {
    document.addEventListener("click", clickHiddenPriceTag)
  }, 100)
})

function clickHiddenPriceTag(eve){
  if( eve.target.class != ".ColorBar" ){
    $('#show_personal_project .money_tag .TagPosition .PriceTag_Div, #show_joint_project .project_detail .money_tag .TagPosition .PriceTag_Div').css("display", "none")
  }
  document.removeEventListener("click", clickHiddenPriceTag)
}

// show personal/joint project box
$('#navbar img:nth-child(5), #project #type_bar, #mainpage #project_view .add_project .planned_speed img').click((event) => {
  event.preventDefault()
  getallproject(SHOW_PERSONAL_OR_JOINT)
  getnormalproject()
})

// create getallproject function to draw .project_block in #project
async function getallproject(TF){
  var show_no_project = true
  var judge = true
  var result = 0
  await $.get('./getProject',{
    ID: ID,
  },(data)=>{
    result = data
  })
  if(result != "nothing"){
    const container = document.querySelector('#main #project #project_list')
    container.innerHTML=`<div></div>`
    var project_list = []
    var color_list = []
    var percent_list = []
    for (var i in result){
        var id = mod.gettabledata(result,'id', i)
        var project_name = mod.gettabledata(result,'project_name', i)
        var color = mod.gettabledata(result, 'color',i)
        var start_year = mod.gettabledata(result, 'start_year', i)
        var start_month = mod.gettabledata(result, 'start_month', i)
        var start_day = mod.gettabledata(result, 'start_day', i)
        var end_year = mod.gettabledata(result, 'end_year', i)
        var end_month = mod.gettabledata(result, 'end_month', i)
        var end_day = mod.gettabledata(result, 'end_day', i)
        var target_number = mod.gettabledata(result, 'target_number', i)
        var totalmoney = await mod.getaprojectmoney(id, project_name, color, target_number)
        console.log('totalmoney',totalmoney)
        var percent = totalmoney/mod.StringtoInt(mod.gettabledata(result, 'target_number', i))*100
        percent = Math.round(percent, -1)
        var type = mod.gettabledata(result, 'personal_or_joint', i)
        project_list[i] = project_name
        // ----------------------------------
        color_list[i] = color
        percent_list[i] = percent
        console.log(type)
        // -----------------------------------
        if (type >=2){
          judge = true
        }
        else if(type == 1){
          judge = false
        }
        else{
          judge = undefined
        }
        if(judge !== TF){
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
        const bar = document.createElement('div')
        const color_bar = document.createElement('div')
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
        bar.setAttribute('class', 'SpeedBar')
        color_bar.setAttribute('class', 'ColorBar')
        color_bar.setAttribute('style', `background-color:${color}`)
        btn.setAttribute('src', './image/btn/btn_arrow_right.png')
        btn.setAttribute('height', '17%')
        btn.setAttribute('id', 'right_btn')
        name.setAttribute('id', 'item')
        speed.setAttribute('id', 'percent')
        //append child
        container.appendChild(block)
        block.appendChild(infor_1)
        block.appendChild(btn)
        bar.appendChild(color_bar)
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
      $(`#${project_list[i]} .SpeedBar .ColorBar`).css("width", `${percent_list[i]}%`)
      if(SHOW_PERSONAL_OR_JOINT === false){
        $("#"+`${project_list[i]}`).click(function(e){
          $('#show_personal_project').css("display", "flex")
          setTimeout(() => {
            $('#show_personal_project').css("transform", "translateX(0%)")
          }, 100)
          event.preventDefault()  // I'm not sure is it right or not
          showProjectDetail(project_list[i], 'personal')
          gra.getGraphData(project_list[i], 1, color_list[i])
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
          getProjectCreater(project_list[i])
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
}

async function getnormalproject(){
  await $.get('./getnormalproject', {
    id:ID
  },(data) => {
    $('#percent_sm').html(`$${data}`)
    $('#project_detail_sm #date_box_sm #money').html(`$${data}`)
  })
}


// ---------------------------------------------------------------------------------
// show complete project box
$('#project #type_bar p:nth-child(4)').click((event) => {
  event.preventDefault()
  getCompleteProject()
})

async function getCompleteProject(){
  var show_no_complete_project = true
  var result = 0
  await $.get('./getProject',{
    ID: ID,
  },(data)=>{
    result = data
  })
  if(result != "nothing"){
    const container = document.querySelector('#main #project #complete_project_list')
    container.innerHTML=`<div></div>`
    var complete_list = []
    var color_list = []
    var j = 0
    for (var i in result){
        var id = mod.gettabledata(result,'id', i)
        var project_name = mod.gettabledata(result,'project_name', i)
        var color = mod.gettabledata(result, 'color',i)
        var start_year = mod.gettabledata(result, 'start_year', i)
        var start_month = mod.gettabledata(result, 'start_month', i)
        var start_day = mod.gettabledata(result, 'start_day', i)
        var end_year = mod.gettabledata(result, 'end_year', i)
        var end_month = mod.gettabledata(result, 'end_month', i)
        var end_day = mod.gettabledata(result, 'end_day', i)
        var type = mod.gettabledata(result, 'personal_or_joint', i)
        console.log('complete', type)
        if (type != -1){
          continue;
        }
        console.log('add')
        complete_list[j] = project_name
        color_list[j] = color
        j++
        //create element
        const block = document.createElement('div')
        const infor_1 = document.createElement('div')
        const infor_2 = document.createElement('div')
        const dot = document.createElement('img')
        const name = document.createElement('p')
        const date = document.createElement('p')
        const infor_3 = document.createElement('div')
        const speed = document.createElement('p')
        const bar = document.createElement('div')
        const color_bar = document.createElement('div')
        const btn = document.createElement('img')
        //set text
        name.textContent = `${project_name}`
        date.textContent = `${start_year}.${start_month}.${start_day}-${end_year}.${end_month}.${end_day}`
        speed.textContent = '100%'
        //set attribute
        block.setAttribute('class', 'project_block')
        block.setAttribute('id', `${project_name}_complete`)
        infor_1.setAttribute('class', 'project_infor')
        infor_2.setAttribute('class', 'type_and_date')
        infor_3.setAttribute('class', 'plannd_speed_infor')
        dot.setAttribute('src', `./image/project/Project_colordot_${mod.getColor(color)}.png`)
        dot.setAttribute('height', '35%')
        bar.setAttribute('class', 'SpeedBar')
        color_bar.setAttribute('class', 'ColorBar')
        color_bar.setAttribute('style', `background-color:${color}`)
        btn.setAttribute('src', './image/btn/btn_arrow_right.png')
        btn.setAttribute('height', '17%')
        btn.setAttribute('id', 'right_btn')
        name.setAttribute('id', 'item')
        speed.setAttribute('id', 'percent')
        //append child
        container.appendChild(block)
        block.appendChild(infor_1)
        block.appendChild(btn)
        bar.appendChild(color_bar)
        infor_1.appendChild(infor_2)
        infor_1.appendChild(infor_3)
        infor_1.appendChild(bar)
        infor_2.appendChild(dot)
        infor_2.appendChild(name)
        infor_2.appendChild(date)
        infor_3.appendChild(speed)
        // display no_project box or not
        show_no_complete_project = false
    }
    for(let i=0;i<complete_list.length;i++){
      $(`#${complete_list[i]}_complete .SpeedBar .ColorBar`).css("width", "100%")
      $(`#${complete_list[i]}_complete`).click(function(e){
        $('#show_complete_project').css("display", "flex")
        setTimeout(() => {
          $('#show_complete_project').css("transform", "translateX(0%)")
          mod.PopUpMessage(1)
        }, 100)
        event.preventDefault()  // I'm not sure is it right or not
        showCompleteProjectDetail(complete_list[i])
      })
    }
  }
  if(show_no_complete_project===true){
    $('#no_complete_project').css("display", "flex")
  }
  else{
    $('#no_complete_project').css("display", "none")
  }
}

$('#show_complete_project .bar img').click(function(){
  $('#show_complete_project').css("transform", "translateX(100%)")
  setTimeout(() => {
    $('#show_complete_project').css("display", "none")
  }, 500)
})

function showCompleteProjectDetail(project_name){
  $.get('./getProjectDetail',{
    id: ID,
    name: project_name
  },(data)=>{
    if(data!==false){
      console.log(data[1])
      $('#show_complete_project #complete_project_form .box:nth-child(1) p:nth-child(2)').html(data[1])
      $('#show_complete_project #complete_project_form .box:nth-child(2) img').attr("src", `./image/project/Project_colordot_${mod.getColor(data[2])}.png`)
      var date = `${data[3]}.${data[4]}.${data[5]} - ${data[6]}.${data[7]}.${data[8]}`
      $('#show_complete_project #complete_project_form .box:nth-child(3) p:nth-child(2)').html(date)
      $('#show_complete_project #complete_project_form .box:nth-child(4) p:nth-child(2)').html(data[9])
      var type = '個人專案'
      if(data[10]!=1){
        type = '共同專案'
      }
      $('#show_complete_project #complete_project_form .box:nth-child(5) p:nth-child(2)').html(type)
      if(data[11]===''){
        data[11] = '（無）'
      }
      $('#show_complete_project #complete_project_form .box:nth-child(8) p:nth-child(2)').html(data[11])
    }
  })
}
// ---------------------------------------------------------------------------------


function getProjectMember(creater, user, project_name){
$.get('./getMember',{
ID: creater,
project_name: project_name,
},(data)=>{
  if(data != "nothing"){
      const container = document.querySelector('#main #show_joint_project .ranking_list')
      container.innerHTML=`<div></div>`
      var member_list = []
      var percent_list = []
      var count_member=0
      var have_pic=0
      for(var i in data){
        var member_1 = mod.gettabledata(data,'member', i)
        count_member++ 
        member_list[i] =  member_1       
      }
      for (var i in data){
        var target_money = mod.gettabledata(data,'target_number', i)/count_member
        var percent = (mod.gettabledata(data, 'saved_money', i)/target_money)*100
        percent = Math.round(percent, -1)
        percent_list[i] = percent
        const block = document.createElement('div')
        const box1 = document.createElement('div')
        const member_pic = document.createElement('img')
        // draw member price tag
        const box2 = document.createElement('div')
        const already_save = document.createElement('p')
        const box3 = document.createElement('div')
        const box4 = document.createElement('div')
        const member_money = document.createElement('p')
        // -----------------------------------------------------
        const progress_bar_bottom = document.createElement('div')
        const progress_bar = document.createElement('div')
        //set text
        already_save.textContent = `$${target_money}`
        member_money.textContent = `$ ${mod.gettabledata(data,'saved_money', i)}`
        //set attribute
        block.setAttribute('class', 'member_block')
        block.setAttribute('id', `${member_list[i]}block`)
        box1.setAttribute('class', 'member_box')
        box2.setAttribute('class', 'tag_and_money')
        box3.setAttribute('class', 'tag_position')
        box4.setAttribute('class', 'tag')
        member_pic.setAttribute('id', `${member_list[i]}`)
        member_pic.setAttribute('src', `./image/personal_pic/2.jpg`)
        member_pic.setAttribute('width', '11.5%')
        member_pic.setAttribute('height', '80%')
        progress_bar_bottom.setAttribute('class', 'progress_bar_bg')
        progress_bar.setAttribute('class', 'progress_bar')
        //append child
        container.appendChild(block)
        block.appendChild(member_pic)
        block.appendChild(box1)
        box1.appendChild(box2)
        box1.appendChild(progress_bar_bottom)
        box2.appendChild(box3)
        box2.appendChild(already_save)
        box3.appendChild(box4)
        box4.appendChild(member_money)
        progress_bar_bottom.appendChild(progress_bar)
      }
      for(let i=0;i<member_list.length;i++){
        var tagposition = (percent_list[i]/100)*243+25
        tagposition = Math.round(tagposition, -1)
        console.log(tagposition)
        $(`#${member_list[i]}block .member_box .tag_position`).css("width", `${tagposition}px`)
        $(`#${member_list[i]}block .progress_bar_bg .progress_bar`).css("width", `${percent_list[i]}%`)
        if(member_list[i]===user){
          $(`#${member_list[i]}block .progress_bar_bg .progress_bar`).css("background-color", '#8E5FF4')
        }
        else{
          $(`#${member_list[i]}block .progress_bar_bg .progress_bar`).css("background-color", '#E4CCFF')
        }
        $(`#show_joint_project #${member_list[i]}block .progress_bar_bg`).click(function(){
          $(`#show_joint_project #${member_list[i]}block .member_box .tag_position .tag`).css("display", "flex")
          setTimeout(() => {
            document.addEventListener("click", clickHiddenTag)
          }, 100)
        })
        function clickHiddenTag(eve){
          if(eve.target.id != `#${member_list[i]}block`){
            $(`#show_joint_project #${member_list[i]}block .member_box .tag_position .tag`).css("display", "none")
          }
          document.removeEventListener("click", clickHiddenTag)
        }
      }
      if(count_member===1){
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".png"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpeg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".mp4"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".MOV"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
      }
      if(count_member===2){
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".png"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpeg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".mp4"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".MOV"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".png"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpeg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".mp4"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".MOV"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
      }
      if(count_member===3){
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".png"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpeg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".mp4"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".MOV"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".png"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpeg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".mp4"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".MOV"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".jpg"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".png"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".jpeg"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".mp4"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".MOV"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
      }
      if(count_member===4){
        have_pic=1
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".png"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpeg"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".mp4"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".MOV"
        ).then(()=>{
          $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".png"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpeg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".mp4"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".MOV"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".jpg"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".png"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".jpeg"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".mp4"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".MOV"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
      
      //---------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".jpg"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".png"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".jpeg"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.jpeg`)
          have_pic=1
          console.log("i=="+(i-1))
          console.log("member_list[i]=="+member_list[i-1])
          console.log(1)
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".mp4"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".MOV"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
      }
      if(count_member===5){
      have_pic=0
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpg"
      ).then(()=>{
        $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpg`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".png"
      ).then(()=>{
        $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.png`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".jpeg"
      ).then(()=>{
        $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.jpeg`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".mp4"
      ).then(()=>{
        $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.mp4`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[0]+".MOV"
      ).then(()=>{
        $("#"+member_list[0]).attr('src', `./image/personal_pic/${member_list[0]}.MOV`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[0]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      //-------------------------
      have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".png"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".jpeg"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".mp4"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[1]+".MOV"
        ).then(()=>{
          $("#"+member_list[1]).attr('src', `./image/personal_pic/${member_list[1]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[1]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".jpg"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".png"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".jpeg"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.jpeg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".mp4"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[2]+".MOV"
        ).then(()=>{
          $("#"+member_list[2]).attr('src', `./image/personal_pic/${member_list[2]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[2]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
      

        have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".jpg"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.jpg`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".png"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.png`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".jpeg"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.jpeg`)
          have_pic=1
          console.log("i=="+(i-1))
          console.log("member_list[i]=="+member_list[i-1])
          console.log(1)
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".mp4"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.mp4`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[3]+".MOV"
        ).then(()=>{
          $("#"+member_list[3]).attr('src', `./image/personal_pic/${member_list[3]}.MOV`)
          have_pic=1
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#"+member_list[3]).attr('src', `./image/personal_pic/2.jpg`)
          }
        })
        //-------------------------
      //-------------------------
      have_pic=0
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[4]+".jpg"
      ).then(()=>{
        $("#"+member_list[4]).attr('src', `./image/personal_pic/${member_list[4]}.jpg`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[4]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[4]+".png"
      ).then(()=>{
        $("#"+member_list[4]).attr('src', `./image/personal_pic/${member_list[4]}.png`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[4]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[4]+".jpeg"
      ).then(()=>{
        $("#"+member_list[4]).attr('src', `./image/personal_pic/${member_list[4]}.jpeg`)
        have_pic=1
        console.log("i=="+(i-1))
        console.log("member_list[i]=="+member_list[i-1])
        console.log(1)
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[4]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[4]+".mp4"
      ).then(()=>{
        $("#"+member_list[4]).attr('src', `./image/personal_pic/${member_list[4]}.mp4`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[4]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      CheckImgExists(
        "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+member_list[4]+".MOV"
      ).then(()=>{
        $("#"+member_list[4]).attr('src', `./image/personal_pic/${member_list[4]}.MOV`)
        have_pic=1
      }).catch(()=>{
        if(have_pic === 0)
        {
          $("#"+member_list[4]).attr('src', `./image/personal_pic/2.jpg`)
        }
      })
      //-------------------------              
      }
    }
      
  })
}


// rank dynamic add
function getProjectCreater(project_name){
  $.get('./getCreater',{
    ID: ID,
    project_name: project_name,
  },(data)=>{
      if(data != "nothing"){
        var project_name = mod.gettabledata(data,'project_name', 0)
        var creater = mod.gettabledata(data, 'id',0)
        var user = mod.gettabledata(data, 'member',0)
        getProjectMember(creater, user, project_name)
      }
      else{
        console.log('wrong')
      }
    })
}

$(document).ready(function() {
  // add project
  $('#project_form button[type="submit"]').click((event) => {
    event.preventDefault()
    PERSONAL_OR_JOINT = MEMBER.length
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
        $("#add_project_-output").html(`${data}`)
        mod.PopUpMessage(4)
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
        var l_id = $('#add_member #id_box input[name=userid]').val()
        $('#add_member #result').css("display", "flex");
        $('#add_member #result p').html(`${data}`);
        $('#add_member #wrong').css("display", "none");
        var have_pic=0
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".jpg"
          //imgurl here
        ).then(()=>{
          $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/"+l_id+".jpg")
          have_pic=1
          //success callback
        }).catch(()=>{
          // console.log(2)
          if(have_pic === 0)
          {
            $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
          }
            //fail callback
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".png"
          //imgurl here
        ).then(()=>{
          $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/"+l_id+".png")
          have_pic=1
          //success callback
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
          }
            //fail callback
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".jpeg"
          //imgurl here
        ).then(()=>{
          $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/"+l_id+".jpeg")
          have_pic=1
          //success callback
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
          }
            //fail callback
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".MOV"
          //imgurl here
        ).then(()=>{
          $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/"+l_id+".MOV")
          have_pic=1
          //success callback
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
          }
            //fail callback
        })
        CheckImgExists(
          "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".mp4"
          //imgurl here
        ).then(()=>{
          $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/"+l_id+".mp4")
          have_pic=1
          //success callback
        }).catch(()=>{
          if(have_pic === 0)
          {
            $("#add_member #result img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
          }
            //fail callback
        })
        //---------------------------------
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
    last_participant = $('#add_member #id_box input[name=userid]').val()

    console.log(MEMBER)
    console.log("last_participant = "+last_participant)
    if(parti_num===0){
      showParticipationImage()
      setStickerSrc()
    }
    else
    {
      setStickerSrc()
    }
  })
});

$(function(){
  $(".calendar").datepicker();
});
var last_participant = ""

//show participant image
function showParticipationImage(){
  const container = document.querySelector('#add_project #project_form .box:nth-child(5) .participate_member')
  container.innerHTML=`<div></div>`

  //create element
  const sticker1 = document.createElement('img')
  const sticker2 = document.createElement('img')
  const sticker3 = document.createElement('img')
  const sticker4 = document.createElement('img')
  const block = document.createElement('div')
  //set attribute
  block.setAttribute('class', 'sticker_block')
  block.setAttribute('id', `memberimage`)
  sticker1.setAttribute('height', '34px')
  sticker1.setAttribute('width', '34px')
  sticker2.setAttribute('height', '34px')
  sticker2.setAttribute('width', '34px')
  sticker3.setAttribute('height', '34px')
  sticker3.setAttribute('width', '34px')
  sticker4.setAttribute('height', '34px')
  sticker4.setAttribute('width', '34px')
  //append child
  container.appendChild(block)
  block.appendChild(sticker1)
  block.appendChild(sticker2)
  block.appendChild(sticker3)
  block.appendChild(sticker4)
}

function setStickerSrc(){
  var have_pic=0
  parti_num++
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+last_participant+".jpg"
    //imgurl here
  ).then(()=>{
    if(parti_num===1){
      $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/"+last_participant+".jpg")
    }
    else if(parti_num===2){
      $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/"+last_participant+".jpg")
    }
    else if(parti_num===3){
      $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/"+last_participant+".jpg")
    }
    else if(parti_num===4){
      $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/"+last_participant+".jpg")
    }
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      if(parti_num===1){
        $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===2){
        $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===3){
        $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===4){
        $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/2.jpg")
      }
    }
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+last_participant+".png"
    //imgurl here
  ).then(()=>{
    if(parti_num===1){
      $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/"+last_participant+".png")
    }
    else if(parti_num===2){
      $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/"+last_participant+".png")
    }
    else if(parti_num===3){
      $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/"+last_participant+".png")
    }
    else if(parti_num===4){
      $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/"+last_participant+".png")
    }
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      if(parti_num===1){
        $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===2){
        $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===3){
        $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===4){
        $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/2.jpg")
      }
    }
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+last_participant+".jpeg"
    //imgurl here
  ).then(()=>{
    if(parti_num===1){
      $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/"+last_participant+".jpeg")
    }
    else if(parti_num===2){
      $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/"+last_participant+".jpeg")
    }
    else if(parti_num===3){
      $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/"+last_participant+".jpeg")
    }
    else if(parti_num===4){
      $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/"+last_participant+".jpeg")
    }
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      if(parti_num===1){
        $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===2){
        $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===3){
        $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===4){
        $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/2.jpg")
      }
    }
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+last_participant+".MOV"
    //imgurl here
  ).then(()=>{
    if(parti_num===1){
      $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/"+last_participant+".MOV")
    }
    else if(parti_num===2){
      $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/"+last_participant+".MOV")
    }
    else if(parti_num===3){
      $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/"+last_participant+".MOV")
    }
    else if(parti_num===4){
      $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/"+last_participant+".MOV")
    }
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      if(parti_num===1){
        $("#memberimage img:nth-child(1)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===2){
        $("#memberimage img:nth-child(2)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===3){
        $("#memberimage img:nth-child(3)").attr("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===4){
        $("#memberimage img:nth-child(4)").attr("src", "./image/personal_pic/2.jpg")
      }
    }
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+last_participant+".mp4"
    //imgurl here
  ).then(()=>{
    if(parti_num===1){
      sticker1.setAttribute("src", "./image/personal_pic/"+last_participant+".mp4")
    }
    else if(parti_num===2){
      sticker2.setAttribute("src", "./image/personal_pic/"+last_participant+".mp4")
    }
    else if(parti_num===3){
      sticker3.setAttribute("src", "./image/personal_pic/"+last_participant+".mp4")
    }
    else if(parti_num===4){
      sticker4.setAttribute("src", "./image/personal_pic/"+last_participant+".mp4")
    }
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      if(parti_num===1){
        sticker1.setAttribute("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===2){
        sticker2.setAttribute("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===3){
        sticker3.setAttribute("src", "./image/personal_pic/2.jpg")
      }
      else if(parti_num===4){
        sticker4.setAttribute("src", "./image/personal_pic/2.jpg")
      }
    }
    console.log("last_participant = "+last_participant)
    console.log("parti_num="+parti_num)
      //fail callback
  })
//
}