import ID from './signup.js' 
//import * as mod from './module.js'

var Expenditure=0
var Income=0
var MonthlyExpend=0
var MonthlyIncome=0
var MonthlySaving=0

$('#navbar').click((event) =>{
    event.preventDefault()
    calculate()
})

function calculate(){
    var today=new Date();
    var totalday=0;
    
    var MonthlyTotalDay=[31,28,31,30,31,30,31,31,30,31,30,31]
    
    if(today.getMonth()==2){
        if (today.getFullYear()%4==0){
            totalday=29
            if(today.getFullYear()%100==0){
                totalday=28
                if (today.getFullYear()%400==0){
                    totalday=29
                }
            }
        }
        totalday=MonthlyTotalDay[today.getMonth()]
        console.log(`totalday:${totalday},remain:${totalday-today.getDate()+1}`)
    }
    else{
        totalday=MonthlyTotalDay[today.getMonth()]
        console.log(`totalday:${totalday},remain:${totalday-today.getDate()+1}`)
    }
    
    /*
    Expenditure = getMonthlyMoney(ID,'Account','cost',StringtoInt(today.getMonth())+1,0);
    Income = getMonthlyMoney(ID,'Account','cost',StringtoInt(today.getMonth())+1)
    MonthlyExpend = getMonthlyMoney(ID,'financial','money',StringtoInt(today.getMonth())+1,0)
    MonthlyIncome = getMonthlyMoney(ID,'financial','money',StringtoInt(today.getMonth())+1,1)
    MonthlySaving = getMonthlyMoney(ID,'financial','money',StringtoInt(today.getMonth())+1,2)
    */
    getMonthlyMoneyEE(ID,'Account','cost',StringtoInt(today.getMonth())+1,0);
    getMonthlyMoneyII(ID,'Account','cost',StringtoInt(today.getMonth())+1,1);
    getMonthlyMoneyE(ID,'financial','money',StringtoInt(today.getMonth())+1,0);
    getMonthlyMoneyI(ID,'financial','money',StringtoInt(today.getMonth())+1,1);
    getMonthlyMoneyS(ID,'financial','money',StringtoInt(today.getMonth())+1,2);

    for(var i=0;i<20000;i++){
        console.log(i)
    }
    //setVariable()
    var ProjectSaving=0
    var DailyExpenditure=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income)/(StringtoInt(totalday-today.getDate())+1)
    var actualDailyExpenditure=DailyExpenditure-ProjectSaving/1
    if(actualDailyExpenditure<0){
        //daily avaliable expenditure warning
    }

    //console.log(getMonthlyMoney(ID,'Account','cost',StringtoInt(today.getMonth())+1,0))
    console.log(Expenditure,Income)
    console.log(DailyExpenditure)
}

function gettabledata(table, parameter, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=result[parameter]
    
    return result;
}

/*
async function setVariable(){
    try{
        Expenditure=await getMonthlyMoney(ID,'Account','cost',StringtoInt(today.getMonth())+1,0);
        Income=await getMonthlyMoney(ID,'Account','cost',StringtoInt(today.getMonth())+1)
        MonthlyExpend= await getMonthlyMoney(ID,'financial','money',StringtoInt(today.getMonth())+1,0)
        MonthlyIncome=await getMonthlyMoney(ID,'financial','money',StringtoInt(today.getMonth())+1,1)
        MonthlySaving= await getMonthlyMoney(ID,'financial','money',StringtoInt(today.getMonth())+1,2)
    }
    catch(err){
        console.log('something went wrong',err)
    }
    
}
*/

function getMonthlyMoney(ID,table,selection,month,type){
    var result= 9999;
    var lock=0;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
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
                result=total
                console.log(result)
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            
        }
        else{
            result=0;
        }
        setTimeout(function(){
            console.log(`'test':${result}`)
        },100)
        
    })
    return result
    
}
function getMonthlyMoneyEE(ID,table,selection,month,type){
    var result= 9999;
    var lock=0;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
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
                result=total
                console.log(result)
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            
        }
        else{
            result=0;
        }
        setTimeout(function(){
            console.log(`'test':${result}`)
            Expenditure=result
        },100)
        
    })
    return result
    
}
function getMonthlyMoneyII(ID,table,selection,month,type){
    var result= 9999;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
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
                result=total
                console.log(result)
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            
        }
        else{
            result=0;
        }
        setTimeout(function(){
            console.log(`'test':${result}`)
            Income=result
        },100)
        
    })
    return result
    
}
function getMonthlyMoneyE(ID,table,selection,month,type){
    var result= 9999;
    var lock=0;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
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
                result=total
                console.log(result)
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            
        }
        else{
            result=0;
        }
        setTimeout(function(){
            console.log(`'test':${result}`)
            MonthlyExpend=result
        },100)
        
    })
    return result
    
}
function getMonthlyMoneyI(ID,table,selection,month,type){
    var result= 9999;
    var lock=0;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
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
                result=total
                console.log(result)
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            
        }
        else{
            result=0;
        }
        setTimeout(function(){
            console.log(`'test':${result}`)
            MonthlyIncome=result
        },100)
        
    })
    return result
    
}
function getMonthlyMoneyS(ID,table,selection,month,type){
    var result= 9999;
    var lock=0;
    $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        type:type
    },(data) =>{
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
                result=total
                console.log(result)
            }
            //total=gettabledata(money,type,0)
            console.log(`total:${total}`)
            
        }
        else{
            result=0;
        }
        setTimeout(function(){
            console.log(`'test':${result}`)
            MonthlySaving=result
        },100)
        
    })
    return result
    
}

function calculatetotal(one,two,three,four,five){

}

function StringtoInt(x) {
    const parsed = parseInt(x, 10)
    if (isNaN(parsed)) { return 0; }
    return parsed
}
