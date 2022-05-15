import ID from './signup.js'
import * as mod from './module.js'


$('#accounting #record #save').click((event) => {
    event.preventDefault()
    console.log(1)
    getdetail()
})

function getdetail(){
    var today= new Date()
    $.get('./getmainpagedetail',{
        id:ID,
        date:today.getDate(),
        month:today.getMonth()+1,
        year: today.getFullYear()
    },(data)=>{
        if(data!="nothing"){
            const container = document.querySelector('.list')
            container.innerHTML=`<p></p>`
            for (var i in data){
                var item= mod.gettabledata(data,'items',i)
                var value = mod.gettabledata(data, 'cost',i)

                console.log(item,value)

                const container = document.querySelector('.list')
                const paragraph = document.createElement('P')
                paragraph.textContent= '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+`${item}`+
                '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+
                `$${value}`
                paragraph.setAttribute('class','text')
                container.appendChild(paragraph)
            } 
        }
        else{

        }
    }
    )
}