import jquery from 'jquery'
window.$ = window.jQuery = jquery

$('#change-to-login').click(function(){
  $("#SignUp").css("display", "none");
  $("#Login").css("display", "flex");
})

$('#change-to-signup').click(function(){
  $("#Login").css("display", "none");
  $("#SignUp").css("display", "flex");
})


// navbar change page
const navbar = ['barcode', 'account', 'mainpage', 'accounting', 'project'];
var present_page = 'mainpage';

$('#navbar img:nth-child(1)').click(function(){
  selected_to_unselected();
  present_page = navbar[0];
  unselected_to_selected();
})

$('#navbar img:nth-child(2)').click(function(){
  selected_to_unselected();
  present_page = navbar[1];
  unselected_to_selected();
})

$('#navbar img:nth-child(3)').click(function(){
  selected_to_unselected();
  present_page = navbar[2];
  unselected_to_selected();
})

$('#navbar img:nth-child(4)').click(function(){
  selected_to_unselected();
  present_page = navbar[3];
  unselected_to_selected();
})

$('#navbar img:nth-child(5)').click(function(){
  selected_to_unselected();
  present_page = navbar[4];
  unselected_to_selected();
})

function selected_to_unselected(){
  if(present_page == navbar[0]){
    $('#navbar img:nth-child(1)').attr("src", "./image/navbar/unselect/barcode_unselect.png");
    $('#barcode').css("display", "none");
  }
  else if(present_page == navbar[1]){
    $('#navbar img:nth-child(2)').attr("src", "./image/navbar/unselect/account_unselect.png");
    $('#account').css("display", "none");
  }
  else if(present_page == navbar[2]){
    $('#navbar img:nth-child(3)').attr("src", "./image/navbar/unselect/mainpage_unselect.png");
    $('#mainpage').css("display", "none");
  }
  else if(present_page == navbar[3]){
    $('#navbar img:nth-child(4)').attr("src", "./image/navbar/unselect/accounting_unselect.png");
    $('#accounting').css("display", "none");
  }
  else{
    $('#navbar img:nth-child(5)').attr("src", "./image/navbar/unselect/project_unselect.png");
    $('#project').css("display", "none");
  };
};

function unselected_to_selected(){
  if(present_page == navbar[0]){
    $('#navbar img:nth-child(1)').attr("src", "./image/navbar/selected/barcode_select.png");
    $('#barcode').css("display", "flex");
    window.location.href='https://luffy.ee.ncku.edu.tw/~stanly/test_camera/docs/index.html?';
  }
  else if(present_page == navbar[1]){
    $('#navbar img:nth-child(2)').attr("src", "./image/navbar/selected/account_select.png");
    $('#account').css("display", "flex");
  }
  else if(present_page == navbar[2]){
    $('#navbar img:nth-child(3)').attr("src", "./image/navbar/selected/mainpage_select.png");
    $('#mainpage').css("display", "flex");
  }
  else if(present_page == navbar[3]){
    $('#navbar img:nth-child(4)').attr("src", "./image/navbar/selected/accounting_select.png");
    $('#accounting').css("display", "flex");
  }
  else{
    $('#navbar img:nth-child(5)').attr("src", "./image/navbar/selected/project_select.png");
    $('#project').css("display", "flex");
  };
};

$(document).ready(function() {
  
  // sign up
  $('#signup button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./signup', {
      name: $('#signup input[name=name]').val(),
      id: $('#signup input[name=id]').val(),
      password: $('#signup input[name=password]').val(),
    }, (data) => {
      if(`${data}` == 'signup'){
        $('#SignUp').css("display", "none");
        $('#main').css("display", "flex");
      }
      else{
        $("#signup-output").html(`${data}`);
      };
    });
  })
  
  // login
  $('#login button[type="submit"]').click((event)=> {
    event.preventDefault()
    $.get('./login', {
      id: $('#login input[name=id]').val().toString(),
      password: $('#login input[name=pw]').val().toString()
    }, (data) => {
      if(`${data}` == 'login'){
        $('#Login').css("display", "none");
        $('#main').css("display", "flex");
      }
      else{
        $("#login-output").html(`${data}`);
      };
    });
  })
});