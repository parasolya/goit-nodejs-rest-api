const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../../models/user");
const HttpError = require("../../helpers/HttpError");
const gravatar = require("gravatar");

// const fs = require("fs/promises");
// const path = require("path");

// const avatarURLPath = path.resolve("public", "avatars");

dotenv.config();
const signup = async(req, res)=> {
    console.log(1);
    console.log(req.body);
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, `Email ${email} in use`);
    };

    // const {path: oldPath, filename} = req.file;
    // const newPath = path.join(avatarURLPath , filename);
    // await fs.rename(oldPath, newPath);
    // const avatarURL = path.join("avatars", filename);
    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);    
    const newUser = await User.create({...req.body, avatarURL, password: hashPassword}); 
    res.status(201).json({        
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
    });
};

module.exports = signup;