const express = require('express');
const router = express.Router();
const UserController = require('./../controller/userController');
const { checkAuth } = require('./../middlewares/checkAuth');
const { isAdmin } = require('./../middlewares/isAdmin');

router.get("/users", checkAuth, isAdmin, UserController.index);

router.get("/me", checkAuth, UserController.profile);

router.post("/users", checkAuth, UserController.store);
router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);


module.exports = router;