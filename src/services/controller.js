import { nanoid } from "nanoid";
import InvariantError from "../exceptions/invariant-error.js";
import NotFoundError from "../exceptions/not-found-error.js";
import {
  findBookById,
  findBooks,
  insertBook,
  removeBookById,
  updateBookById,
} from "./books.js";

export const addBooks = async (req, res, next) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body ?? {};

  if (!name) {
    return next(new InvariantError("Gagal menambahkan buku. Mohon isi nama buku"));
  }

  if (readPage > pageCount) {
    return next(
      new InvariantError(
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      ),
    );
  }

  const newBook = {
    id: nanoid(16),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
  };

  const savedBook = await insertBook(newBook);

  return res.status(201).json({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: { bookId: savedBook.id },
  });
};

export const getBooks = async (req, res) => {
  const books = await findBooks(req.query);

  return res.status(200).json({
    status: "success",
    data: {
      books: books.map(({ id, name, publisher }) => ({
        id,
        name,
        publisher,
      })),
    },
  });
};

export const getBookById = async (req, res, next) => {
  const { id } = req.params;
  const book = await findBookById(id);

  if (!book) {
    return next(new NotFoundError("Buku tidak ditemukan"));
  }

  return res.json({
    status: "success",
    data: { book },
  });
};

export const editBookById = async (req, res, next) => {
  const { id } = req.params;
  const existingBook = await findBookById(id);

  if (!existingBook) {
    return next(
      new NotFoundError("Gagal memperbarui buku. Id tidak ditemukan"),
    );
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body ?? {};

  if (!name) {
    return next(
      new InvariantError("Gagal memperbarui buku. Mohon isi nama buku"),
    );
  }

  if (readPage > pageCount) {
    return next(
      new InvariantError(
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      ),
    );
  }

  const updatedBook = await updateBookById(id, {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
  });

  if (!updatedBook) {
    return next(
      new NotFoundError("Gagal memperbarui buku. Id tidak ditemukan"),
    );
  }

  return res.json({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
};

export const deleteBookById = async (req, res, next) => {
  const { id } = req.params;
  const deleted = await removeBookById(id);

  if (!deleted) {
    return next(new NotFoundError("Buku gagal dihapus. Id tidak ditemukan"));
  }

  return res.json({
    status: "success",
    message: "Buku berhasil dihapus",
  });
};
