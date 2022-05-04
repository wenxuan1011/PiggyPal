/*
This is the place to put some module for easy coding
if you want to use the module in this file, please following the steps below
    Put this code in the beginning of your js:import * as module from './module.js'
    when you want to use the mod inside, use 
        module.functionname()
    to call the function, some may need to put the parameter in the ()


If anyone want to add some new mod in the file, please set the function name as well-known 
as possible. Moreover, rememder to export function at the buttom of the code. 

If it is convenient, use the annotation at the buttom of export to let other know what is 
this function doing

By Maker
*/

function gettabledata(table, parameter, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=`${result}.${parameter}`
    return result
}
function StringtoInt(x, base) {
    const parsed = parseInt(x, base)
    if (isNaN(parsed)) { return 0; }
    return parsed
  }

export function gettabledata(table, parameter, row)//get data inside the row of column select from database
export function StringtoInt(x, base)//transfer string to integer