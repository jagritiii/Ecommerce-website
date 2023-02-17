const express = require('express');
const router = express.Router();

const userModel = require("../../database/models/user");

router.route('/:email').get(function (req, res) {
    const email = req.params.email;
    console.log(email)

    userModel.findOne({ email: email }).then(function (user) {
        if (user) {
            // verify user here
            userModel.updateOne({ email: user.email },
                {
                    $set: {
                        isVerified: true
                    }
                },
                function (err, res) {
                    if (err) console.log(err);
                    console.log("1 document updated");
                })

            res.render("verification", { msg: "user is verified" })
        }
        else {
            res.render("verification", { msg: "please hack krne ki kosish mat kro, ye user nhi h" })
        }
    })
})

module.exports = router;
