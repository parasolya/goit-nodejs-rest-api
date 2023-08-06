// const { ctrlWrapper } = require("../../decorators/index");


const getCurrent = (req, res)=> {
    const {email, subscription, avatarURL} = req.user;

    res.json({
        email, subscription, avatarURL
    })
};

module.exports = getCurrent;
