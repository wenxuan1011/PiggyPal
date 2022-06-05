/*
This is the place to put some module for easy coding
if you want to use the module in this file, please following the steps below
    Put this code in the beginning of your js:
        import * as mod from './module.js'
    when you want to use the mod inside, use 
        module.functionname()
    to call the function, some may need to put the parameter in the ()


If anyone want to add some new mod in the file, please set the function name as well-known 
as possible. Moreover, rememder to export function at the buttom of the code. 

If it is convenient, use the annotation at the buttom of export to let others know what is 
this function doing

By Maker
*/
"use strict";
import 'regenerator-runtime/runtime.js'

var today=new Date();

export function gettabledata(table, parameter, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=result[parameter]
    
    return result;
}

export function getTodayMoney(ID,table,selection,type){
    var result= caltodaymoney(ID,table,selection,type)
    return result
}

export async function caltodaymoney(ID,table,selection,type){
    var results=0
    var today=new Date()
    await $.get('./todaymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:StringtoInt(today.getMonth())+1,
        date:today.getDate(),
        year:today.getFullYear(),
        type:type
    },(data) =>{
        var result=0;
        if(typeof(data)!=String){
            var total=0
            for (var i in data){
                total+=StringtoInt(gettabledata(data, `${selection}`, i))
                i++;
            }
            //total=gettabledata(money,type,0)
            //console.log(`total:${total}`)
            result=total
        }
        else{
            result=0;
        }
        //console.log(result)
        results=result
    });
    //console.log(results)
    
    return results;
}

export function getMonthlyMoney(ID,table,selection,type){
    var result= caltotalmoney(ID,table,selection,type)

/*
    result.then(res => {
        result=res
        console.log ("hi",result)
        
    })

*/
    return result
}

export async function caltotalmoney(ID,table,selection,type){
    var results=0
    var today= new Date()
    await $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:datetransfer(today.getMonth()+1),
        year:StringtoInt(today.getFullYear()),
        type:type
    },(data) =>{
        var result=0;
        if(typeof(data)!=String){
            var total=0
            for (var i in data){
                total+=StringtoInt(gettabledata(data, `${selection}`, i))
                i++;
            }
            //total=gettabledata(money,type,0)
            //console.log(`total:${total}`)
            result=total
        }
        else{
            result=0;
        }
        //console.log(result)
        results=result

    });
    //console.log(results)
    return results;
}
//need to check what is the detail in table

export async function getProjectMoney(ID){
    var results=0
    await $.get('./getProject',{
        ID:ID,
    },(data) =>{
        var totalremain = 0
        for (let i in data){
            let lastday = new Date(`${gettabledata(data, `end_month`, i)}/${gettabledata(data, `end_day`, i)}/${gettabledata(data, `end_year`, i)}`)
            let startday = new Date()
            //console.log(lastday, startday)
            if(lastday-startday<0){
                continue;
            }
            var remainday= Math.abs(lastday-startday)
            
            if(remainday>0 || remainday !== undefined){
                remainday= Math.ceil(remainday/(1000*3600*24))+1
                //console.log("Projectremainday:",remainday)
                let money= StringtoInt(gettabledata(data, `target_number`,i))-StringtoInt(gettabledata(data, `saved_money`,i))//0 is for simulating money already save for this project
                money= money/remainday
                totalremain+=money
            }
            else continue
        }
        results=totalremain
    });
    
    //console.log(results)
    return results;
}
export async function calprojectpercent(ID, project_name){
    var result=0
    await $.get('./getproject', {
        ID:ID
    },(data) =>{
        for(var i in data){
            if(project_name === data[i].project_name){
                result=StringtoInt(gettabledata(data, 'saved_money', i))/StringtoInt(gettabledata(data, 'target_number', i))
                result=result/100
            }
        }
    })
    
    return Math.round(result,-1)
}
export function StringtoInt(x) {
    const parsed = parseInt(x, 10)
    if (isNaN(parsed)) { return 0; }
    return parsed
}

export function datetransfer(date){
    if (StringtoInt(date)<10){
        date=`0${date}`
    }
      else{
        date=date
      }
    return date
}

export function checkBlank(page, ...input){
    var lengths=1
    var recordmessage = ["項目","日期", "金額", "類別"]
    var projectmessage = ["專案名稱", "日期", "目標金額"]
    var financial = ["type", "ITEM", "YEAR", "MONTH", "DAY", "MONEY", "REPEAT"]
    var pages = []
    
    switch(page){
        case 'record':
            pages = recordmessage
            break
        case 'project':
            pages = projectmessage
            break
        case 'financial':
            pages = financial
            break
    }

    for (var j =0; j<input.length; j++){
        lengths=lengths*(input[j].length-2)
        if(lengths===0){
            return pages[j];
        }
        if(lengths>1&&j===input.length-1){
            return 1;
        }
    }
}

export function PopUpMessage(type){
    console.log(123)
    $('#popup').css('display','flex')
    $('#popup #background #box #message p').html(`尚未填寫${type}`)
}

export async function getAllUser(){
    var all_user=[]
    await $.get('./getAllUser',{}
        ,(data) =>{
            all_user = data
            //console.log(data)
        })
    return all_user
}

export async function sergetProject(user){
    var all_project
    await $.get('./sergetProject',{
        user : user
    },(data) => {
        all_project = data
        all_project = all_project.sort(function(a,b){
            return a.remainday - b.remainday
        })
        
    })
    return all_project
}

export function getColor(color){
    const ColorCode = ['#F42850', '#F6A93B', '#F4EC28', '#7ED321', '#4A90E2', '#8E5FF4', '#FC75CE']
    const ColorImgSrc = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
    for(let i=0;i<7;i++){
        if(color === ColorCode[i]){
            return ColorImgSrc[i]
        }
    }
}

export default{
    gettabledata,//get id inside the row of column select from database
    getMonthlyMoney,//get money in each table, remember to use caltotalmoney to get in integer
    caltotalmoney,//calculate total money
    getProjectMoney,//get daily project saving
    calprojectpercent,//calculate project complete %(in .1f )
    StringtoInt,//transfer string to integer
    datetransfer,//tranfer date to 0date if date<10
    checkBlank,//check if there is a blank in input. Need to input all input to check, and it will return 1 for all inputs are filled
    getAllUser,//get all users' id
    sergetProject,//FOR SERVER TO GET PROJECT
    PopUpMessage,//popup message, need to input the word you want to show
    getColor,//turn the color code into the color, need to input the color code of the project
} 
