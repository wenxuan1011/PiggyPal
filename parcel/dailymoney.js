import ID from './signup.js' 
import * as mod from './module.js'

var Expenditure=0
var Income=0
var MonthlyExpend=0
var MonthlyIncome=0
var MonthlySaving=0

$('#navbar:nth-child(3)').click((event) =>{
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
    Expenditure = mod.getMonthlyMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,0);
    Income = mod.getMonthlyMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,1)
    MonthlyExpend = mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,0)
    MonthlyIncome = mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,1)
    MonthlySaving = mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,2)
    */
   /*
    getMonthlyMoneyEE(ID,'Account','cost',StringtoInt(today.getMonth())+1,0);
    getMonthlyMoneyII(ID,'Account','cost',StringtoInt(today.getMonth())+1,1);
    getMonthlyMoneyE(ID,'financial','money',StringtoInt(today.getMonth())+1,0);
    getMonthlyMoneyI(ID,'financial','money',StringtoInt(today.getMonth())+1,1);
    getMonthlyMoneyS(ID,'financial','money',StringtoInt(today.getMonth())+1,2);
*/
    setVariable()
    var ProjectSaving=0
    var DailyExpenditure=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income)/(mod.StringtoInt(totalday-today.getDate())+1)
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

//use axios
async function getMonthlyMoney(ID,table,selection,month,type){
    var result= 0;

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
                console.log(mod.StringtoInt(gettabledata(data, `${selection}`, i)))
                //console.log(1)
                //console.log(i,data)
                total+=mod.StringtoInt(gettabledata(data, `${selection}`, i))
                i++;
                result=total
                //console.log(result)
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

