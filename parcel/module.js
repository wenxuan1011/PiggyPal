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

If it is convenient, use the annotation at the buttom of export to let other know what is 
this function doing

By Maker
*/
var today=new Date();

export function gettabledata(table, parameter, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=result[parameter]
    
    return result;
}

export function getMonthlyMoney(ID,table,selection,month,type){
    var result;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
        //var result=0;
        if(typeof(data)!=String){
            var total=0
            //console.log('calculate:')
            //console.log(typeof(data),selection)
            for (var i in data){
                console.log(StringtoInt(gettabledata(data, `${selection}`, i)))
                //console.log(1)
                //console.log(i,data)
                total+=StringtoInt(gettabledata(data, `${selection}`, i))
                i++;
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            result=total
        }
        else{
            result=0;
        }
        console.log(result)
        return result;
    })
    
}

export function caltotalmoney(ID,table,selection,month,type){
    var money=getMonthlyMoney(ID,table,selection,month,type)
    console.log(typeof(money))
    var result=0;
    
    if(typeof(money)!=String){
        var total=0
        console.log('calculate:')
        console.log(typeof(money),selection)
        /*for (var i in money){
            let temp=money[i]
            console.log(1)
            console.log(i,temp)
            total=total+StringtoInt(gettabledata(temp, type, 0), 10)
            //i++;
        }*/
        //total=gettabledata(money,type,0)

            result=total
        }
    else{
        result=0;
    }
    //console.log(result)
    //return result;
    
}

export function calprojectcomplete(ID){
    return //return .1f%
}
export function StringtoInt(x) {
    const parsed = parseInt(x, 10)
    if (isNaN(parsed)) { return 0; }
    return parsed
}

export default{
    getMonthlyMoney,//get money in each table, remember to use caltotalmoney to get in integer
    caltotalmoney,//calculate total money
    calprojectcomplete,//calculate project complete %(in .1f )
    StringtoInt,//transfer string to integer
    gettabledata//get id inside the row of column select from database
} 
