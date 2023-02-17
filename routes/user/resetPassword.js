const express = require('express');
const router = express.Router();

const userModel = require("../../database/models/user");
const sendMail = require("../../utils/sendMail")

router.route('/:mail').get((req, res) => {
    var mailid = req.params.mail;
    res.render('resetPassword', { msg: "", mailid: mailid })
})
    .post((req, res) => {

        var newPass = req.body.newPassword;
        var mailid = req.params.mail;

        userModel.findOne({ email: mailid }).then(function (user) {
            // change password
            userModel.updateOne({ email: user.email },
                {
                    $set: {
                        password: newPass
                    }
                },
                function (err, res) {
                    if (err)
                        console.log(err);

                    else {
                        console.log("1 document updated");

                        sendMail.sendMail(
                            user.email,
                            user.username,
                            "password changed",
                            "password changed successfully",
                            "",
                            function (err) {
                                if (err) {
                                    console.log('errrrrrrr')
                                }
                                else {
                                    console.log('mail sent')
                                }
                            }
                        )

                    }
                })

            res.render("login", { msg: "password changed successfully" })
        })

    })

module.exports = router;
