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
//使用方式
CheckImgExists(
  "http://140.116.177.150:6173/image/personal_pic/"+l_id+".jpg"
	//imgurl here
).then(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".jpg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".jpg")
  $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".jpg")
    //success callback
}).catch(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/2.jpg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
  $("img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    //fail callback
})
CheckImgExists(
  "http://140.116.177.150:6173/image/personal_pic/"+l_id+".png"
	//imgurl here
).then(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".png")
  $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".png")
  $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".png")
    //success callback
}).catch(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/2.jpg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
  $("img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    //fail callback
})
CheckImgExists(
  "http://140.116.177.150:6173/image/personal_pic/"+l_id+".jpeg"
	//imgurl here
).then(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".jpeg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".jpeg")
  $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".jpeg")
    //success callback
}).catch(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/2.jpg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
  $("img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    //fail callback
})
CheckImgExists(
  "http://140.116.177.150:6173/image/personal_pic/"+l_id+".MOV"
	//imgurl here
).then(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".MOV")
  $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".MOV")
  $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".MOV")
    //success callback
}).catch(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/2.jpg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
  $("img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    //fail callback
})
CheckImgExists(
  "http://140.116.177.150:6173/image/personal_pic/"+l_id+".mp4"
	//imgurl here
).then(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".mp4")
  $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".mp4")
  $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".mp4")
    //success callback
}).catch(()=>{
  $("img#change_pic").attr("src", "./image/personal_pic/2.jpg")
  $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg")
  $("img#personal_btn").attr("src", "./image/personal_pic/2.jpg")
    //fail callback
})
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