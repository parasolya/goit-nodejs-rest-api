const express = require("express");
const { getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateStatusContact } = require("../../controllers/contacts/index");
const { 
  // upload, 
  isEmptyBody, isValidId, authenticate } = require("../../middlewares/index");
// const { isValidId } = require("../../middlewares/index");
// const { authenticate } = require("../../middlewares/index");
const { ctrlWrapper } = require("../../decorators/index");

const router = express.Router();
const { validateBody } = require("../../decorators/index");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas/contact-schemas");

router.use(authenticate);

router.get("/", ctrlWrapper(getAll));

router.get("/:id", isValidId, ctrlWrapper(getById));

// upload.fields([{name: "poster", maxCount: 1}])
// upload.array("poster", 8)
router.post(
  "/",
  // upload.single("avatar"),
  isEmptyBody,
  validateBody(contactAddSchema),
  ctrlWrapper(add)
);

router.delete("/:id", isValidId, ctrlWrapper(deleteById));

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactAddSchema),
  ctrlWrapper(updateById)
);

router.patch(
  "/:id/favorite",
  validateBody(contactUpdateFavoriteSchema),
  isValidId, 
  isEmptyBody,  
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
