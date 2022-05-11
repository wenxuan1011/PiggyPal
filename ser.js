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
<<<<<<< HEAD
const port = 6165
=======
const port = 6162
>>>>>>> b1b3c7969cad3e3adbd776346bc53f72eb3fceee

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

<<<<<<< HEAD
=======
app.get('/record',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS Account(id VARCHAR(30), items VARCHAR(30), cost VARCHAR(30), day VARCHAR(2), month VARCHAR(2), year VARCHAR(4), type VARCHAR(1))')
  
  let id = "'"+`${req.query.id}`+"'"
  let items = "'" + `${req.query.items}` + "'"
  let cost = "'" + `${req.query.cost}` + "'"
  let temp_date = `${req.query.date}`
  let type = "'" + `${req.query.type}` + "'"
  
  let year = "'" + `${temp_date[6]}` + `${temp_date[7]}` + `${temp_date[8]}` + `${temp_date[9]}` + "'"
  let month = "'" + `${temp_date[3]}` + `${temp_date[4]}` + "'"
  let day = "'" + `${temp_date[0]}` + `${temp_date[1]}` + "'"
  
  const add_record = `INSERT INTO Account (id, items, cost, day, month, year, type) VALUES (${id}, ${items}, ${cost}, ${day}, ${month}, ${year}, ${type})`
  
  connection.query(add_record, (err) => {
    if (err) console.log('fail to insert: ', err)
  })
  
})

app.get('/monthlymoney',(req,res) =>{
  //connection.query('CREATE TABLE IF NOT EXISTS record (id VARCHAR(30), item VARCHAR(30), cost VARCHAR(30), date VARCHAR(8), type VARCHAR(1))')
  var output=[income, expenditure, fixedincome, fixedexpenditure, fixedsaving]

  let ID="'"+`${req.query.ID}`+"'"
  let type="'"+`${req.query.type}`+"'"

  const search_user= `SELECT cost FROM table WHERE id = ${ID} and type= ${type}`
  connection.query(search_user,(err,row,fields) => {
    if (err)
      console.log('failed, to search: ',err)
    if (row[0]===undefined){
      res.send(`failed, please setup monthly ${output[mod.StringtoInt(req.query.type, 10)-2]}`)
    }
    else {
      res.send(row)
    }
  })
})


>>>>>>> b1b3c7969cad3e3adbd776346bc53f72eb3fceee

//connection.end()