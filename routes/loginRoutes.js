// loginRoutes.js
const express = require("express");
const multer = require("multer");

module.exports = (userController) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  const router = express.Router();

  router
    .post("/user/register", userController.registerUser)
    .post("/user/login", userController.loginUser)
    .post("/messages", userController.postMessage)
    .patch(
      "/user/update/:id",
      upload.single("image"),
      userController.updateUser
    )
    .patch("/user/addcoin/:id", userController.addCoin)
    .get("/messages", userController.getAllMessages)
    .get("/user/image/:id", userController.profilImage)
    .get("/user/details/:id", userController.getUserDetails);
  router.get("/users/leaderboard", userController.leaderboard);

  return router;
};
