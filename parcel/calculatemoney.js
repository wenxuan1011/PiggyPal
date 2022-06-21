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
var ProjectSaved = 0

$('#Login #login-form #login button').click((event) => {
    event.preventDefault()
    setTimeout(async function(){
        process(ID)        
    },0)
    
})

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
<<<<<<< HEAD
        todayExpenditure= await mod.getTodayMoney(ID,'account',today.getFullYear(),mod.StringtoInt(today.getMonth())+1,today.getDate(),'cost',0);
        todayIncome= await mod.getTodayMoney(ID,'account',today.getFullYear(),mod.StringtoInt(today.getMonth())+1,today.getDate(),'cost',1);
=======
        todayExpenditure= await mod.getTodayMoney(ID,'account','cost',0);
        todayIncome= await mod.getTodayMoney(ID,'account','cost',1);
>>>>>>> a4cc1e46e3447cb18414248e8983eb98ea628bfe
        Expenditure= await mod.getMonthlyMoney(ID,'account','cost',0);
        Income= await mod.getMonthlyMoney(ID,'account','cost',1)
        ProjectSaved = await mod.getMonthlyMoney(ID, 'account', 'cost', 3)
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
    var projectsave = ProjectSaving
    $('#main #mainpage #balance_bar p:nth-child(1)').html(`$${MonthlyIncome-MonthlyExpend-MonthlySaving-Expenditure+Income-ProjectSaved}`)
    //console.log("DailyRemain:",DailyRemain)
    var actualDailyRemain=DailyRemain-ProjectSaving-todayExpenditure
    //console.log("ProjectSaving:", ProjectSaving)
    //console.log("actualDailyRemain:",actualDailyRemain)
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
            ProjectSaving = 0
            //use money in every month saving
        }
    }
    
    $('#daily_expend p:nth-child(2)').html(`今天還可以花${Math.floor(actualDailyRemain)}`)
    $('#daily_expend p:nth-child(3)').html(`今天已為專案存下${Math.floor(ProjectSaving)}`)
    showPiggy(DailyRemain, actualDailyRemain, projectsave, ProjectSaving)
    //console.log("DailyExpenditure: ", Math.floor(DailyRemain),"actually money : ",Math.floor(actualDailyRemain))
}

function showPiggy(remain, used, premain, pused){
    var picture = ['heart-eyes', 'lol', 'blinking-eye', 'smile', 'frown', 'tired', 'angry', 'sad-face', 'dead', 'shock']
    //reamin input dailyremain, used input today expenditure
    var today = new Date()
    var moneypercent = (used/remain)/(24-today.getHours())*100
    var projectmoney = (pused/premain)
    console.log(moneypercent,projectmoney)
    if(moneypercent>0){
        if(remain<100){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-shock.png')
        }
        else if(moneypercent > 5){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-heart-eyes.png')
        }
        else if(moneypercent > 3.75){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-lol.png')
        }
        else if(moneypercent > 2.5){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-blinking-eye.png')
        }
        else if(moneypercent > 1.25){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-smile.png')
        }
        else if(moneypercent > 0){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-frown.png')
        }
    }
    else{
        if (projectmoney >= 0.75){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-tired.png')
        }
        else if(projectmoney >= 0.5){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-angry.png')
        }
        else if(projectmoney >= 0.25){
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-sad-face.png')
        }
        else{
            $('#main #mainpage #project_block #daily_expend #piggy_face').attr("src", './image/MainPage/piggy-dead.png')
        }
    }
    
}

