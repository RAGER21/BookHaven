import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import pages from './routes/pages.mjs';
import auth from './routes/auth.mjs';

import { createClient } from '@supabase/supabase-js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({path: './.env'});
const publicDirectory = path.join(__dirname, './public');



app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use('/', pages)
app.use('/auth', auth)
app.set('view engine', 'hbs');



const supabaseUrl = process.env.SUPABASE_PROJECT_KEY
const supabaseKey = process.env.SUPABASE_CLIENT_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

    




app.listen(process.env.PORT || 3306, () => {
  console.log("Connected at port 3306")
});

export {supabase}