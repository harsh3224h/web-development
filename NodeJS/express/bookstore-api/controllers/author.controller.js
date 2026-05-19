const db = require("../db");
const { authorsTable, booksTable } = require("../models/index");
const { eq, ilike } = require("drizzle-orm");
const { sql } = require("drizzle-orm");

exports.getAllAuthors = async function (req, res) {
  const authors = await db.select().from(authorsTable);
  if (authors) {
    return res.status(201).json(authors);
  } else {
    return res.status(400).end(`Authors not found!`);
  }
};

exports.getAuthorById = async function (req, res) {
  const id = req.params.id;
  const author = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id));

  if (!author)
    return res
      .status(404)
      .end(`Requested author with id: ${id} does not exists!`);

  res.json(author);
};

exports.createAuthor = async function (req, res) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || firstName === "")
    return res.status(400).json({ error: "First name is required" });
  if (!lastName || lastName === "")
    return res.status(400).json({ error: "Last name is required" });
  if (!email || email === "")
    return res.status(400).json({ error: "Email is required" });

  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning();
  const authorID = result.id;

  return res
    .status(201)
    .json({ message: "Author created successfully", authorID });
};

exports.getBooksByAuthorId = async function (req, res) {
  const id = req.params.id;
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, id));

  if (!books)
    return res
      .status(404)
      .end(`Requested books with author id: ${id} does not exists!`);

  res.json(books);
};
