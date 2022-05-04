import transmit from './signup.js' 

$('#login button[type="submit"]').click((event)=> {
    event.preventDefault()
    setTimeout(()=>{
        $('#login-output').html(transmit)
    },500)
})
