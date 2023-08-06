const Contact = require("../../models/contact");
const fs = require("fs/promises");
const path = require("path");

const avatarPath = path.resolve("public", "avatars");

const add = async (req, res) => {  
  const {_id: owner} = req.user;

    const {path: oldPath, filename} = req.file;
    console.log(req.file);
    const newPath = path.join(avatarPath , filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

    const result = await Contact.create({...req.body, avatar, owner});
    res.status(201).json(result);



    // const {_id: owner} = req.user;
    // const result = await Contact.create({...req.body, owner});
    // res.status(201).json(result);
  };

  module.exports = add;