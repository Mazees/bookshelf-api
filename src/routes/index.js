import express from "express";
import { addBooks, getBooks, getBookById ,editBookById,deleteBookById} from "../services/controller.js";
const router = express.Router();

router.post("/books", addBooks);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", editBookById);
router.delete("/books/:id", deleteBookById);

export default router;
