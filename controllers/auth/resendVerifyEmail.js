const User = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const dotenv = require("dotenv");
dotenv.config();
const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    console.log(req.body);
    // if(!email) {
    //     throw HttpError(404, "missing required field email")
    // }
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(404, "User not found")
    }
    
    if(user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verification email sent",
        html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({ 
        message: "Email resend"
    })
}

module.exports = resendVerifyEmail;