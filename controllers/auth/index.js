const  signup = require("./signup");
const  signin = require("./signin");
const  getCurrent = require("./getCurrent");
const  signout = require("./signout");
const  updateUserAvatar = require("./updateUserAvatar");
const  verify = require("./verify");
const  resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    signup,
    signin,
    getCurrent,
    signout,
    updateUserAvatar,
    verify,
    resendVerifyEmail
};