const express = require('express');
const router = express.Router();

const userModel = require("../../database/models/user");
const sendMail = require("../../utils/sendMail")

router.post('/', (req, res) => {

    var newPass = req.body.newPassword;
    var ouruser = req.session.user;

    userModel.findOne({ email: ouruser.email }).then(function (user) {
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

        res.render("changePassword", { msg: "password changed successfully" })
    })

})

module.exports = router;