let mod = require('../models/artistData');


exports.loadPage = function(req, res, next){
    res.render('login', {
        pageTitle: "Artist Directory",
        header: "Member Login",
        loginError: false,
        layout: 'login-layout'
    });
}



exports.login = function(req,res,next) {
    let username = req.body.username;
    let password = req.body.pass;

    let auth = mod.authenticate(username, password);
    auth.then((data) => {
        let success = data.rows.length > 0;

        if(success){
            res.redirect(301, "/home");
        } else{
            res.render('login', {
                pageTitle: "Artist Directory",
                header: "Member Login",
                loginError: true,
                layout: 'login-layout'
            });
        }
    });
}



