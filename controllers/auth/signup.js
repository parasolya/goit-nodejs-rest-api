const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../../models/user");
const HttpError = require("../../helpers/index");
const { ctrlWrapper } = require("../../decorators/index");

// const fs = require("fs/promises");
// const path = require("path");

// const avatarURLPath = path.resolve("public", "avatars");

dotenv.config();
// const {JWT_SECRET} = process.env;

const signup = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, `Email ${email} in use`);
    }
    // const {path: oldPath, filename} = req.file;
    //  console.log(req.file);
    // const newPath = path.join(avatarURLPath , filename);
    // await fs.rename(oldPath, newPath);
    // const avatar = path.join("avatars", filename);

    const hashPassword = await bcrypt.hash(password, 10);    
    const newUser = await User.create({...req.body, password: hashPassword}); 
    res.status(201).json({        
        email: newUser.email,
        subscription: newUser.subscription,
        // avatarURL: newUser.avatar,
    })
};

module.exports = { signup: ctrlWrapper(signup) };