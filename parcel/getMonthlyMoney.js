import * as mod from './module.js'

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
                console.log(mod.StringtoInt(mod.gettabledata(data, `${selection}`, i)))
                //console.log(1)
                //console.log(i,data)
                total+=mod.StringtoInt(mod.gettabledata(data, `${selection}`, i))
                i++;
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            result=total
        }
        else{
            result=0;
        }
    
        
    })
    
        //console.log(result)
        return result;
    
    
}

export default{
    getMonthlyMoney
}