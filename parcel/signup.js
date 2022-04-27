$(document).ready(function() {
  
  // sign up
  $('#signup button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./signup', {
      name: $('#signup input[name=name]').val(),
      id: $('#signup input[name=id]').val(),
      password: $('#signup input[name=password]').val(),
    }, (data) => {
      $("#signup-output").html(`${data}`);
    });
  })
  
  $('#login button[type="submit"]').click((event)=> {
    event.preventDefault()
    $.get('./login', {
      id: $('#login input[name=id]').val().toString(),
      password: $('#login input[name=pw]').val().toString()
    }, (data) => {
      $("#login-output").html(`${data}`);
    });
  })
});