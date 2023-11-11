
const bcrypt = require('bcryptjs')


exports.register = (req, res) =>{
    const{ email, password, passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{

        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render('register', {
                messege: 'Email already exist'
            })
        }else if(password !== passwordConfirm){

            return res.render('register',{
                messege: 'Password do not match'
            })
        }

        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

        db.query('INSERT INTO users SET ?', { email: email, password: hashedPassword},(error, results) =>{

            if(error){
                console.log(error);
            }else{
                console.log(results)
                return res.render('register',{

                    messege: 'user is registered'
                })
            }
        });
    });
}



exports.login = (req, res) =>{

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
