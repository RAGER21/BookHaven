
import bcrypt from 'bcryptjs'
import {supabase} from '../server.mjs'

export const register = async (req, res) =>{
    const{ fname, lname, email, password, passwordConfirm} = req.body;
 try{

    if(checkEmail(email) == true){
        return res.render('register', {
            messege: "email already exist"
        })
    }
    

    if(checkPassword(password, passwordConfirm) == true){
        return res.render('register',{
            messege: 'Password do not match'
        })
    }
    const salt= await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt)
    insertData(fname, lname, email, hashedPassword);

    res.render('user');


 }catch(e){
    if(e){
        console.log(e);
    }
    
 }
}

export const login =  (req, res) =>{
   
    const { email , password} = req.body;

    db.query('SELECT email, password FROM users WHERE email = ?', [email, password] , async (error, results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0 ){
            console.log('email found')
            let result = JSON.parse(JSON.stringify(results));
            let pass = result[0].password
            if(await bcrypt.compare(password, pass)){
                console.log('Password Matched');
                req.session = req.body;
                if(req.session.email || req.session){
                    console.log(req.session.email);
                    return res.render('user')
                }
            }else{
                return res.render('login',{
                messege: 'Wrong Password'
            })
        }
        }else{
            return res.render('login', {
                messege: 'Email not found'
            });
        }
    });
    
}



async function checkEmail(email){
    const {data, error} =await supabase.from('users').select().eq('email',email);
    if(error){
        console.log(error)
    }
    if(data){
        console.log('email already exist')
        return true
    }


}


async function checkPassword(password,passwordConfirm){
    
    if(password !== passwordConfirm){
        console.log('password does not match')

        return true;
    }
}

async function insertData(fname, lname, email, hashedPassword){
        const { data, error } = await supabase
        .from('users')
        .insert([
        { first_name:fname, last_name: lname, email: email, password:hashedPassword },
        ])
        .select()
        if(error){

            console.log(error);

        }
}

