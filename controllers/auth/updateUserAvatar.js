const User = require("../../models/user");

const fs = require("fs/promises");
const path = require("path");
const avatarURLPath = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarURLPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  console.log(avatarURL);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateUserAvatar;
