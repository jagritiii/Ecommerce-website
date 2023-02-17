const express = require('express');
const router = express.Router();

const sendMail = require("../../utils/sendMail")

router.route('/').get((req, res) => {
    res.render("forgotPassword", { msg: "" })
})
    .post((req, res) => {

        var mailid = req.body.email
        var html = '<a href="http://localhost:3000/' + mailid + '">click here</a>'
            + '<h3>to reset password<h3>'

        sendMail.sendMail(
            mailid,
            "",
            "Reset Your Password",
            "",
            html,
            function (err) {
                if (err) {
                    console.log('errrrrrrr')
                }
                else {
                    console.log('mail sent')
                }
            }
        )
        res.render('login', { msg: 'reset link sent' })

    })

module.exports = router;