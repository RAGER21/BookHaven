const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

import { createClient } from '@supabase/supabase-js'


dotenv.config({path: './.env'});
const publicDirectory = path.join(__dirname, './public');


app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.set('view engine', 'hbs');
app.use(cookie());


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PROJECT_KEY
const supabaseKey = process.env.SUPABASE_CLIENT_KEY
const supabase = createClient(supabaseUrl, supabaseKey)





app.listen(process.env.PORT || 3306, () => {
  console.log("Connected at port 3306")
});