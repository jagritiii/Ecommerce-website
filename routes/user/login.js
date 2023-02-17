const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userModel = require("../../database/models/user.js")

router.route('/').get((req, res) => {
    res.render('login', { msg: "" });
}).post(function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    userModel.findOne({
        email: email,
        userType: 2,
    })
        .then(function (user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    console.log(result);
                    if (err) {
                        console.log("error in hashing in login")
                    } else if (result) {
                        // checking if user is verified
                        if (user.isVerified) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            // req.session.pageCount =0;
                        }
                        else {
                            res.render('login', { msg: "please verify your account" })
                        }
                        res.redirect('/');
                    }
                    else {
                        console.log('not a user')
                        res.render("login", { msg: "invalid username or password" });
                    }

                })
            }
            // if not a user
            else {

                console.log('not a user')
                res.render("login", { msg: "invalid username or password" });

            }
        })

})

module.exports = router;
