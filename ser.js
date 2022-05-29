#!/usr/bin/env node

import express from 'express'
//import fs, { rmSync } from 'fs'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import config from './config.js'
import mysql from 'mysql'
import mod from './parcel/module.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

var connection = mysql.createConnection(config.mysql)
const app = express()
const port = 6163

// listen port
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

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
   
  let add_user = false
  const search_id = `
    SELECT id FROM user
    WHERE id = ${UID}`
  const add = `INSERT INTO user (id, name, password) VALUES (${UID}, ${NAME}, ${PWD})`
  connection.query(search_id, (err, rows, fields) => {
    if (err)
      console.log('fail to search: ', err)
    console.log(rows)
    if (rows[0] === undefined) {
      add_user = true
    }
    else{
      res.send("Signup faild.")
    }
  })
  
  setTimeout(() => {
    if (add_user){
      console.log(add_user)
      connection.query(add, (err, result) => {
        if (err) console.log('fail to insert: ', err)
      })
      res.send("signup")
    }
  }, 100)
  
  
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
  let month= `${req.query.month}`
  let date= "'"+`${req.query.date}`+"'"
  let year= "'"+`${req.query.year}`+"'"
  var search_user=""
  if (mod.StringtoInt(month)<10){
    month=`'0${month}'`
    search_user=`SELECT * FROM Account WHERE id = ${UID} and month = ${month} and day = ${date} and year = ${year}`
  }
  else{
    search_user=`SELECT * FROM Account WHERE id = ${UID} and month = ${month} and day = ${date} and year = ${year}`
  }
  
  console.log(search_user)
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


// update financial
app.get('/financial',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS financial (id VARCHAR(30), type VARCHAR(30), item VARCHAR(30), year VARCHAR(30), month VARCHAR(30), day VARCHAR(30), money VARCHAR(30), repeats VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let TYPE = "'"+`${req.query.type}`+"'"
  let ITEM = "'"+`${req.query.item}`+"'"
  let YEAR = "'"+`${req.query.year}`+"'"
  let MONTH = "'"+`${req.query.month}`+"'"
  let DAY = "'"+`${req.query.day}`+"'"
  let MONEY = "'"+`${req.query.money}`+"'"
  let REPEAT = "'"+`${req.query.repeat}`+"'"

  let update_setting = false
  const update_type = ['income', 'outcome', 'saving']
  const search_item = `
    SELECT id FROM financial
    WHERE id = ${UID} and item =${ITEM}`
  const update = `INSERT INTO financial (id, type, item, year, month, day, money, repeats) VALUES (${UID}, ${TYPE}, ${ITEM}, ${YEAR}, ${MONTH}, ${DAY}, ${MONEY}, ${REPEAT})`
  connection.query(search_item, (err, rows, fields) => {
    if (err)
      console.log('fail to search: ', err)
    console.log(rows)
    if (rows[0] === undefined) {
      update_setting = true
    }
    else{
      res.send("The "+ update_type[`${req.query.type}`] +" have already set.")
    }
  })
  setTimeout(() => {
    if (update_setting){
      console.log(update_setting)
      connection.query(update, (err, result) => {
        if (err) console.log('fail to insert: ', err)
      })
      res.send("You have updated your "+ update_type[`${req.query.type}`] +".")
    }
  }, 100)
})


// get information (in financial)
app.get('/information',(req,res) => {
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
      let result = ['', '', '', '', '', '']
      res.send(result)
    }
    else{
      console.log(row)
      let result = [mod.gettabledata(row,'item',0), mod.gettabledata(row,'year',0), mod.gettabledata(row,'month',0), mod.gettabledata(row,'day',0), mod.gettabledata(row,'money',0), mod.gettabledata(row,'repeats',0)]
      console.log(result)
      res.send(result)
    }
  })
})


// record
app.get('/record',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS Account(id VARCHAR(30), items VARCHAR(30), cost VARCHAR(30), day VARCHAR(2), month VARCHAR(2), year VARCHAR(4), type VARCHAR(1))')
  
  let id = "'"+`${req.query.id}`+"'"
  let items = "'" + `${req.query.items}` + "'"
  let cost = "'" + `${req.query.cost}` + "'"
  let temp_date = `${req.query.date}`
  let type = "'" + `${req.query.type}` + "'"
  
  let year = "'" + `${temp_date[6]}` + `${temp_date[7]}` + `${temp_date[8]}` + `${temp_date[9]}` + "'"
  let day = "'" + `${temp_date[3]}` + `${temp_date[4]}` + "'"
  let month = "'" + `${temp_date[0]}` + `${temp_date[1]}` + "'"
  
  const add_record = `INSERT INTO Account (id, items, cost, day, month, year, type) VALUES (${id}, ${items}, ${cost}, ${day}, ${month}, ${year}, ${type})`
  
  connection.query(add_record, (err) => {
    if (err) console.log('fail to insert: ', err)
  })
  
})


//todaymoney
app.get('/todaymoney',(req,res) =>{
  //connection.query('CREATE TABLE IF NOT EXISTS record (id VARCHAR(30), item VARCHAR(30), cost VARCHAR(30), date VARCHAR(8), type VARCHAR(1))')
  //var output=['income', 'expenditure', 'fixedincome', 'fixedexpenditure', 'fixedsaving']
  let search_user=''
  let ID="'"+`${req.query.ID}`+"'"
  let table=`${req.query.table}`
  let selection=`${req.query.selection}`
  let month=mod.datetransfer(req.query.month)
  let date=mod.datetransfer(req.query.date)
  let type="'"+`${req.query.type}`+"'"
  
  search_user= `SELECT ${selection} FROM ${table} WHERE id = ${ID} and type= ${type} and month= ${month} and day = ${date}`
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
  //var output=['income', 'expenditure', 'fixedincome', 'fixedexpenditure', 'fixedsaving']
  let search_user=''
  let ID="'"+`${req.query.ID}`+"'"
  let table=`${req.query.table}`
  let selection=`${req.query.selection}`
  let month=mod.datetransfer(req.query.month)
  let type="'"+`${req.query.type}`+"'"
  
  search_user= `SELECT ${selection} FROM ${table} WHERE id = ${ID} and type= ${type} and month= ${month}`
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
// 要加顏色還有備註（未改）
app.get('/project_or_not',(req,res) => {
  let UID = "'"+`${req.query.id}`+"'"

  const search_username = `
    SELECT * FROM person_project
    WHERE id = ${UID}`
  connection.query(search_username, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0] === undefined) {
      res.send(false)
    }
    else{
      //console.log(row)
      let detail = [mod.gettabledata(row,'project_name',0), mod.gettabledata(row,'start_year',0), mod.gettabledata(row,'start_month',0), mod.gettabledata(row,'start_day',0), mod.gettabledata(row,'end_year',0), mod.gettabledata(row,'end_month',0), mod.gettabledata(row,'end_day',0), mod.gettabledata(row,'target_number',0)]
      //console.log(detail)
      res.send(detail)
    }
  })
})

// add personal/joint project
app.get('/project',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS project (id VARCHAR(30), project_name VARCHAR(30), color VARCHAR(30),\
   start_year VARCHAR(30), start_month VARCHAR(30), start_day VARCHAR(30), end_year VARCHAR(30), end_month VARCHAR(30),\
   end_day VARCHAR(30), target_number VARCHAR(30), member VARCHAR(30), distribute VARCHAR(30), notes VARCHAR(30), personal_or_joint VARCHAR(30))')

  let PID = "'"+`${req.query.id}`+"'"
  let project_name = "'"+`${req.query.project_name}`+"'"
  let color = "'"+`${req.query.color}`+"'"
  let start_date = `${req.query.start_date}`
  let end_date = `${req.query.end_date}`
  let target_number = "'"+`${req.query.target_number}`+"'"
  let member = req.query.member
  let distribute = "'"+`${req.query.distribute}`+"'"
  let notes = "'"+`${req.query.note}`+"'"
  let personal_or_joint = "'"+`${req.query.personal_or_joint}`+"'"

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
        let update_project = `INSERT INTO project (id, project_name, color, start_year, start_month, start_day, end_year, end_month, end_day, target_number, member, distribute, notes, personal_or_joint)
        VALUES (${PID}, ${project_name}, ${color}, ${start_year}, ${start_month}, ${start_day}, ${end_year}, ${end_month}, ${end_day}, ${target_number}, ${member_string}, ${distribute}, ${notes}, ${personal_or_joint})`
        connection.query(update_project, (err, result) => {
          if (err) console.log('fail to insert: ', err)
        })
      }
      res.send("You have updated your "+ `${req.query.project_name}` +".")
    }
  }, 100)
})



// get mainpage detail
app.get('/getmainpagedetail',(req,res) => {
  let UID = "'"+`${req.query.id}`+"'"
  let month= `${req.query.month}`
  let date= "'"+`${req.query.date}`+"'"
  let year= "'"+`${req.query.year}`+"'"
  var search_user=""
  if (mod.StringtoInt(month)<10){
    month=`'0${month}'`
    search_user=`SELECT * FROM Account WHERE id = ${UID} and month = ${month} and day = ${date} and year = ${year}`
  }
  else{
    search_user=`SELECT * FROM Account WHERE id = ${UID} and month = ${month} and day = ${date} and year = ${year}`
  }
  
  console.log(search_user)
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

///get project goal 
app.get('/getProjectMoney',(req,res) =>{
  let UID="'"+`${req.query.ID}`+"'"
  var search_user=""
  search_user=`SELECT * FROM person_project WHERE id = ${UID}`
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

//connection.end()