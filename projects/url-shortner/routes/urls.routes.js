import express from "express";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { shortenURLSchema } from "../validations/url.validation.js";
import { nanoid } from "nanoid";
import db from "../db/index.js";
import { usersTable, urlsTable } from "../models/schema.js";
import { eq, and } from "drizzle-orm";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async (req, res) => {
  try {
    const URLValidation = await shortenURLSchema.safeParseAsync(req.body);
    if (!URLValidation.success) {
      return res.status(400).json({
        error: URLValidation.error.issues,
      });
    }

    const shortCode = nanoid(6);
    const { URL } = URLValidation.data;

    const [result] = await db
      .insert(urlsTable)
      .values({
        shortenCode: shortCode,
        targetURL: URL,
        userId: req.user.id,
      })
      .returning({
        short_code: urlsTable.shortenCode,
        code_id: urlsTable.id,
      });

    return res.status(201).json({
      message: `Short code generated successfully`,
      data: {
        short_code: result.short_code,
        code_id: result.code_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/codes", ensureAuthenticated, async (req, res) => {
  const codes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, req.user.id));

  return res.status(201).json({ codes });
});

router.get("/:shortCode", async (req, res) => {
  try {
    const shortCode = req.params.shortCode;

    const [codeQuery] = await db
      .select({
        url: urlsTable.targetURL,
      })
      .from(urlsTable)
      .where(eq(urlsTable.shortenCode, shortCode));

    if (!codeQuery) {
      return res
        .status(404)
        .json({ error: `No url is binded by this short code` });
    }

    return res.redirect(codeQuery.url);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/urls/:id", ensureAuthenticated, async (req, res) => {
  const id = req.params.id;

  const [codeCheck] = await db
    .select({
      code: urlsTable.shortenCode,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortenCode, id));

  if (!codeCheck) {
    return res.status(404).json({
      error: `Invalid code`,
    });
  }

  const [ownership] = await db
    .select({
      code: urlsTable.shortenCode,
    })
    .from(urlsTable)
    .where(
      and(eq(urlsTable.shortenCode, id), eq(urlsTable.userId, req.user.id)),
    );

  if (!ownership) {
    return res
      .status(401)
      .json({ error: `You are not authorized to delete this code` });
  }

  await db.delete(urlsTable).where(eq(urlsTable.shortenCode, id));

  return res.status(201).json({ message: `Short Code deleted successfully` });
});

export default router;
