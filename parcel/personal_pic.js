import ID from './signup.js'
var l_id = localStorage.getItem("ID")
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
var port=6174

//使用方式
var have_pic = 0

  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".jpg"
    //imgurl here
  ).then(()=>{
    
    $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".jpg")
    $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".jpg")
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".jpg")
    have_pic=1
    //success callback
  }).catch(()=>{
    // console.log(2)
    if(have_pic === 0)
    {
      $("img#change_pic").attr("src", "./image/personal_pic/2.jpg")
      $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
      $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    }
    
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".png"
    //imgurl here
  ).then(()=>{
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/"+l_id+".png")
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".png")
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".png")
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg")
      $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
      $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    }

      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".jpeg"
    //imgurl here
  ).then(()=>{
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/"+l_id+".jpeg")
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".jpeg")
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".jpeg")
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg")
      $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
      $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    }
    
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".MOV"
    //imgurl here
  ).then(()=>{
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/"+l_id+".MOV")
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".MOV")
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".MOV")
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg")
      $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
      $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    }
    
      //fail callback
  })
  CheckImgExists(
    "http://luffy.ee.ncku.edu.tw:"+port+"/image/personal_pic/"+l_id+".mp4"
    //imgurl here
  ).then(()=>{
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/"+l_id+".mp4")
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".mp4")
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".mp4")
    have_pic=1
    //success callback
  }).catch(()=>{
    if(have_pic === 0)
    {
      $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg")
      $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
      $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    }
    
      //fail callback
  })
// }

$(document).ready(function() {
  
  
  $('#image_summit').submit(function (event) {
      event.preventDefault()
      let formData = new FormData(this)
      let id = ID();
      formData.append('usr_name', id)
      $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (r) {
          console.log(r)
        },
        error: function(e) {
          console.log(e)
        }
      })
      setTimeout(() => {
        location.reload();
      }, 500)
      //
      // $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".jpg")
      // $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".jpg")
      // $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".jpg")
      //$("#change_pic img").attr("src", "./image/personal_pic/F64081127.jpg")
  })
  
})
