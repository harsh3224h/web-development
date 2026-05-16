const express = require("express");
const app = express();
const port = 8000;

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The art of being alone", author: "Renuka Garwani" },
  { id: 3, title: "Think and Grow Rich", author: "Napoleon Hill" },
];

app.get("/", (req, res) => res.end("You are on homepage"));

app.get("/books", (req, res) => res.json(books));

app.get("/book/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const book = books.find((book) => book.id === id);

  if (!book)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  res.json(book);
});

app.listen(port, () => console.log(`Server started at port -> ${port}`));
