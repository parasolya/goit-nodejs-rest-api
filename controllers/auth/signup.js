const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
dotenv.config();
const {BASE_URL} = process.env;

const User = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");

dotenv.config();
const signup = async(req, res)=> {
    console.log(1);
    console.log(req.body);
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, `Email ${email} in use`);
    };

   
    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();    
    const newUser = await User.create({...req.body, avatarURL, password: hashPassword, verificationToken}); 
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click verify email</a>`
    };

    await sendEmail(verifyEmail);
    
    res.status(201).json({        
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
    });
};

module.exports = signup;