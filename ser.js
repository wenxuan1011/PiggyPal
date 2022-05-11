#!/usr/bin/env node

import express from 'express'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import config from './config.js'
import mysql from 'mysql'
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
  let ID = '"'+ `${req.query.id}` + '"'
  let NAME = '"' + `${req.query.name}` + '"'
  let PWD = '"' + `${req.query.password}` + '"'
   
  let add_user = false
  const search_id = `
    SELECT id FROM user
    WHERE id = ${ID}`
  const add = `INSERT INTO user (id, name, password) VALUES (${ID}, ${NAME}, ${PWD})`
  connection.query(search_id, (err, rows, fields) => {
    if (err)
      console.log('fail to search: ', err)
    console.log(rows)
    if (rows[0] === undefined) {
      add_user = true
    }
    else{
      res.send("BAD.")
    }
  })
  
  setTimeout(() => {
    if (add_user){
      console.log(add_user)
      connection.query(add, (err, result) => {
        if (err) console.log('fail to insert: ', err)
      })
      res.send("Sign Up Sucessful.")
    }
  }, 100)
  
  
})

//login
app.get('/login',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS user (id VARCHAR(30), name VARCHAR(30), password VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let PWD = "'"+`${req.query.password}`+"'"

  const search_user = `
    SELECT id and password FROM user
    WHERE id = ${UID} and password = ${PWD}`
  connection.query(search_user, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    //console.log(row)
    if (row[0]===undefined) {
      res.send("failed,try again")
    }
    else{
      res.send(`${UID}`)
      IDD = `${UID}`
      console.log('success')
    }
  })
})

//record
app.get('/record',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS Account(id VARCHAR(30), items VARCHAR(30), cost VARCHAR(30), day VARCHAR(2), month VARCHAR(2), year VARCHAR(4), type VARCHAR(1))')
  
  let id = `${req.query.id}`
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



//connection.end()