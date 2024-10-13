// const express = require('express');
// const mongoose = require('mongoose');
import express from 'express'
import mongoose from 'mongoose';
import router from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import {requireAuth, checkUser} from './middleware/authMiddleware.js';
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(router)
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

app.get('*', checkUser)

const username = 'username'
const password = 'password'
const host = 'mongo'
const port = 27017
const database = 'node-auth'
const app_host = '0.0.0.0'
const app_port = 3000

// database connection
const dbURI = 
  `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true,
  ssl: false 
 })
 .then(() => {
  console.log('Connected to the DATABASE!')
  
  app.listen((app_host, app_port), () => 
    console.log(`server running on http://${app_host}:${app_port}`)
  )
  })
  .catch((err) => {
    console.log('Connection failed\n', err)
  });

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
