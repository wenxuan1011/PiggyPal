var TIME = new Date()


// --------------- color selector in project ---------------
var COLOR = '#F6A93B'  // project color

// open/close color_select_box
$('#add_project .box:nth-child(2) .color_selector').click(function(){
  $('.color_select_box').css("display", "flex")
  setTimeout(() => {
    $('.color_select_box').css("transform", "translateY(0%)")
    document.addEventListener("click", clickHiddenColorBox);
  }, 100)
})
  
function clickHiddenColorBox(eve){
  if( eve.target.class != "color_select_box" ){
    $('.color_select_box').css("transform", "translateY(100%)")
    setTimeout(() => {
      $('.color_select_box').css("display", "none")
    }, 500)
  }
  document.removeEventListener("click", clickHiddenColorBox);
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



// ------------------ number keyboard selector ------------------
var money = ''
var t = document.getElementById("spend")

// open number keyboard selector
$('#spend').click(function(){
  $('.NumKeyBoard_select_box').css("display", "flex")
  setTimeout(() => {
    $('.NumKeyBoard_select_box').css("transform", "translateY(0%)")
  }, 100)
  document.activeElement.blur()
})

// let every number a button to print number
$('#zero').click(function(){
  money = money + "0"
  t.value = money;
})

$('#one').click(function(){
  money = money + "1"
  t.value = money;
})

$('#two').click(function(){
  money = money + "2"
  t.value = money;
})

$('#three').click(function(){
  money = money + "3"
  t.value = money;
})

$('#four').click(function(){
  money = money + "4"
  t.value = money;
})

$('#five').click(function(){
  money = money + "5"
  t.value = money;
})

$('#six').click(function(){
  money = money + "6"
  t.value = money;
})

$('#seven').click(function(){
  money = money + "7"
  t.value = money;
})

$('#eight').click(function(){
  money = money + "8"
  t.value = money;
})

$('#nine').click(function(){
  money = money + "9"
  t.value = money;
})

$('#backspace').click(function(){
  money = money.slice(0, -1)
  t.value = money;
})

$('#ok').click(function(){
  // close number keyboard selector
  $('.NumKeyBoard_select_box').css("transform", "translateY(100%)")
  setTimeout(() => {
    $('.NumKeyBoard_select_box').css("display", "none")
    money = ''
  }, 500)
})


// ------------------ expend and income sort selector box ------------------
// open/close sort_select_box
$('#add_deals #fin .box:nth-child(3) .input_div').click(function(){
  $('.sort_select_box').css("display", "flex")
  setTimeout(() => {
    $('.sort_select_box').css("transform", "translateY(0%)")
    document.addEventListener("click", clickHiddenSortBox);
  }, 100)
})
  
function clickHiddenSortBox(eve){
  if( eve.target.class != "sort_select_box" ){
    $('.sort_select_box').css("transform", "translateY(100%)")
    setTimeout(() => {
      $('.sort_select_box').css("display", "none")
    }, 500)
  }
  document.removeEventListener("click", clickHiddenSortBox);
}

const ExpendSortName = ['飲食', '購物', '家居', '個人', '交通', '娛樂', '醫療', '其他']
const IncomeSortName = ['薪水', '獎金', '投資', '還款', '中獎', '利息', '其他']
const ExpendSortImage = ['food', 'shopping', 'house', 'personal', 'transport', 'entertainment', 'hospital', 'other']
const IncomeSortImage = ['salary', 'bonus', 'investment', 'repayment', 'win', 'intersest', 'other']

$('#expend, #add_deals_btn').click((event)=> {
  CreateSortBox(ExpendSortImage, ExpendSortName)
})

$('#income').click((event)=> {
  CreateSortBox(IncomeSortImage, IncomeSortName)
})

function CreateSortBox(image, name){
  const container = document.querySelector('.sort_select_box .sort_bar')
  container.innerHTML=`<div></div>`
  var ImageList = image
  var NameList = name
  for(let i=0;i<ImageList.length;i++){
    const block = document.createElement('div')
    const ImageBox = document.createElement('img')
    const NameBox = document.createElement('p')
    block.setAttribute("class", "sort_box")
    ImageBox.setAttribute("src", `./image/Accounting/${ImageList[i]}_icon.png`)
    ImageBox.setAttribute("width", "100%")
    NameBox.textContent = `${NameList[i]}`
    container.appendChild(block)
    block.appendChild(ImageBox)
    block.appendChild(NameBox)
  }
  for(let i=2;i<10;i++){
    $(`.sort_select_box .sort_bar .sort_box:nth-child(${i})`).click(function(){
      var sort_word = $(`.sort_select_box .sort_bar .sort_box:nth-child(${i}) p`).text()
      $('#add_deals #fin #sort').html(`${sort_word}`)
    })
  }
}


// ------------------ other selector boxs ------------------
// open/close other_select_box
$('#add_financial_page .box:nth-child(4) .repeat_div').click(function(){
  $('.other_select_box').css("display", "flex")
  setTimeout(() => {
    $('.other_select_box').css("transform", "translateY(0%)")
    document.addEventListener("click", clickHiddenOtherBox);
  }, 100)
})
  
function clickHiddenOtherBox(eve){
  if( eve.target.class != "other_select_box" ){
    $('.other_select_box').css("transform", "translateY(100%)")
    setTimeout(() => {
      $('.other_select_box').css("display", "none")
    }, 500)
  }
  document.removeEventListener("click", clickHiddenOtherBox)
}

const Repeat = ['重複循環', '不重複', '每天', '每週', '每月', '每年', '自訂']

$('#personal_page #financial_setting .list li').click((event)=> {
  CreateOtherBox(Repeat)
})

function CreateOtherBox(name){
  const container = document.querySelector('.other_select_box .other_bar')
  container.innerHTML=`<div></div>`
  var NameList = name
  for(let i=1;i<NameList.length;i++){
    const block = document.createElement('div')
    const NameBox = document.createElement('p')
    block.setAttribute("class", "other_box")
    NameBox.textContent = `${NameList[i]}`
    container.appendChild(block)
    block.appendChild(NameBox)
  }
  for(let i=1;i<NameList.length;i++){
    $(`.other_select_box .other_bar .other_box:nth-child(${i})`).click(function(){
      var word = $(`.other_select_box .other_bar .other_box:nth-child(${i}) p`).text()
      $('#add_financial_page #financial .box:nth-child(4) .repeat_div p').html(`${word}`)
    })
  }
}


export default{
  transmitCOLOR,
  InitialColor,
}