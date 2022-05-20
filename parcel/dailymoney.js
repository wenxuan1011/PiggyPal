import ID from './signup.js' 
import * as mod from './module.js'

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

    //console.log(getMonthlyMoney(ID,'Account','cost',StringtoInt(today.getMonth())+1,0))
    //await test(totalday,today)
    
    setTimeout(function(){
        
        var DailyExpenditure=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income)/(mod.StringtoInt(totalday-today.getDate())+1)
        var actualDailyExpenditure=DailyExpenditure-ProjectSaving/1
        if(actualDailyExpenditure<0){
            //daily avaliable expenditure warning
        }
        console.log(Expenditure,111)
        console.log(Math.floor(DailyExpenditure),"actually money : ",Math.floor(actualDailyExpenditure))
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
        console.log(`totalday:${totalday},remain:${totalday-today.getDate()+1}`)
    }
    else{
        totalday=MonthlyTotalDay[today.getMonth()]
        console.log(`totalday:${totalday},remain:${totalday-today.getDate()+1}`)
    }
    return totalday;
}
function test(totalday,today){

    var DailyExpenditure=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income)/(mod.StringtoInt(totalday-today.getDate())+1)
        var actualDailyExpenditure=DailyExpenditure-ProjectSaving/1
        if(actualDailyExpenditure<0){
            //daily avaliable expenditure warning
        }
        console.log(Expenditure,111)
        console.log(Math.floor(DailyExpenditure),"actually money : ",Math.floor(actualDailyExpenditure))
}

function setVariable(ID){
    var today=new Date();
        Expenditure= mod.getMonthlyMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,0);
        Income= mod.getMonthlyMoney(ID,'Account','cost',mod.StringtoInt(today.getMonth())+1,1)
        MonthlyIncome= mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,0)
        MonthlyExpend= mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,1)
        MonthlySaving= mod.getMonthlyMoney(ID,'financial','money',mod.StringtoInt(today.getMonth())+1,2)
        ProjectSaving= mod.getProjectMoney(ID)
        Expenditure.then(res => {
            console.log(res)
            Expenditure=Math.ceil(res)
            console.log(Expenditure,222)
        })
        Income.then(res => {
            console.log(res)
            Income=Math.ceil(res)
            console.log(Income,222)
        })
        MonthlyExpend.then(res => {
            console.log(res)
            MonthlyExpend=Math.ceil(res)
            console.log(MonthlyExpend,222)
        })
        MonthlyIncome.then(res => {
            console.log(res)
            MonthlyIncome=Math.ceil(res)
            console.log(MonthlyIncome,222)
        })
        MonthlySaving.then(res => {
            console.log(res)
            MonthlySaving=Math.ceil(res)
            console.log(MonthlySaving,222)
        })
        ProjectSaving.then(res => {
            console.log(res)
            ProjectSaving=Math.ceil(res)
            console.log(ProjectSaving,222)
        })
}

//export default process