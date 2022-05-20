import ID from './signup.js'
import * as mod from './module.js'


$('#save').click((event) => {
    event.preventDefault()
    console.log(1)
    getdetail()
})


function addlist(obj) {
    var ul = document.getElementByClassName(obj)
    var li = document.createElement("li")

    //�]�w li �ݩʡA�p id
    li.setAttribute("id", "newli")

    li.innerHTML = "js �ʺA�s�Wli"
    ul.appendChild(li)
}


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
                var item= gettabledata(data,'items',i)
                var value = gettabledata(data, 'cost',i)

                console.log(item,value)

                const container = document.querySelector('.list')
                const paragraph = document.createElement('P')
                const space ='                '
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

function gettabledata(table, parameter, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=result[parameter]
    return result
};
