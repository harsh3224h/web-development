// const db = require("../db/index.js");
const db = require("../db/index.js");
const { eq, ilike } = require("drizzle-orm");
const { sql } = require("drizzle-orm");
const { booksTable, authorsTable } = require("../models/index.js");

exports.getAllBooks = async function (req, res) {
  const search = req.query.search;
  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`,
      );
    if (books) return res.status(201).json(books);
  }
  const books = await db.select().from(booksTable);
  if (books) {
    return res.status(201).json(books);
  } else {
    return res.status(400).end(`Books not found!`);
  }
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;
  const book = await db.select().from(booksTable).where(eq(booksTable.id, id));

  if (!book)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "Title is required" });
  if (!authorId || authorId === "")
    return res.status(400).json({ error: "Author-ID is required" });
  if (!description || description === "")
    return res.status(400).json({ error: "Description is required" });

  const [result] = await db
    .insert(booksTable)
    .values({ title, description, authorId })
    .returning();
  const bookId = result.id;

  return res.status(201).json({ message: "Book created successfully", bookId });
};

exports.deleteBook = async function (req, res) {
  const id = req.params.id;

  const [result] = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning();
  const bookId = result.id;

  return res.status(200).end(`Book with id: ${bookId} deleted successfully!`);
};
