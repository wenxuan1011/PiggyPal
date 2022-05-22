import ID from './signup.js' 
import * as mod from './module.js'

var todayExpenditure=0
var todayIncome=0
var Expenditure=0
var Income=0
var MonthlyExpend=0
var MonthlyIncome=0
var MonthlySaving=0
var ProjectSaving=0

$('#navbar').click((event) =>{
    event.preventDefault()
    process(ID)
})

async function process(ID){
    var today=new Date();
    var totalday=setremainDay(today,totalday);
    
    await setVariable(ID)
    
    setTimeout(function(){
        
        var DailyExpenditure=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income+todayExpenditure)/(mod.StringtoInt(totalday-today.getDate())+1)
        var actualDailyExpenditure=DailyExpenditure-ProjectSaving-todayExpenditure
        if(actualDailyExpenditure<0){
            //daily avaliable expenditure warning
        }
        $('#daily_expend p').html(`今天還可以花${Math.floor(actualDailyExpenditure)}，今天已為專案存下${ProjectSaving}`)
        console.log(Expenditure,111)
        console.log("DailyExpenditure: ", Math.floor(DailyExpenditure),"actually money : ",Math.floor(actualDailyExpenditure))
    },1000)
    
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

function setVariable(ID){
    var today=new Date();
        todayExpenditure=mod.getTodayMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,0);
        Expenditure= mod.getMonthlyMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,0);
        Income= mod.getMonthlyMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,1)
        MonthlyIncome= mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,0)
        MonthlyExpend= mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,1)
        MonthlySaving= mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,2)
        ProjectSaving= mod.getProjectMoney(ID)
        todayExpenditure.then(res => {
            todayExpenditure=Math.ceil(res)
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
        })
}

//export default process