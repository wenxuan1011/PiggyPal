var TIME = new Date()


// --------------- color selector in project ---------------
var COLOR = '#F6A93B'  // project color

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

// initial the color (orange)
export function InitialColor(){
  COLOR = '#F6A93B'
  return
}

// transmit the COLOR to other project
function transmitCOLOR(){  // I'm not sure it need 'export' or not
  return COLOR
};


// --------------- other selectors ---------------
// open/close selector_box
// not yet



export default{
  transmitCOLOR,
  InitialColor
}