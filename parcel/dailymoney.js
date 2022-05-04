import ID from './signup.js' 
import * as mod from './module.js'

function calculate(){
    var today=new Date();
    var totalday=0;
    
    if(today.getMonth()=(1||3||5||7||8||10||12)){
        totalday=31
    }
    else if(today.getMonth()=2){
        if (today.getFullYear()%4==0){
            totalday=29
            if(today.getFullYear()%100){
                totalday=28
                if (today.getFullYear()%400){
                    totalday=29
                }
            }
        }
    }
    else{
        totalday=30
    }
    const search_money = `
    SELECT money FROM user
    WHERE id = ${UID}
    ORDER BY money`
    connect.query(search_money, (err,money,fields) => {
        if (err)
            console.log('fail to search id: ', err)
        let income=calIncome(money)
        let expenditure=calExpenditure();
        let dailyeExp=
    }) 
}
function calIncome(money){
    let income=0
    for (var i in money){
        if (mod.gettabledata(money,ID,i)>0){
            income=income+mod.gettabledata(money, ID,i)
        }
    }

}
function calExpenditure(money){
    let expenditure=0
    for (var i in money){
        if (mod.gettabledata(money,ID,i)>0){
            expenditure=expenditure+mod.gettabledata(money, ID,i)
        }
    }
}