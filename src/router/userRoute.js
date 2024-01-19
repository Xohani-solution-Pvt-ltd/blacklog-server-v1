const router = require("express").Router();
const UserRegistrationModel = require('../models/registration');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");


router.post("/register", async (req, res) => {

    const { fullName, email, password } = req.body;
    try {

        const user = await UserRegistrationModel.findOne({ email });

        if (user) {
            return res.json({
                message: "User Exist allready",
                status: 400
            })
        }

        const HashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserRegistrationModel({
            fullName,
            email,
            password: HashPassword
        });
        const savedUser = await newUser.save();

        return res.json({
            message: "User Registration Successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserRegistrationModel.findOne({ email });

        if (!user) {
            return res.json({
                error: "User not exist"
            }, { status: 400 })
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.json({
                error: "Invalid Password"
            }, { status: 401 })
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN, { expiresIn: "1h" })
        const response = res.json({
            message: "User Login Successfully",
        })
        response.cookie.set("token", token, {
            httpOnly: true
        })

        return response
    } catch (error) {
        console.log(error)
    }
})

// router.post("/forgotpassword", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await UserRegistrationModel.findOne({ email });
//         if (!user) {
//             return res.json({
//                 error: "User not Exist "
//             }, {
//                 status: 400
//             })
//         }
//         const tokenData = {
//             id: user._id,
//             email: user.email
//         }

//         const resetToken = jwt.sign(tokenData, process.env.TOKEN, { expiresIn: "1h" });

//         const transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'jerome.koch26@ethereal.email',
//                 pass: 'ePPMwC8Yy9X9qgVF2r'
//             }
//         });
//         const resetLink = `http://localhost:4002/api/v1/resetpassword?token=${resetToken}`;

//         const mailOptions = {
//             from: '"me" <jerome.koch26@ethereal.email>',
//             to: "am2660713@gmail.com",
//             subject: "Password Reset",
//             html: `<p>Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
//         };

//         await transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.error("Error sending forgot password email:", error);
//                 res.status(500).json({
//                     success: false,
//                     message: "Failed to send password reset email",
//                 });
//             } else {
//                 console.log("Forgot password email sent:", info.messageId);
//                 res.status(200).json({
//                     success: true,
//                     message: "Password reset token has been sent to your email",
//                 });
//             }
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// })




// const sendResetPasswordMail = async (name, email, token) => {
//     try {
//         console.log("token", token);
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             secure: false,
//             requireTLS: true,
//             auth: {
//                 user: 'jerrold.wehner@ethereal.email',
//                 pass: 'zXPaQ8WFn6WEjJugD8'
//             }
//         });

//         const resetLink = `http://localhost:4002/api/v1/forgotPassword?token=${token}`;

//         const mailOptions = {
//             from: '"hiiiii" <jerrold.wehner@ethereal.email>',
//             to: 'pavandhangar152@gmail.com',
//             subject: "Reset your Password",
//             html: `<p>Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
//         };
//         await transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.error("Error sending forgot password email:", error);
//                 res.status(500).json({
//                     success: false,
//                     message: "Failed to send password reset email",
//                 });
//             } else {
//                 console.log("Forgot password email sent:", info.messageId);
//                 res.status(200).json({
//                     success: true,
//                     message: "Password reset token has been sent to your email",
//                 });
//             }
//         })

//     } catch (error) {
//         res.status(400).send({ success: false, msg: error.message });
//     }
// }

// router.post("/forgotpassword", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const userData = await UserRegistrationModel.findOne({ email: email });
//         if (!userData) {
//             return res.json({
//                 error: "User not Exist "
//             }, {
//                 status: 400
//             })
//         }
//         if (userData) {
//             const randomString = randomstring.generate();
//             const data = await UserRegistrationModel.updateOne({ email: email }, { $set: { token: randomString } });
//             sendResetPasswordMail(userData.fullName, userData.email, randomString);
//             res.status(200).send({
//                 success: true,
//                 message: " please check your email and set your password",
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// })




const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'jerrold.wehner@ethereal.email',
                pass: 'zXPaQ8WFn6WEjJugD8'
            }
        });

        console.log("data", transporter);

        const mailOptions = {
            from: '"vinit" <jerrold.wehner@ethereal.email>',
            to: 'pavandhangar152@gmail.com',
            subject: "Reset your Password",
            html: '<p> Hii  ' + name + ', Please copy the link and <a href="http://localhost:4003/api/v1/resetPassword?token=' + token + '">reset password </a></p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending forgot password email:", error);
                res.status(500).json({
                    success: false,
                    message: "Failed to send password reset email",
                });
            } else {
                console.log("mail has been sent:", info.response);
                res.status(200).json({
                    success: true,
                    message: "Password reset token has been sent to your email",
                });
            }
        })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


router.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        const userData = await UserRegistrationModel.findOne({ email });

        if (userData) {
            const randomString = randomstring.generate();

            const data = await UserRegistrationModel.updateOne({ email: email }, { $set: { token: randomString } });

            sendResetPasswordMail(userData.fullName, userData.email, randomString);
            res.status(200).send({ success: true, msg: "please check your mail and reset your password" });
        } else {
            res.status(400).send({ success: true, msg: "this email dose not exist" });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/resetpassword", async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await UserRegistrationModel.findOne({ token: token });
        console.log("data", tokenData)

        if (tokenData) {
            const password = req.body.password;
            console.log("data", password)
            const newPassword = await bcrypt.hash(password, 10);
            const userData = await UserRegistrationModel.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword, token: '' } }, { new: true });
            res.status(200).send({ success: true, msg: "password has benn reset successfully", data: userData });

        } else {
            res.status(200).send({ success: true, msg: "this link has been expired ..." });

        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
})
module.exports = router;