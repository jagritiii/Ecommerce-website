const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userModel = require("../../database/models/user")

router.route('/login').get((req, res) => {
    res.render('adminLogin', { msg: "" });
})
    .post((req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        userModel.findOne({
            email: email,
            userType: 1,
        })
            .then(function (admin) {
                if (admin) {
                    bcrypt.compare(password, admin.password, function (err, result) {
                        console.log(result);
                        if (err) {
                            console.log("error in hasing in login")
                        }
                        else if (result) {
                            req.session.isLoggedIn = true;
                            req.session.user = admin;
                            console.log('sucess')
                            res.redirect('/admin/home');
                        }
                        else {
                            res.render('adminLogin', { msg: 'invalid username or password' })
                        }

                    })
                }
                // if not admin
                else {
                    res.render('adminLogin', { msg: 'invalid username or password' })
                }
            })

    })

router.route('/home').get((req, res) => {
    res.render('adminHome');
})

router.route('/logout').get((req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
})


module.exports = router;