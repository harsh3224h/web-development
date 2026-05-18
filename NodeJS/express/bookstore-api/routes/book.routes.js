const express = require("express");
const controller = require("../controllers/book.controller");

const router = express.Router();

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);
router.post("/", controller.createBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
