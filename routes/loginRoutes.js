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
    .patch(
      "/user/update/:id",
      upload.single("image"),
      userController.updateUser
    )
    .get("/user/image/:id", userController.profilImage)
    .get("/user/details/:id", userController.getUserDetails);

  return router;
};
