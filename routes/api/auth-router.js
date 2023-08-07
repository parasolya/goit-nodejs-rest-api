const express = require("express");
const validateBody = require("../../decorators/validateBody");
const { upload, authenticate } = require("../../middlewares/index");
const { getAll } = require("../../controllers/contacts/index");
const { ctrlWrapper } = require("../../decorators/index");

const {
  userSignupSchema,
  userSigninSchema,
} = require("../../schemas/users-schemas");

const {
  signup,
  signin,
  getCurrent,
  signout,
  updateUserAvatar,
} = require("../../controllers/auth/index");

const authRouter = express.Router();

authRouter.get("/", getAll);

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  ctrlWrapper(signup)
);

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signin));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/logout", authenticate, ctrlWrapper(signout));

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  ctrlWrapper(updateUserAvatar)
);

module.exports = authRouter;
