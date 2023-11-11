const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const supabase = require('@supabase/supabase-js')

dotenv.config({path: './.env'});
const publicDirectory = path.join(__dirname, './public');


app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.set('view engine', 'hbs');






app.listen(process.env.PORT || 3306, () => {
  console.log("Connected at port 3306")
});