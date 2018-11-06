var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


function sendMail(email, subject, msg) {
    let mailOptions = {
        from: 'dunguyen20091998@gmail.com',
        to: email,
        subject: subject,
        text: msg
    };
    tranposter.sendMail(mailOptions, (err, result2) => {
        if (err) throw err;
        else {
            console.log("sent email ");
        }
    });
}


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('singup', new LocalStrategy({
        usernameField: 'phone',
        passwordField: 'pass',
        passReqToCallback: true
    },
        function (req,phone, pass, done) {
            console.log(req.body);
           
            User.findOne({ phone: phone }, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    console.log("SDT taken")
                    return done(null, false,req.flash('rehisterMessage','Email is alreay taken...') );
                } 
                if(!user){
                    User.findOne({
                        email:req.body.email
                    },(err,result)=>{
                        if(err) throw err;
                        if( result) {
                            console.log("Email taken")
                            return done(null,false,req.flash('rehisterMessage','Email is alreay taken...'))

                        }
                        if(! result){
                            var newUser = new User();
                            newUser.time= new Date();
                            newUser.avata="https://images-na.ssl-images-amazon.com/images/I/51%2BJZUHDnPL.jpg",

                            newUser.name=req.body.name;
                            newUser.email=req.body.email;
                            newUser.phone = phone;
                            newUser.pass = newUser.generateHash(pass);
                            newUser.save(function(err){
                                if(err) throw err;
                                sendMail(req.body.email,"WELLCOME","Wellcome to bkstorevn.herokuapp.com.Please login to use my services. Thank you. ")
                                return done(null,newUser);
                            });
                        }
                    })
                }
                   
                   
                
            });
        }));
    passport.use('login', new LocalStrategy({
        usernameField: 'phone',
        passwordField: 'pass',
        passReqToCallback: true
    },
        function (req, phone, pass, done) {
            console.log("------------------" + req.body);
            console.log(phone + "     " + pass);
            User.findOne({ phone: phone }, function (err, user) {
                if (err) { return done(err); }
                console.log(user);
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect username.'));
                }
                if (!bcrypt.compareSync(pass, user.pass)) {
                    console.log(bcrypt.compareSync(pass, user.pass));
                    return done(null, false, req.flash('loginMessage', 'Incorrect password !'));
                }
                console.log(user);
                return done(null, user);
            });

        }
    ));


};
