import * as mod from './module.js'

var all_user = []
var todayExpenditure= 0
var todayIncome = 0
var Expenditure = 0
var Income = 0
var MonthlyExpend = 0
var MonthlyIncome = 0
var MonthlySaving = 0
var ProjectSaving = 0
var ProjectSaved = 0

/*
$('#Login #login-form #login button').click((event) => {
    event.preventDefault()
    setTimeout(async function(){
        dailyprocess()
    },0)
})
*/
async function dailyprocess(){
    var today=new Date();
    var totalday=setremainDay(today,totalday);
    var all_user = await mod.getAllUser()
    for(let i in all_user){
        console.log('now update',all_user[i],'data')
        await setVariable(all_user[i])
        await calculatemoney(today,totalday)
        await saveMoneytoProject(all_user[i])
    }
    
    
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
    ProjectSaved = await mod.getMonthlyMoney(ID, 'Account', 'cost',3)
    Income= await mod.getMonthlyMoney(ID,'Account','cost',1)
    MonthlyIncome= await mod.getMonthlyMoney(ID,'financial','money',0)
    MonthlyExpend= await mod.getMonthlyMoney(ID,'financial','money',1)
    MonthlySaving= await mod.getMonthlyMoney(ID,'financial','money',2)
    ProjectSaving= await mod.getProjectMoney(ID)
    ProjectSaving= Math.ceil(ProjectSaving)
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
    //console.log("DailyRemain:",DailyRemain)
    var actualDailyRemain=DailyRemain-ProjectSaving-todayExpenditure
    //console.log("ProjectSaving:", ProjectSaving)
    //console.log("actualDailyRemain:",actualDailyRemain)
    
    if(actualDailyRemain<0){
        //daily avaliable expenditure warning
        ProjectSaving=ProjectSaving+actualDailyRemain
        actualDailyRemain=0
        if(ProjectSaving<0){
            ProjectSaving = 0
            //use money in every month saving
        }
    }

}

async function saveMoneytoProject(ID){
    var all_project = await mod.sergetProject(ID)
    var count = 0
    var today= new Date()
    while(ProjectSaving>0 && count<all_project.length){
        console.log(all_project[count])
        var saving_money = all_project[count].remain_money
        if(ProjectSaving-saving_money>=0){
            ProjectSaving=ProjectSaving-saving_money
        }
        else{
            saving_money=ProjectSaving
            ProjectSaving=0
        }
        saving_money = saving_money + all_project[count].saved_money
        console.log(all_project[count].saved_money,saving_money,ProjectSaving)
        var date=mod.datetransfer(today.getDate())
        var month=mod.datetransfer(today.getMonth()+1)
        var year=today.getFullYear()
        console.log(date,month)
        
        await $.get('./saveMoneytoProject',{
            id:all_project[count].id,
            member:all_project[count].member,
            personal_or_joint:all_project[count].personal_or_joint,
            project_name:all_project[count].project_name,
            saving_money:saving_money,
            saved_money:all_project[count].saved_money,
            date:date,
            month:month,
            year:year
        },(data)=>{
            console.log(data)
        })
        count++
    }
}

async function setfinancial(){
    var all_user = await mod.getAllUser()
    for (var id in all_user){
        await $.get('./setfinancial',{
            id:id
        },(data) => {

        })
    }
}
async function getdailymoney(){
    var all_user=await mod.getAllUser()
    for (var id in all_user){
        saveMoneytoProject(id)
    }
}
function monthlyTodo(){
    var today = new Date()
    if(DailyRemain>0){
        //save in monthly saving
    }
}





export default{
    dailyprocess
}
