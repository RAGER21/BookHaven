const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

dotenv.config({path: './.env'});
const publicDirectory = path.join(__dirname, './public');


app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.set('view engine', 'hbs');
app.use(cookie());

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

db.connect( (error) =>{
  if(error){
    console.log(error)
  }else{
    console.log("Mysql Connected....")
  }
})

var sessionStore = new MySQLStore({
  expiration: 10800000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessiontbl',
    columnNames: {
    session_id: 'session_id',
    expires: 'expires',
    data: 'data'
    }
  }
}, sessionStore)

app.use( session({
  key: 'keyin',
  secret: 'my secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
  }))



app.listen(3000, () => {
  console.log("Connected at port 3000")
});
