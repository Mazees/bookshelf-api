import { pool } from "../database/pool.js";

const bookColumns = `
  id,
  name,
  year,
  author,
  summary,
  publisher,
  page_count AS "pageCount",
  read_page AS "readPage",
  finished,
  reading,
  inserted_at AS "insertedAt",
  updated_at AS "updatedAt"
`;

export const insertBook = async (book) => {
  const { rows } = await pool.query(
    `INSERT INTO books
      (id, name, year, author, summary, publisher, page_count, read_page, finished, reading)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id`,
    [
      book.id,
      book.name,
      book.year,
      book.author,
      book.summary,
      book.publisher,
      book.pageCount,
      book.readPage,
      book.finished,
      book.reading,
    ],
  );

  return rows[0];
};

export const findBooks = async ({ name, reading, finished }) => {
  const conditions = [];
  const values = [];

  if (name) {
    values.push(`%${name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }

  if (reading === "1" || reading === "0") {
    values.push(reading === "1");
    conditions.push(`reading = $${values.length}`);
  }

  if (finished === "1" || finished === "0") {
    values.push(finished === "1");
    conditions.push(`finished = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  const { rows } = await pool.query(
    `SELECT ${bookColumns}
     FROM books
     ${whereClause}
     ORDER BY inserted_at DESC`,
    values,
  );

  return rows;
};

export const findBookById = async (id) => {
  const { rows } = await pool.query(
    `SELECT ${bookColumns} FROM books WHERE id = $1`,
    [id],
  );

  return rows[0] ?? null;
};

export const updateBookById = async (id, book) => {
  const { rows } = await pool.query(
    `UPDATE books
     SET name = $1,
         year = $2,
         author = $3,
         summary = $4,
         publisher = $5,
         page_count = $6,
         read_page = $7,
         finished = $8,
         reading = $9,
         updated_at = CURRENT_TIMESTAMP::text
     WHERE id = $10
     RETURNING id`,
    [
      book.name,
      book.year,
      book.author,
      book.summary,
      book.publisher,
      book.pageCount,
      book.readPage,
      book.finished,
      book.reading,
      id,
    ],
  );

  return rows[0] ?? null;
};

export const removeBookById = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING id",
    [id],
  );

  return rows.length > 0;
};
