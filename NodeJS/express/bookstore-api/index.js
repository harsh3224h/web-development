const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The art of being alone", author: "Renuka Garwani" },
  { id: 3, title: "Think and Grow Rich", author: "Napoleon Hill" },
];

app.get("/", (req, res) => res.end("You are on homepage"));

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const book = books.find((book) => book.id === id);

  if (!book)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "Title is required" });
  if (!author || author === "")
    return res.status(400).json({ error: "Author is required" });

  const id = books.length + 1;
  const book = { id, title, author };
  books.push(book);

  return res.status(201).json({ message: "Book created successfully", id });
});

app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const index = books.findIndex((book) => book.id === id);

  if (!index)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  books.splice(index, 1);

  return res.status(200).end(`Book with id: ${id} deleted successfully!`);
});

app.listen(port, () => console.log(`Server started at port -> ${port}`));
