#!/usr/bin/env node

import express from 'express'
//import fs, { rmSync } from 'fs'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import config from './config.js'
import mysql from 'mysql'
import mod from './parcel/module.js'
import bodyParser from 'body-parser'
//import serverjob from './parcel/serverjobs.js'

import { connect } from 'http2'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

var connection = mysql.createConnection(config.mysql)
const app = express()
const port = 6162

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// listen port
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

//run everyday



// static
app.use(express.static(`${__dirname}/dist`))

// connect to database
connection.connect(err => {
  if (err) {
    console.log('fail to connect:', err)
    process.exit()
  }
})


// sign up
app.get('/signup', (req, res) => {
  // create table
  connection.query('CREATE TABLE IF NOT EXISTS user (id VARCHAR(30), name VARCHAR(30), password VARCHAR(30))')

  //change to string
  let UID = "'" + `${req.query.id}` + "'"
  let NAME = "'" + `${req.query.name}` + "'"
  let PWD = "'" + `${req.query.password}` + "'"
  if(mod.checkBlank(UID,NAME,PWD)==1){
    let add_user = true
    const search_id = `
      SELECT id FROM user
      WHERE id = ${UID}`
    const add = `INSERT INTO user (id, name, password) VALUES (${UID}, ${NAME}, ${PWD})`
    connection.query(search_id, (err, rows, fields) => {
      if (err)
        console.log('fail to search: ', err)
      console.log(rows)
      if (rows[0] === undefined) {
        var today = new Date()
        if (add_user){
          console.log(add_user)
          connection.query(add, (err, result) => {
            if (err) console.log('fail to insert: ', err)
          })
          const saved = `INSERT INTO project (id, project_name, color, start_year, start_month, start_day, end_year, end_month, end_day, target_number, member, distribute, notes, personal_or_joint, saved_money) VALUES(${UID}, 'normal_project', '#8E5FF4', ${today.getFullYear()}, ${today.getMonth()+1}, ${today.getDate()}, ${today.getFullYear()}, ${today.getMonth()+1}, ${today.getDate()}, '1000000', ${UID}, '均分', '', '0', '0')`
          connection.query(saved, (err) => {
            if (err) console.log('Failed to add personal saved project: ',err)
          })
          res.send(req.query.id)
        }
      }
      else{
        res.send("Signup faild.")
      }
    })
  }
  else{
    res.send("Signup faild.")
  }
  
  
})

//login
app.get('/login',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS user (id VARCHAR(30), name VARCHAR(30), password VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let PWD = "'"+`${req.query.password}`+"'"

  const search_user = `
    SELECT id FROM user
    WHERE id = ${UID} and password = ${PWD}`
  connection.query(search_user, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    //console.log(row)
    if (row[0]===undefined) {
      res.send("failed,try again")
    }
    else{
      res.send(mod.gettabledata(row,'id',0))
    }
  })
})

// update mainpage detail
app.get('/getmainpagedetail',(req,res) => {
  let UID = "'"+`${req.query.id}`+"'"
  let month= req.query.month
  let date= req.query.date
  let year= req.query.year
  var search_user=""
  search_user=`SELECT * FROM account WHERE id = ${UID} and month = ${month} and day = ${date} and year = ${year}`
  
  //console.log(search_user)
  connection.query(search_user, (err, row, fields) => {
    if(err)
      console.log('fail to search: ', err)
    if(row[0]===undefined){
      res.send("nothing")
    }
    else{
      res.send(row)
    }
  })
})


// get username
app.get('/username',(req,res) => {
  let UID = "'"+`${req.query.id}`+"'"

  const search_username = `
    SELECT name FROM user
    WHERE id = ${UID}`
  connection.query(search_username, (err, row, fields)   => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0]===undefined) {
      res.send("failed,try again")
    }
    else{
      res.send(mod.gettabledata(row,'name',0))
    }
  })
})


// add financial //--------------- I have not changed the table name ---------------
app.get('/financial',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS financial (id VARCHAR(30), type VARCHAR(30), item VARCHAR(30), year VARCHAR(30), month VARCHAR(30), day VARCHAR(30), money VARCHAR(30), repeats VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let TYPE = "'"+`${req.query.type}`+"'"
  let ITEM = "'"+`${req.query.item}`+"'"
  let DATE = "'"+`${req.query.date}`+"'"
  let MONEY = "'"+`${req.query.money}`+"'"
  let REPEAT = "'"+`${req.query.repeat}`+"'"

  let YEAR = "'" + `${DATE[7]}` + `${DATE[8]}` + `${DATE[9]}` + `${DATE[10]}` + "'"
  let MONTH = "'" + `${DATE[1]}` + `${DATE[2]}` + "'"
  let DAY = "'" + `${DATE[4]}` + `${DATE[5]}` + "'"
  
  if(mod.checkBlank('financial',TYPE, ITEM, YEAR, MONTH, DAY, MONEY, REPEAT)===1){
    const update = `INSERT INTO financial (id, type, item, year, month, day, money, repeats) VALUES (${UID}, ${TYPE}, ${ITEM}, ${YEAR}, ${MONTH}, ${DAY}, ${MONEY}, ${REPEAT})`
    connection.query(update, (err) => {
      if (err) console.log('fail to insert: ', err)
    })
    if (TYPE == 2){
      const fixed = `UPDATE project SET target_number = ${MONEY} WHERE id = ${UID} and project_name = 'normal_project'`
      connection.query(fixed, (err) =>{
        if(err) console.log("Can't set financial in project", err)
      })
    }
    res.send('0')
  }
  else{
    res.send(mod.checkBlank('financial',TYPE, ITEM, YEAR, MONTH, DAY, MONEY, REPEAT))
  }

})

// get financial table
app.get('/getFinancial',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS financial (id VARCHAR(30), type VARCHAR(30), item VARCHAR(30), year VARCHAR(30), month VARCHAR(30), day VARCHAR(30), money VARCHAR(30), repeats VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let TYPE = "'"+`${req.query.type}`+"'"

  const search_information = `
    SELECT * FROM financial
    WHERE id = ${UID} and type = ${TYPE}`
  connection.query(search_information, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0]===undefined) {
      res.send('nothing')
    }
    else{
      console.log(row)
      res.send(row)
    }
  })
})

// get detail in financial
app.get('/getFinancialDetail',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS financial (id VARCHAR(30), type VARCHAR(30), item VARCHAR(30), year VARCHAR(30), month VARCHAR(30), day VARCHAR(30), money VARCHAR(30), repeats VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let ITEM = "'"+`${req.query.name}`+"'"
  let TYPE = "'"+`${req.query.type}`+"'"

  const search_information = `
    SELECT * FROM financial
    WHERE id = ${UID} and item = ${ITEM} and type = ${TYPE}`
  connection.query(search_information, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0]===undefined) {
      res.send(false)
    }
    else{
      console.log('success')
      res.send(row)
    }
  })
})


// add account
app.get('/account',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS bank (id VARCHAR(30), name VARCHAR(30), currency VARCHAR(30), money VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let NAME = "'"+`${req.query.name}`+"'"
  let CURRENCY = "'"+`${req.query.currency}`+"'"
  let MONEY = "'"+`${req.query.money}`+"'"
  
  if(mod.checkBlank('account', NAME, CURRENCY, MONEY)===1){
    const add_account = `INSERT INTO bank (id, name, currency, money) VALUES (${UID}, ${NAME}, ${CURRENCY}, ${MONEY})`
    connection.query(add_account, (err) => {
      if (err) console.log('fail to insert: ', err)
    })
    res.send('0')
  }
  else{
    res.send(mod.checkBlank('account', NAME, CURRENCY, MONEY))
  }
  
})

///get account table
app.get('/getAccount',(req,res) =>{
  let UID = "'"+`${req.query.ID}`+"'"
  var search_user = ""
  search_user = `SELECT * FROM bank WHERE id = ${UID}`
  connection.query(search_user, (err, row, fields) => {
    if(err)
      console.log('fail to search: ', err)
    if(row[0]===undefined){
      res.send("nothing")
    }
    else{
      res.send(row)
    }
  })
})


// record

app.get('/record',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS account(id VARCHAR(30), year VARCHAR(4), month VARCHAR(2), day VARCHAR(2), cost VARCHAR(30), sort VARCHAR(30), items VARCHAR(30), account VARCHAR(30), type VARCHAR(1))')
  
  let id = "'"+`${req.query.id}`+"'"
  let temp_date = `${req.query.date}`
  let cost = "'" + `${req.query.cost}` + "'"
  let sort = "'"+`${req.query.sort}`+"'"
  var items = ""
  if(req.query.type!=='2'){
    items = "'" + `${req.query.items}` + "'"
  }
  else{
    items = "'儲蓄'"
  }
  console.log(items)
  let account = "'" + `${req.query.account}` + "'"
  let type = "'" + `${req.query.type}` + "'"
  
  let year = "'" + `${temp_date[6]}` + `${temp_date[7]}` + `${temp_date[8]}` + `${temp_date[9]}` + "'"
  let month = "'" + `${temp_date[0]}` + `${temp_date[1]}` + "'"
  let day = "'" + `${temp_date[3]}` + `${temp_date[4]}` + "'"

  if(mod.checkBlank('record',items,temp_date,cost,sort,account,type)===1){
    const add_record = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUES (${id}, ${year}, ${month}, ${day}, ${cost}, ${sort}, ${items}, ${account}, ${type})`
    connection.query(add_record, (err) => {
      if (err) console.log('fail to insert: ', err)
    })
    res.send('0')
  }
  else{
    res.send(mod.checkBlank('record',items,temp_date,cost,sort,account,type))
  }
})


//todaymoney
app.get('/todaymoney',(req,res) =>{
  //connection.query('CREATE TABLE IF NOT EXISTS record (id VARCHAR(30), item VARCHAR(30), cost VARCHAR(30), date VARCHAR(8), type VARCHAR(1))')
  //var output=['income', 'expenditure', 'fixedincome', 'fixedexpenditure', 'fixedsaving']

  let ID="'"+`${req.query.id}`+"'"
  let table=`${req.query.table}`
  let selection=`${req.query.selection}`
  let month=mod.datetransfer(req.query.month)
  let date=mod.datetransfer(req.query.date)
  let year=req.query.year
  let type="'"+`${req.query.type}`+"'"
  
  const search_user= `SELECT ${selection} FROM ${table} WHERE id = ${ID} and type= ${type} and month= ${month} and day = ${date} and year= ${year}`
  //console.log(search_user)
  connection.query(search_user,(err,row,fields) => {
    //console.log(row)
    if (err)
      console.log('failed, to search: ',err)
    if (row[0]===undefined){
      res.send(`failed, please setup`)
    }
    else {
      //console.log(row)
      res.send(row)
    }
  })
})


// monthlymoney
app.get('/monthlymoney',(req,res) =>{
  //connection.query('CREATE TABLE IF NOT EXISTS record (id VARCHAR(30), item VARCHAR(30), cost VARCHAR(30), date VARCHAR(8), type VARCHAR(1))')
  let search_user=''
  let ID="'"+`${req.query.ID}`+"'"
  let table=`${req.query.table}`
  let selection=`${req.query.selection}`
  let month=`${req.query.month}`
  let year=`${req.query.year}` 
  let type="'"+`${req.query.type}`+"'"
  
  search_user= `SELECT ${selection} FROM ${table} WHERE id = ${ID} and type= ${type} and month= ${month} and year = ${year}`
  //console.log(search_user)
  connection.query(search_user,(err,row,fields) => {
    //console.log(row)
    if (err)
      console.log('failed, to search: ',err)
    if (row[0]===undefined){
      res.send(`failed, please setup`)
    }
    else {
      //console.log(row)
      res.send(row)
    }
  })
})


// get detail in project
app.get('/getProjectDetail',(req,res) => {
  let UID = "'"+`${req.query.id}`+"'"
  let project_name = "'"+`${req.query.name}`+"'"

  const search_project = `
    SELECT * FROM project
    WHERE member = ${UID} and project_name = ${project_name}`  
  connection.query(search_project, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0] === undefined) {
      res.send(false)
    }
    else{
      let detail = [mod.gettabledata(row,'project_name',0), mod.gettabledata(row,'color',0), mod.gettabledata(row,'start_year',0),
        mod.gettabledata(row,'start_month',0), mod.gettabledata(row,'start_day',0), mod.gettabledata(row,'end_year',0), mod.gettabledata(row,'end_month',0),
        mod.gettabledata(row,'end_day',0), mod.gettabledata(row,'target_number',0), mod.gettabledata(row,'saved_money',0)]
      res.send(detail)
    }
  })
})

// add personal/joint project
app.get('/project',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS project (id VARCHAR(30), project_name VARCHAR(30), color VARCHAR(30),\
   start_year VARCHAR(30), start_month VARCHAR(30), start_day VARCHAR(30), end_year VARCHAR(30), end_month VARCHAR(30),\
   end_day VARCHAR(30), target_number VARCHAR(30), member VARCHAR(30), distribute VARCHAR(30), notes VARCHAR(30), personal_or_joint VARCHAR(30), saved_money VARCHAR(30))')

  let PID = "'"+`${req.query.id}`+"'"
  let project_name = "'"+`${req.query.project_name}`+"'"
  let color = "'"+`${req.query.color}`+"'"
  let start_date = `${req.query.start_date}`
  let end_date = `${req.query.end_date}`
  let target_number = "'"+`${req.query.target_number}`+"'"
  let member = req.query.member
  let distribute = "'"+`${req.query.distribute}`+"'"
  let notes = "'"+`${req.query.note}`+"'"
  let personal_or_joint = "'"+`${req.query.personal_or_joint}`+"'"//true for multimember, false for single member
  let saved_money="'"+0+"'"

  let start_year = "'" + `${start_date[6]}` + `${start_date[7]}` + `${start_date[8]}` + `${start_date[9]}` + "'"
  let start_month = "'" + `${start_date[0]}` + `${start_date[1]}` + "'"
  let start_day = "'" + `${start_date[3]}` + `${start_date[4]}` + "'"
  let end_year = "'" + `${end_date[6]}` + `${end_date[7]}` + `${end_date[8]}` + `${end_date[9]}` + "'"
  let end_month = "'" + `${end_date[0]}` + `${end_date[1]}` + "'"
  let end_day = "'" + `${end_date[3]}` + `${end_date[4]}` + "'"

  let update_setting_project = false
  const search_project = `
    SELECT project_name FROM project
    WHERE id = ${PID} and project_name = ${project_name}`
  if(mod.checkBlank('project',project_name,start_date,end_date,target_number,distribute) === 1){
    connection.query(search_project, (err, rows, fields) => {
      if (err)
        console.log('fail to search: ', err)
      console.log(rows)
      if (rows[1] === undefined) {
        update_setting_project = true
      }
      else{
        res.send("The "+ `${req.query.project_name}` +" have already set.")
      }
    })
    setTimeout(() => {
      if (update_setting_project){
        console.log(update_setting_project)
        for(let i=0;i<member.length;i++){
          var member_string = "'" + `${req.query.member[i]}` + "'"
          let update_project = `INSERT INTO project (id, project_name, color, start_year, start_month, start_day, end_year, end_month, end_day, target_number, member, distribute, notes, personal_or_joint, saved_money)
          VALUES (${PID}, ${project_name}, ${color}, ${start_year}, ${start_month}, ${start_day}, ${end_year}, ${end_month}, ${end_day}, ${target_number}, ${member_string}, ${distribute}, ${notes}, ${personal_or_joint}, ${saved_money})`
          connection.query(update_project, (err, result) => {
            if (err) console.log('fail to insert: ', err)
          })
        }
        res.send('0')
      }
    }, 100)
  }
  else{
    res.send(mod.checkBlank('project',project_name,start_date,end_date,target_number,distribute))
  }
  
})


// //傳port值給前端
// app.get('/getPort',(req,res) =>{
//   let port_ = "'"+`${req.query.port}`+"'"
//     if(err)
//       console.log('fail to search: ', err)
//     if(row[0]===undefined){
//       res.send("nothing")
//     }
//     else{
//       res.send(port_)
//     }
//   })


///get project table
app.get('/getProject',(req,res) =>{
  let UID = "'"+`${req.query.ID}`+"'"
  const search_user = `SELECT * FROM project WHERE member = ${UID}`
  connection.query(search_user, (err, row, fields) => {
    if(err)
      console.log('fail to search: ', err)
    if(row[0]===undefined){
      res.send("nothing")
    }
    else{
      res.send(row)
    }
  })
})

app.get('/projectcomplete', (req,res) => {
  var ID = "'"+`${req.query.ID}`+"'"
  var project_number = "'"+`${req.query.project_name}`+"'"
  var color = "'"+`${req.query.color}`+"'"
  var target_number = "'"+`${req.query.target_number}`+"'"
  var member = "'"+`${req.query.member}`+"'"
  const complete = `UPDATE project SET personal_or_joint = '-1' WHERE id = ${ID} and project_name = ${project_number} and color = ${color} and target_number = ${target_number} and member = ${member}` 
  console.log(complete)
  connection.query(complete, (err) => {
    if(err) console.log('failed to complete project',err)
    res.send('finish')
  })
})

app.get('/getaprojectmoney', (req,res) => {
  var result = 0
  var id = "'"+req.query.id+"'"
  var project_name= "'"+req.query.project_name+"'"
  var color = "'" + req.query.color + "'"
  var target_number = "'" + req.query.target_number + "'"
  var ID = ''
  const choseProject = `SELECT * FROM project WHERE member = ${id} and project_name = ${project_name} and color = ${color} and target_number = ${target_number}`
  
  connection.query(choseProject,(err,rows)=>{
    if(err)console.log('failed to get a project total saved money',err)
    ID = "'"+mod.gettabledata(rows, 'id', 0)+"'"
    const summation = `SELECT * FROM project WHERE id = ${ID} and project_name = ${project_name} and color = ${color} and target_number = ${target_number}`
    
    connection.query(summation,(err,rows)=>{
    if(err)console.log('failed to get a project total saved money',err)
    for(var i in rows){
      result += mod.StringtoInt(mod.gettabledata(rows, 'saved_money', i))
    }
    res.send(`${result}`)
    
  })
  })

  
  
})

app.get('/getnormalproject',(req,res) => {
  var id = "'"+req.query.id+"'"
  const normal = `SELECT * FROM project WHERE id = ${id} and project_name = 'normal_project'`
  connection.query(normal, (err,rows) =>{
    if (err) console.log('failed to get normal project', err)
    ///console.log(rows)
    if(rows[0]===undefined){
      res.send("nothing")
    }
    var result = mod.gettabledata(rows, 'saved_money', 0)
    res.send(result)
  })
})
//get project creater
app.get('/getCreater',(req,res) =>{
  let member = "'"+`${req.query.ID}`+"'"
  let project_name = "'"+`${req.query.project_name}`+"'"
  const search_creater = `SELECT * FROM project WHERE member = ${member} and project_name = ${project_name}`
  connection.query(search_creater, (err, row, fields) => {
    if(err)
      console.log('fail to search: ', err)
    if(row[0]===undefined){
      res.send("nothing")
    }
    else{
      res.send(row)
    }
  })
})
//get project members
app.get('/getMember',(req,res) =>{
  let member = "'"+`${req.query.ID}`+"'"
  let project_name = "'"+`${req.query.project_name}`+"'"
  const search_member = `SELECT * FROM project WHERE id = ${member} and project_name = ${project_name}`
  connection.query(search_member, (err, row, fields) => {
    if(err)
      console.log('fail to search: ', err)
    if(row[0]===undefined){
      res.send("nothing")
    }
    else{
      res.send(row)
    }
  })
})

//upload personal picture
import multer  from 'multer'
import path  from 'path'
import fs from 'fs'


const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "./dist/image/personal_pic");
    
  },
  filename: (req, file, cb) =>{
    //console.log(file)
    //console.log(path.extname(file.originalname))
    cb(null, `1` + `${path.extname(file.originalname)}`);
  }
  
})

const upload = multer({storage: storage})

app.get('/upload', (req, res) =>{
  res.render("upload");
});

app.post('/upload', upload.single("image"), (req, res) =>{
  // console.log(req.body.usr_name)
  // console.log(path.extname(req.file.originalname))
  // console.log(123)
  fs.rename(`./dist/image/personal_pic/1${path.extname(req.file.originalname)}`, `./dist/image/personal_pic/${req.body.usr_name}${path.extname(req.file.originalname)}`, (err) => {
    if (err) throw err;
    console.log('Rename complete!');
  });
  res.send("Image uploaded");
})

/////////////////please add your code above, below are the codes that server need to do every day//////////////////////////////////
//update monthly financial
app.get('/sergetfinancial', (req,res) =>{
  console.log("sergetfinancial")
  var today = new Date()
  var search_all = 'SELECT * FROM project'
  connect.query(search_all , (err, row, fields) =>{
    if (err)
      console.log('server went wrong')
    for(var i in row){
      
      if (today.getDate() == mod.gettabledata(row, 'day',i) && today.getMonth() == mod.gettabledata(row, 'month', i) && (today.getFullYear() == mod.gettabledata(row, year, i) || today.getMonth() ==0)){
        let UID = "'"+`${mod.gettabledata(row, 'id', i)}`+"'"
        let TYPE = "'"+`${mod.gettabledata(row, 'type', i)}`+"'"
        let ITEM = "'"+`${mod.gettabledata(row, 'item', i)}`+"'"
        let YEAR = "'"+`${today.getFullYear()}`+"'"
        let MONTH = "'"+`${mod.StringtoInt(today.getMonth())+1}`+"'"
        let DAY = "'"+`${today.getDate()}`+"'"
        let MONEY = "'"+`${mod.gettabledata(row, 'money', i)}`+"'"
        let REPEAT = "'"+`${mod.gettabledata(row, 'repeat', i)}`+"'"
        const update_type = ['income', 'outcome', 'saving']
        if (mod.checkBlank('financial',TYPE, ITEM, YEAR, MONTH, DAY, MONEY, REPEAT)){
          const update = `INSERT INTO financial (id, type, item, year, month, day, money, repeats) VALUES (${UID}, ${TYPE}, ${ITEM}, ${YEAR}, ${MONTH}, ${DAY}, ${MONEY}, ${REPEAT})`
          connection.query(update, (err, rows, fields) => {
            if (err)
              console.log('server went wrong ', err)
            console.log(rows)
            if (rows[0] === undefined) {
              console.log(`${UID}'s ${ITEM} is updated`)
            }
            else{
              res.send("The "+ update_type[`${req.query.type}`] +" have already set.")
            }
          })
        }
      }
    }
  })
})
/////////above is updated at 00:00,below is updated at 23:59////////////////////////////////////
//get all users' id in database
app.get('/getAllUser', (req,res) => {
  //search all user
  var all_user=[]
  const search_code = 'SELECT id FROM user'
  connection.query(search_code, (err, rows, fields) => {
    if(err)
      console.log('server went wrong ', err)
    for(let i in rows){
      all_user.push(mod.gettabledata(rows, 'id', i))
    }
    //console.log(all_user)
    res.send(all_user)
  })
  
})

//get specific user's projects
app.get('/sergetProject',(req,res) => {
  console.log("setgetproject")
  var result = []
  var user = req.query.user
  
  const getAllproject= `SELECT * FROM project WHERE member = '${user}'`
  connection.query(getAllproject, (err, rows, fields) => {
    if (err) console.log('server went wrong', err)
    for(let i in rows){
      let lastday = new Date(`${mod.gettabledata(rows, `end_month`, i)}/${mod.gettabledata(rows, `end_day`, i)}/${mod.gettabledata(rows, `end_year`, i)}`)
      let startday = new Date()
      //console.log(lastday, startday)
      var remainday= (lastday-startday)

      //reamin money
      if(mod.StringtoInt(mod.gettabledata(rows,'personal_or_joint',i)) <= 0){
        continue
      }
      else{
        let remain_money = mod.StringtoInt(mod.gettabledata(rows, 'target_number', i))/mod.StringtoInt(mod.gettabledata(rows,'personal_or_joint',i))-mod.StringtoInt(mod.gettabledata(rows, 'saved_money', i))
        if(remainday>0){
          remainday= Math.ceil(remainday/(1000*3600*24))+1
        }
        else{
          remainday = -1
        }
        var buffer = new Object
        buffer["id"] = mod.gettabledata(rows, 'id', i)
        buffer["project_name"] = mod.gettabledata(rows, 'project_name', i)
        buffer["member"] = mod.gettabledata(rows, 'member', i)
        buffer["personal_or_joint"] = mod.gettabledata(rows, 'personal_or_joint', i)
        buffer["saved_money"] = Math.floor(mod.StringtoInt(mod.gettabledata(rows, 'saved_money', i)))
        buffer["remain_money"] = Math.round(remain_money/remainday)
        buffer["remainday"] = remainday
        //console.log(buffer)
        result.push(buffer)
      }
      
    }
    res.send(result)
  })
  
})
//save money in project
app.get('/saveMoneytoProject',(req,res) =>{
  console.log("saveMoneytoProject")
  let id="'"+`${req.query.id}`+"'"
  let member="'"+`${req.query.member}`+"'"
  let personal_or_joint = "'"+`${req.query.personal_or_joint}`+"'"
  let project_name = "'"+`${req.query.project_name}`+"'"
  let saved_money = "'"+`${Math.round(req.query.saving_money,0)}`+"'"
  let saveded_money = "'"+`${mod.StringtoInt(req.query.saving_money)-mod.StringtoInt(req.query.saved_money)}`+"'"
  let date = "'"+`${req.query.date}`+"'"
  let month = "'"+`${req.query.month}`+"'"
  let year = "'"+`${req.query.year}`+"'"

  const accounting = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUE (${member}, ${year}, ${month}, ${date}, ${saveded_money}, 'project_saving', ${project_name}, '現金', '3')`
  connection.query(accounting, (err,rows,fields)=>{
  
    if(err)console.log("There are some problem: ",err)
  })
  
  const update=`UPDATE project SET saved_money=${saved_money} 
  WHERE id=${id} and member = ${member} and personal_or_joint =${personal_or_joint} and project_name = ${project_name}`
  //console.log(update)
  connection.query(update, (err, rows, fields)=>{
    if(err)console.log("There must be some same data",err)
    res.send(update)
  })
})

app.get('/useMoneyinProject',(req,res) =>{
  let id="'"+`${req.query.id}`+"'"
  let member="'"+`${req.query.member}`+"'"
  let personal_or_joint = "'"+`${req.query.personal_or_joint}`+"'"
  let project_name = "'"+`${req.query.project_name}`+"'"
  let saved_money = "'"+`${req.query.using_money}`+"'"//for account
  let saveded_money = "'"+`${mod.StringtoInt(req.query.using_money)+mod.StringtoInt(req.query.saved_money)}`+"'"//for update
  let date = "'"+`${req.query.date}`+"'"
  let month = "'"+`${req.query.month}`+"'"
  let year = "'"+`${req.query.year}`+"'"

  const accounting = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUE (${member}, ${year}, ${month}, ${date}, ${saved_money}, 'project_withdraw', ${project_name}, 現金, '1')`
  connection.query(accounting, (err,rows,fields)=>{
  
    if(err)console.log("There are some problem: ",err)
  })

  const update=`UPDATE project SET saved_money=${saveded_money} 
  WHERE id=${id} and member = ${member} and personal_or_joint =${personal_or_joint} and project_name = ${project_name}`
  connection.query(update, (err, rows, fields)=>{
    if(err)console.log("There must be some same data",err)
    if(rows[0]==undefined){
      res.send('none')
    }
    res.send(update)
  })
})

app.get('/setfinancialincome',(req, res) =>{
  console.log("setfinancialincome")
  var today = new Date()
  let UID = "'"+ `${req.query.id}` +"'"
  var check = true
  const setfinancial = `SELECT * FROM financial WHERE id =${UID}` 
  //console.log(setfinancial)
  connection.query(setfinancial, (err, rows, fields)=>{
    if(err)console.log("There are something wrong: ",err)
    if(rows[0]==undefined){
      res.send('none')
    }
    else {
      for(let i in rows){
        let UID = mod.gettabledata(rows,'id', i)
        let type = mod.gettabledata(rows,'type', i)
        let item = mod.gettabledata(rows, 'item', i)
        let date = mod.gettabledata(rows, 'day', i)
        let money = mod.gettabledata(rows, 'money', i)
        let repeats = mod.gettabledata(rows, 'repeats', i)
        if (repeats == '每月' && date == `${mod.datetransfer(today.getDate())}`&& type == '0'){
          const addFinancial = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUE (${UID}, ${today.getFullYear()}, ${mod.datetransfer(today.getMonth()+1)}, ${mod.datetransfer(today.getDate())}, ${money}, 'financial', ${item}, '現金', '1')`
          connection.query(addFinancial,(err, rows, fields)=>{
            if(err)console.log("There are something wrong: ",err)
            
          })
        }
      }
      res.send('finish')
      
    }
    
    
  })
  
})

app.get('/setfinancialexpenditure',(req, res) =>{
  console.log("setfinancialexpenditure")
  var today = new Date()
  let UID = "'"+ req.query.id +"'"
  const setfinancial = `SELECT * FROM financial WHERE id =${UID}` 
  connection.query(setfinancial, (err, rows, fields)=>{
    if(err)console.log("There are something wrong: ",err)
    console.log('Hi',rows)
    if(rows[0]==undefined){
      res.send('none')
    }
    else {
      for(let i in rows){
        let UID = mod.gettabledata(rows,'id', i)
        let type = mod.gettabledata(rows,'type', i)
        let item = mod.gettabledata(rows, 'item', i)
        let year = mod.gettabledata(rows, 'year', i)
        let month = mod.gettabledata(rows, 'month', i)
        let date = mod.gettabledata(rows, 'day', i)
        let money = mod.gettabledata(rows, 'money', i)
        let repeats = mod.gettabledata(rows, 'repeats', i)
        if (repeats == '每月' && date == `${mod.datetransfer(today.getDate())}`&& type == '1'){
          const addFinancial = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUE (${UID}, ${today.getFullYear()}, ${mod.datetransfer(today.getMonth()+1)}, ${mod.datetransfer(today.getDate())}, ${money}, 'financial', ${item}, '現金', 0)`
          connection.query(addFinancial,(err, rows, fields)=>{
            if(err)console.log("There are something wrong: ",err)
          })
        }
        if (repeats == '每月' && date == `${mod.datetransfer(today.getDate())}`&& type == '2'){
          const addFinancial = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUE (${UID}, ${today.getFullYear()}, ${mod.datetransfer(today.getMonth()+1)}, ${mod.datetransfer(today.getDate())}, ${money}, 'financial', ${item}, '現金', 0)`
          connection.query(addFinancial,(err, rows, fields)=>{
            if(err)console.log("There are something wrong: ",err)
          })
        }
      }
      res.send('finish')
    }
    
  })
  
})
//connection.end()