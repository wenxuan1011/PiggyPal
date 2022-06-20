import ID from './signup.js'
import * as mod from './module.js'


$('#login_btn, #save').click((event) => {
    event.preventDefault()
    setTimeout(() => {
        getdetail()
    }, 100)
})

$('#add_deals_circle').click((event) => {
    event.preventDefault()    
    $('#add_deals').css("display", "flex")
    setTimeout(function(){
        $('#add_deals').css("transform", "translateX(0%)")
    },100)
})

function getdetail(){
    var today= new Date()
    $.get('./getmainpagedetail',{
        id:ID,
        date: today.getDate(),
        month: today.getMonth()+1,
        year: today.getFullYear()
    },(data)=>{
        if(data!="nothing"){
            const container = document.querySelector('.list')
            container.innerHTML=`<p></p>`
            for (var i in data){
                var item= mod.gettabledata(data,'items',i)
                var value = mod.gettabledata(data, 'cost',i)
                var type = mod.gettabledata(data, 'type',i)
                if(item == ''||value == ''||type == '3'){
                    continue;
                }
                //create element
                const container = document.querySelector('.list')
                const box= document.createElement('a')
                const paragraphone = document.createElement('P')
                const paragraphtwo = document.createElement('P')
                //set text
                paragraphone.textContent= `${item}`
                paragraphtwo.textContent=`$${value}`
                //set attribute
                box.setAttribute('id','a')
                paragraphone.setAttribute('class','text')
                paragraphtwo.setAttribute('class','text')
                //append child
                container.appendChild(box)
                box.appendChild(paragraphone)
                box.appendChild(paragraphtwo)
            }
        }
        else{

        }
    }
    )
}