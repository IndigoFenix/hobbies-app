const express = require("express");
const router = express.Router();

const controller = require('../controllers/hobbies');

router.post("/", controller.create);
router.get("/", controller.all);
router.get("/:id", controller.allOfUser);
router.delete("/:id", controller.delete);

module.exports = router;