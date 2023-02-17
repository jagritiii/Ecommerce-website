const express = require('express');
const multer = require('multer');
const bcrypt = require("bcrypt");
var session = require('express-session')
const app = express();
const port = 3000;

const sendMail = require("./utils/sendMail");

// importing the data base 
const database = require("./database");
const userModel = require("./database/models/user.js");
const cartModel = require("./database/models/cart.js");
const productModel = require("./database/models/products.js");
// const userRoleEnums = userModel.userType;


// set the view engine to ejs
app.set('view engine', 'ejs'); //

// initiate database connection
database.init();

//urlencode and middleware
app.use(express.static("uploads"))
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

// express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage
})
// it is not a good option
//app.use(upload.single("profile_pic"));

app.use("/admin", function (req, res, next) {
    if (req.session.isLoggedIn) {
        var id = req.session.user.email;
        var role = req.session.user.userType;
        userModel.findOne({ email: id, userType: role }).then(function (userDetails) {
            if (userDetails) {
                next();
            } else {
                res.render("login.ejs", { msg: "User Cannot Access Admin Page" });
            }
        })
    } else if (req.url == "/login") {
        next();
    } else {
        res.render("adminLogin", { msg: "User Cannot Access Admin Page" });
    }
})


app.get('/', function (req, res) {
    var user = null;
    if (req.session.isLoggedIn) {
        user = {
            name: req.session.user.username,
            pic: req.session.user.profile_pic,
        }

    }
    if (!req.session.pageCount) {
        req.session.pageCount = 0;
    }

    productModel.find({}).then((result) => {
        // console.log(result);
        var n = req.session.pageCount + 2;
        var l = result.length;
        if (n <= l) {
            result.splice(n, l - n)
        }
        else {
            result.splice(0, 0)
        }
        console.log(result);

        res.render("index",
            {
                user: user,
                products: result,
                itemShow: req.session.pageCount,
            });
    })

})

app.get("/authenticate", function (req, res) {
    res.render("authenticate");
})

// login 
const login = require("./routes/user/login");
app.use('/login', login);

// reset password
const resetPassword = require("./routes/user/resetPassword");
app.use('/resetPassword', resetPassword);

// change password
const changePassword = require("./routes/user/changePassword");
app.use('/changePassword', changePassword);

// cart
const cart = require("./routes/user/cart");
app.use('/cart', cart);

// forgotPassword
const forgotPassword = require("./routes/user/forgotPassword");
app.use('/forgotPassword', forgotPassword);

// verifyUser
const verifyUser = require("./routes/user/verifyUser");
app.use('/verifyUser', verifyUser);

// admin
const admin = require("./routes/admin/login");
app.use('/admin', admin);

// products
const product = require('./routes/admin/product');
app.use('/admin/product', product);

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})


app.route('/signup').get((req, res) => {

    res.render('signup', { error: "" });

}).post(upload.single("profile_pic"), function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const file = req.file;

    if (!username) {
        res.render("signup", {
            error: "username error !!!!"
        })
        return;
    }

    if (!email) {
        res.render("signup", {
            error: "email error !!!!"
        })
        return;
    }

    if (!password) {
        res.render("signup", {
            error: "password error !!!!"
        })
        return;
    }
    if (!file) {
        res.render("signup", {
            error: "file error !!!!"
        })
        return;
    }

    userModel.findOne({ email: email }).then((user) => {
        if (user) {
            res.render('signup', { error: "user already exists" })
        }
        else {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    console.log("error in hashing");
                    res.render('signup', { msg: "error" });
                } else {
                    userModel.create({
                        username: username,
                        email: email,
                        password: hash,
                        profile_pic: file.filename,
                        userType: 2,
                        isVerified: true
                    })
                        .then(function (user) {

                            var html = '<a href="https://localhost:3000/verifyUser/' + email + '">click here</a>'
                                + '<h3>to verify your account<h3>'

                            sendMail.sendMail(
                                user.email,
                                user.username,
                                "welcome to cart",
                                "click to verify",
                                html,
                                function (err) {
                                    if (err) {
                                        res.render('signup', { error: 'unable to send mail' })
                                    }
                                    else {
                                        console.log('mail sent')
                                        res.render('login', { msg: 'check your mail to verify your account' })
                                    }
                                }
                            )

                            // res.redirect('login')
                        })
                        .catch(function (err) {
                            console.log(err)
                            res.render("signup", { error: "error !!!!" })
                        })
                }
            })
        }
    })

})


app.get('/getProducts', (req, res) => {
    req.session.pageCount += 2;
    res.redirect('/')
})

app.get('/settings', (req, res) => {
    res.render("changePassword", { msg: "" })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})