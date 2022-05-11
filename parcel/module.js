/*
This is the place to put some module for easy coding
if you want to use the module in this file, please following the steps below
    Put this code in the beginning of your js:import * as module from './module.js'
    when you want to use the mod inside, use 
        module.functionname()
    to call the function, some may need to put the parameter in the ()


If anyone want to add some new mod in the file, please set the function name as well-known 
as possible. Moreover, rememder to export function at the buttom of the code. 

If it is convenient, use the annotation at the buttom of export to let other know what is 
this function doing

By Maker
*/
var today=new Date();

function gettabledata(table, id, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=result[id]
    
    return result
}

function getMonthlyMoney(ID,type){
    $.get('./monthlymoney',{
        ID:ID,
        type:type
    },(data) =>{
        if(typeof(data)===Object){
            return StringtoInt(gettabledata(data, 'cost', 0))
        }
        else 
            return 0
    })
}


function caltotalmoney(money,type){
    let total=0
    for (var i in money){
        if (gettabledata(money, 'type', i)===type && gettabledata(money, 'month',i)===today.getMonth() && gettabledata(money, 'year',i)===today.getFullYear()){
            total=total+StringtoInt(gettabledata(money, 'cost', i))
        }
    }
    return total
}
function StringtoInt(x, base) {
    const parsed = parseInt(x, base)
    if (isNaN(parsed)) { return 0; }
    return parsed
  }

export default{
    gettabledata,//get id inside the row of column select from database
    getMonthlyMoney,//get monthly fixed income(2),expenditure(3),saving(4)
    caltotalmoney,//calculate total money
    StringtoInt//transfer string to integer
} 
