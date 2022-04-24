#!/usr/bin/env node

import express from 'express'
import fs from 'fs'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import config from './config.js'
import mysql from 'mysql'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

var connection = mysql.createConnection(config.mysql)
const app = express()
const port = 6161

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
  var ID = '" '+ `${req.query.id}` + '"'
  var NAME = '"' + `${req.query.name}` + '"'
  var PWD = '"' + `${req.query.password}` + '"'
   
  var add_user = false
  const search_id = `
    SELECT id FROM user
    WHERE user.id LIKE ${ID}`
  const add = `INSERT INTO user (id, name, password) VALUES (${ID}, ${NAME}, ${PWD})`
  connection.query(search_id, (err, rows, fields) => {
    if (err)
      console.log('fail to search: ', err)
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
      console.log(add_user)
      res.send("Sign Up Sucessful.")
    }
  }, 100)
  
  
})

//connection.end()

//