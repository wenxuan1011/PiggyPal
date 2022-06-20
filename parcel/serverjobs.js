import * as mod from './module.js'

var todayExpenditure= 0//today's expendiiture
var todayIncome = 0//today's income
var Expenditure = 0//this month expenditure
var Income = 0//this month income
var MonthlyExpend = 0//fixed monthly expenditure
var MonthlyIncome = 0//fixed monthly income
var MonthlySaving = 0//fixed monthly saving
var ProjectSaving = 0//today project saving
var ProjectSaved = 0//already saved in project

/*
$('#Login #login-form #login button').click((event) => {
    event.preventDefault()
    setTimeout(async function(){
        dailyprocess()
    },0)
})
*/
///////////////do before day end///////////////
async function dailyEndprocess(){
    var today=new Date();
    var totalday=setremainDay(today,totalday);
    var all_user = await mod.getAllUser()
    for(let i in all_user){
        console.log('now update',all_user[i],'data')
        await setVariable(all_user[i])
        await calculatemoney(today,totalday)
        await saveMoneytoProject(all_user[i])
        await setfinancialexpenditure(all_user[i])
        await checkmonthlyspend(all_user[i])
    }
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
    todayExpenditure= await mod.getTodayMoney(ID,'account','cost',0);
    todayIncome= await mod.getTodayMoney(ID,'account','cost',1);
    Expenditure= await mod.getMonthlyMoney(ID,'account','cost',0);
    ProjectSaved = await mod.getMonthlyMoney(ID, 'account', 'cost',3)
    Income= await mod.getMonthlyMoney(ID,'account','cost',1)
    MonthlyIncome= await mod.getMonthlyMoney(ID,'financial','money',0)
    MonthlyExpend= await mod.getMonthlyMoney(ID,'financial','money',1)
    MonthlySaving= await mod.getMonthlyMoney(ID,'financial','money',2)
    ProjectSaving= await mod.getProjectMoney(ID)
    ProjectSaving= Math.ceil(ProjectSaving)
}

async function calculatemoney(today,totalday){
    var DailyRemain=(MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income+todayExpenditure)/(mod.StringtoInt(totalday-today.getDate())+1)
    var actualDailyRemain=DailyRemain-ProjectSaving-todayExpenditure
    
    if(actualDailyRemain<0){
        ProjectSaving=ProjectSaving+actualDailyRemain
        actualDailyRemain=0
        if(ProjectSaving<0){
            ProjectSaving = 0
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
async function setfinancialexpenditure(ID){
    var all_user = await mod.getAllUser()
    await $.get('./setfinancialexpenditure',{
        id:ID
    },(data) => {
        
    })
}

async function checkmonthlyspend(ID){
    if((MonthlyIncome+Income)<(MonthlyExpend+MonthlySaving+Expenditure)){
        var debt = (MonthlyIncome+Income)-(MonthlyExpend+MonthlySaving+Expenditure)
        $.get('./sergetproject', {
            id:ID
        },(data)=>{
            for (let count in data){
                if(data[count].type == '2'){
                    var date=mod.datetransfer(today.getDate())
                    var month=mod.datetransfer(today.getMonth()+1)
                    var year=today.getFullYear()
                    $.get('./useMoneyinProject',{
                        id:all_project[count].id,
                        member:all_project[count].member,
                        personal_or_joint:all_project[count].personal_or_joint,
                        project_name:all_project[count].project_name,
                        using_money:debt,
                        saved_money:all_project[count].saved_money,
                        date:date,
                        month:month,
                        year:year
                    },(data)=>{
                        console.log(data)
                    })
                }
            }
        })
    }
}


//////do at day start///////////////
async function dailyStartprocess(){
    var all_user = await mod.getAllUser()
    for(var i in all_user){
        console.log('Now update ', all_user[i],' data')
        await setfinancialincome(all_user[i])
    }
    
}
async function setfinancialincome(){
    await $.get('./setfinancialincome',{
        id:id
    },(data) => {

    })
}


export default{
    dailyEndprocess,
    dailyStartprocess
}
