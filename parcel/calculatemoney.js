import ID from './signup.js' 
import * as mod from './module.js'

var todayExpenditure=0
var todayIncome = 0
var Expenditure = 0
var Income = 0
var MonthlyExpend = 0
var MonthlyIncome = 0
var MonthlySaving = 0
var ProjectSaving = 0

$('#navbar').click((event) =>{
    event.preventDefault()
    process(ID)
})

async function process(ID){
    var today=new Date();
    var totalday=setremainDay(today,totalday);
    
    await setVariable(ID)
    await calculatemoney(today,totalday)
    
    /*
    setTimeout(function(){
        
        var DailyRemain=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income+todayExpenditure)/(mod.StringtoInt(totalday-today.getDate())+1)
        console.log("DailyRemain:",DailyRemain)
        var actualDailyRemain=DailyRemain-ProjectSaving-todayExpenditure
        console.log("ProjectSaving:", ProjectSaving)
        console.log("actualDailyRemain:",actualDailyRemain)
        if((todayIncome-todayExpenditure)>=0){
            $('#main #accounting #everyday_earn #today_earn p:nth-child(2)').html(`+${todayIncome-todayExpenditure}`)
        }
        else{
            $('#main #accounting #everyday_earn #today_earn p:nth-child(2)').html(`${todayIncome-todayExpenditure}`)
        }
        
        if(actualDailyRemain<0){
            //daily avaliable expenditure warning
            ProjectSaving=ProjectSaving+actualDailyRemain
            actualDailyRemain=0
            if(ProjectSaving<0){
                
                //use money in every month saving
            }
        }
        
        $('#daily_expend p:nth-child(1)').html(`今天還可以花${Math.floor(actualDailyRemain)}`)
        $('#daily_expend p:nth-child(2)').html(`今天已為專案存下${ProjectSaving}`)
        console.log("DailyExpenditure: ", Math.floor(DailyRemain),"actually money : ",Math.floor(actualDailyRemain))
    },1000)
    */
}

function setremainDay(today,totalday){
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
    }
    else{
        totalday=MonthlyTotalDay[today.getMonth()]
    }
    return totalday;
}

async function setVariable(ID){
    var today=new Date();
        todayExpenditure= await mod.getTodayMoney(ID,'Account','cost',0);
        todayIncome= await mod.getTodayMoney(ID,'Account','cost',1);
        Expenditure= await mod.getMonthlyMoney(ID,'Account','cost',0);
        Income= await mod.getMonthlyMoney(ID,'Account','cost',1)
        MonthlyIncome= await mod.getMonthlyMoney(ID,'financial','money',0)
        MonthlyExpend= await mod.getMonthlyMoney(ID,'financial','money',1)
        MonthlySaving= await mod.getMonthlyMoney(ID,'financial','money',2)
        ProjectSaving= await mod.getProjectMoney(ID,"goal")

        /*
        todayExpenditure.then(res => {
            todayExpenditure=Math.ceil(res)
        })
        todayIncome.then(res => {
            todayIncome=Math.ceil(res)
        })
        Expenditure.then(res => {
            Expenditure=Math.ceil(res)
        })
        Income.then(res => {
            Income=Math.ceil(res)
        })
        MonthlyExpend.then(res => {
            MonthlyExpend=Math.ceil(res)
        })
        MonthlyIncome.then(res => {
            MonthlyIncome=Math.ceil(res)
        })
        MonthlySaving.then(res => {
            MonthlySaving=Math.ceil(res)
        })
        ProjectSaving.then(res => {
            ProjectSaving=Math.ceil(res)
            console.log(ProjectSaving)
        })
        */
}

async function calculatemoney(today,totalday){
    var DailyRemain=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income+todayExpenditure)/(mod.StringtoInt(totalday-today.getDate())+1)
    console.log("DailyRemain:",DailyRemain)
    var actualDailyRemain=DailyRemain-ProjectSaving-todayExpenditure
    console.log("ProjectSaving:", ProjectSaving)
    console.log("actualDailyRemain:",actualDailyRemain)
    if((todayIncome-todayExpenditure)>=0){
        $('#main #accounting #everyday_earn #today_earn p:nth-child(2)').html(`+${todayIncome-todayExpenditure}`)
    }
    else{
        $('#main #accounting #everyday_earn #today_earn p:nth-child(2)').html(`${todayIncome-todayExpenditure}`)
    }
    
    if(actualDailyRemain<0){
        //daily avaliable expenditure warning
        ProjectSaving=ProjectSaving+actualDailyRemain
        actualDailyRemain=0
        if(ProjectSaving<0){
            
            //use money in every month saving
        }
    }
    
    $('#daily_expend p:nth-child(1)').html(`今天還可以花${Math.floor(actualDailyRemain)}`)
    $('#daily_expend p:nth-child(2)').html(`今天已為專案存下${Math.floor(ProjectSaving)}`)
    console.log("DailyExpenditure: ", Math.floor(DailyRemain),"actually money : ",Math.floor(actualDailyRemain))
}
//export default process