const express = require("express");
const controller = require("../controllers/author.controller");

const router = express.Router();

router.get("/", controller.getAllAuthors);
router.get("/:id", controller.getAuthorById);
router.post("/", controller.createAuthor);
router.get("/:id/books", controller.getBooksByAuthorId);
// router.delete("/:id", controller.deleteAuthorById);

module.exports = router;
