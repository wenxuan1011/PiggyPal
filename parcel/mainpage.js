// import ID from './signup.js'
import * as mod from './module.js'
var ID = localStorage.getItem("ID")

$('#login_btn, #save, #signup_btn').click((event) => {
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
                var sort = mod.gettabledata(data, 'sort', i)
                if(item == ''||value == ''||type == '2'||type == '3'){
                    continue;
                }
                //create element
                const container = document.querySelector('.list')
                const box= document.createElement('a')
                const paragraphone = document.createElement('b')
                const types = document.createElement('img')
                const word = document.createElement('p')
                const paragraphtwo = document.createElement('p')
                //set text
                word.textContent= `${item}`
                paragraphtwo.textContent=`$${value}`
                //set attribute
                box.setAttribute('id','a')
                paragraphone.setAttribute('class','boxs')
                types.setAttribute('id', 'type_pic')
                types.setAttribute('src',`./image/Accounting/${detailpicture(sort, type)}_icon.png`)
                word.setAttribute('class','text')
                paragraphtwo.setAttribute('class','text')
                
                //append child
                container.appendChild(box)
                paragraphone.appendChild(types)
                paragraphone.appendChild(word)
                box.appendChild(paragraphone)
                box.appendChild(paragraphtwo)
            }
            $('#mainpage #detail_block .list').css("display", "flex")
            $('#mainpage #detail_block .no_deals').css("display", "none")
        }
        else{
            $('#mainpage #detail_block .list').css("display", "none")
            $('#mainpage #detail_block .no_deals').css("display", "flex")
        }
    }
    )
}

function detailpicture(data, type){
    var exptype = ['飲食', '購物', '家居', '個人', '交通', '娛樂', '醫療', '其他']
    var intype = ['薪水', '獎金', '投資', '還款', '中獎', '利息', '其他']
    var exppicture = ['food', 'shopping', 'house', 'personal', 'transport', 'entertainment', 'hospital', 'other']
    var inpicture = ['salary', 'bonus', 'investment', 'repayment', 'win', 'intersest', 'other']
    if(type == '0'){
        for (var i in exptype){
            if (exptype[i] == data){
                return exppicture[i]
            }
        }
    }
    if(type == '1'){
        for (var i in intype){
            if (intype[i] == data){
                return inpicture[i]
            }
        }
    }
}