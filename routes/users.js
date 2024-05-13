const router = require("express").Router();
const userController = require("../controller/users");

/**
 * Get user by id or email
 */
router.get("/:userId", userController.getUserByID);

/**
 * Update user by id

 */
router.put("/:userId", userController.putUserById);

/**
 * Update user by id

 */
router.patch("/:userId", userController.patchUserById);

/**
 * Delete user by id
 */
router.delete("/:userId", userController.deleteUserById);


router.get("/", userController.getUsers);

/**
 * create a new user
 */
router.post("/", userController.postUser);

module.exports = router;
