import ID from './signup.js' 
import * as mod from './module.js'

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
        totalday=MonthlyTotalDay[today.getMonth()-1]
    }
    else{
        totalday=MonthlyTotalDay[today.getMonth()-1]
    }
    
    var Expenditure=mod.caltotalmoney(mod.getMonthlyMoney(ID,0),0);
    var Income=mod.caltotalmoney(mod.getMonthlyMoney(ID,1),1)
    var MonthlyIncome=mod.getMonthlyIncome(ID,2)//need to change table
    var MonthlyExpend=mod.getMonthlyIncome(ID,3)//need to change table
    var MontlySaving=mod.getMonthlyIncome(ID,4)//need to change table
    var ProjectSaving//money remain in project/project remaining day
    var DailyExpenditure=(MonthlyIncome-MonthlyExpend-MontlySaving-Expenditure+Income)/(totalday-today.getDate()+1)
    var actualDailyExpenditure=DailyExpenditure-ProjectSaving/1
    if(actualDailyExpenditure<0){
        //daily avaliable expenditure warning
    }
}

export default calculate