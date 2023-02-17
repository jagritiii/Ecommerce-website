const Mailjet = require('node-mailjet')

const mailjet = new Mailjet({
    apiKey: "899812ad910b0099efc1a1ca63f7ee59",
    apiSecret: "f08501e993f9ae359e417b269dcb176c"
});

module.exports.sendMail = async function (email, name, title, html, callback) {

    return await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'jag.agrawal13@gmail.com',
                    Name: 'Shoppers stop',
                },
                To: [
                    {
                        Email: email,
                        Name: name,
                    }
                ],
                Subject: title,
                TextPart: "E-Commerce Verification Mail",
                HTMLPart: html,
                CustomID: "AppGettingStartedTest",
            },
        ],
    })
}